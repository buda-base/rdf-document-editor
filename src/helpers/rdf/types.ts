import * as rdf from "rdflib"
import * as ns from "./ns"
import { Memoize } from "typescript-memoize"
import { atom, DefaultValue, AtomEffect, RecoilState } from "recoil"
import { nanoid } from "nanoid"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:rdf:types")

export const defaultGraphNode = rdf.sym(rdf.Store.defaultGraphURI) as rdf.NamedNode

export const errors: Record<string, Record<string, boolean>> = {}

// global variable, should be in config?
export const history: Record<string, Array<Record<string, any>>> = {}

export enum ObjectType {
  Literal,
  Internal,
  ResInList,
  ResExt,
  ResIgnore,
  LitInList,
}

export const updateHistory = (
  entity: string,
  qname: string,
  prop: string,
  val: Array<Value>,
  noHisto: boolean | number = true
) => {
  if (!history[entity]) history[entity] = []
  else {
    while (history[entity].length && history[entity][history[entity].length - 1]["tmp:undone"]) {
      history[entity].pop()
    }
  }
  const newVal = {
    [qname]: { [prop]: val },
    ...entity != qname ? { "tmp:parentPath": getParentPath(entity, qname) } : {},
  }

  // don't add empty value to history (fix adding undo steps when showing secondary properties in Person/Kinship)
  if (val?.length === 1 && !(val[0] instanceof LiteralWithId) && (val[0].uri === "tmp:uri" || val[0].value === ""))
    return

  // some value modifications must not be added to history (some autocreation of empty values for example)
  if (noHisto === -1) {
    const first = history[entity].findIndex((h) => h["tmp:allValuesLoaded"])
    if (first > 0) history[entity].splice(first, 0, newVal)
    else history[entity].push(newVal)
  } else history[entity].push(newVal)

  //debug("history:", entity, qname, prop, val, history, noHisto)
}

export type HistoryStatus = {
  top?: number
  first?: number
  current?: number
}

// get info from history (values modified? values undone?)
export const getHistoryStatus = (entityUri: string): HistoryStatus => {
  if (!history[entityUri]) return {}

  // DONE: optimizing a bit (1 for instead of 2 .findIndex + 1 .some)
  const top = history[entityUri].length - 1
  let first = -1,
    current = -1
  for (const [i, h] of history[entityUri].entries()) {
    if (h["tmp:allValuesLoaded"]) first = i
    else if (h["tmp:undone"]) current = i - 1
    if (first != -1 && current != -1) break
  }
  return { top, first, current }
}

export function getParentPath(entityUri: string, sub: string) {
  let parentPath: Array<string> = []
  // manually check which property has this subnode as value
  for (const h of history[entityUri]) {
    const subSubj = Object.keys(h).filter((k) => !["tmp:parent", "tmp:undone"].includes(k))
    for (const s of subSubj) {
      const subprop = Object.keys(h[s]).filter((k) => !["tmp:parent", "tmp:undone"].includes(k))
      for (const p of subprop) {
        if (typeof h[s][p] !== "string")
          for (const v of h[s][p]) {
            if (v instanceof Subject && v.uri === sub) {
              if (parentPath.length > 1 && parentPath[1] !== p)
                throw new Error("multiple property (" + parentPath + "," + p + ") for node " + sub)
              if (s !== entityUri) parentPath = getParentPath(entityUri, s)
              parentPath.push(s)
              parentPath.push(p)
            }
          }
      }
    }
  }
  return parentPath
}

export const rdfLitAsNumber = (lit: rdf.Literal): number | null => {
  const n = Number(lit.value)
  if (!isNaN(n)) {
    return +n
  }
  return null
}

export class Path {
  sparqlString: string

  directPathNode: rdf.NamedNode | null = null
  inversePathNode: rdf.NamedNode | null = null

  constructor(node: rdf.NamedNode, graph: EntityGraph, listMode: boolean) {
    const invpaths = graph.store.each(node, ns.shInversePath, null) as Array<rdf.NamedNode>
    if (invpaths.length > 1) {
      throw "too many inverse path in shacl path:" + invpaths
    }
    if (invpaths.length == 1) {
      const invpath = invpaths[0]
      this.sparqlString = "^" + invpath.value
      this.inversePathNode = invpath
    } else {
      // if this is a list we add "[]" at the end
      if (listMode) {
        this.sparqlString = node.value + "[]"
      } else {
        this.sparqlString = node.value
      }
      this.directPathNode = node as rdf.NamedNode
    }
  }
}

type setSelfOnSet = {
  setSelf: (arg: any) => void
  onSet: (newValues: (arg: Array<Value> | DefaultValue) => void) => void
}

export const debugAtomEffect = ({ setSelf, onSet }: setSelfOnSet) => {
  onSet((newValues: Array<Value> | DefaultValue): void => {
    debug("onSet",newValues)
  })

  setSelf((newValues: Array<Value> | DefaultValue): void => {
    debug("setSelf",newValues)
  })
}

// an EntityGraphValues represents the global state of an entity we're editing, in a javascript object (and not an RDF store)
export class EntityGraphValues {
  oldSubjectProps: Record<string, Record<string, Array<Value>>> = {}
  newSubjectProps: Record<string, Record<string, Array<Value>>> = {}
  subjectUri = ""
  /* eslint-disable no-magic-numbers */
  idHash = Date.now() //getRandomIntInclusive(1000, 9999).toString()
  noHisto: boolean | number = false

  constructor(subjectUri: string) {
    this.subjectUri = subjectUri
  }

  onGetInitialValues = (subjectUri: string, pathString: string, values: Array<Value>) => {
    if (!(subjectUri in this.oldSubjectProps)) this.oldSubjectProps[subjectUri] = {}
    if (!(subjectUri in this.newSubjectProps)) this.newSubjectProps[subjectUri] = {}
    this.oldSubjectProps[subjectUri][pathString] = values
    this.newSubjectProps[subjectUri][pathString] = values
  }

  onUpdateValues = (subjectUri: string, pathString: string, values: Array<Value>) => {
    if (!(subjectUri in this.newSubjectProps)) this.newSubjectProps[subjectUri] = {}
    this.newSubjectProps[subjectUri][pathString] = values
    // disable history for current modification (autocreation of new empty simple value)
    if (this.noHisto === true) {
      this.noHisto = false
      return
    }
    updateHistory(this.subjectUri, subjectUri, pathString, values, this.noHisto)
    // there are some modifications that are chained and we need only first not to be stored
    // (case of creation of new property with subproperties)
    if (this.noHisto === 1) this.noHisto = -1
  }

  isInitialized = (subjectUri: string, pathString: string) => {
    return subjectUri in this.oldSubjectProps && pathString in this.oldSubjectProps[subjectUri]
  }

  addNewValuestoStore(store: rdf.Store, subjectUri: string) {
    if (!(subjectUri in this.newSubjectProps)) return
    const subject = rdf.sym(subjectUri) as rdf.NamedNode
    for (const pathString in this.newSubjectProps[subjectUri]) {
      // handling inverse path vs. direct path
      if (pathString.startsWith("^")) {
        const property = rdf.sym(pathString.substring(1)) as rdf.NamedNode
        const values: Array<Value> = this.newSubjectProps[subjectUri][pathString]
        for (const val of values) {
          if (val instanceof LiteralWithId) {
            throw "can't add literals in inverse path, something's wrong with the data!"
          } else {
            if (val.node?.value == "tmp:uri" || val.node?.value == "tmp:none") continue
            store.add(val.node, property, subject, defaultGraphNode)
            if (val instanceof Subject) {
              this.addNewValuestoStore(store, val.uri)
            }
          }
        }
      } else {
        const listMode = pathString.endsWith("[]")
        const property = rdf.sym(listMode ? pathString.substring(0, pathString.length - 2) : pathString) as rdf.NamedNode
        const values: Array<Value> = this.newSubjectProps[subjectUri][pathString]
        const collection = new rdf.Collection()
        for (const val of values) {
          //debug("val:", val, listMode)
          if (val instanceof LiteralWithId) {
            // do not add empty strings
            if (val.value == "") continue
            if (listMode) collection.append(val)
            else store.add(subject, property, val, defaultGraphNode)
          } else {
            //debug("saving:", val)
            if (val.node?.value == "tmp:uri" || val.node?.value == "tmp:none") continue
            if (listMode) {
              // val.node happens to be undefined when list has been updated in UI
              if (val.node) {
                collection.append(val.node)
              }
              // TODO: ???
              else if (val instanceof rdf.Literal) {
                collection.append(val)
              } else throw "could not add " + val + " to collection " + collection
            } else store.add(subject, property, val.node, defaultGraphNode)
            if (val instanceof Subject) {
              this.addNewValuestoStore(store, val.uri)
            }
          }
        }
        if (listMode && collection.elements.length) {
          collection.close()
          store.add(subject, property, collection, defaultGraphNode)
        }
      }
    }
  }

  propsUpdateEffect: (subjectUri: string, pathString: string) => AtomEffect<Array<Value>> =
    (subjectUri: string, pathString: string) =>
    ({ setSelf, onSet }: setSelfOnSet) => {
      onSet((newValues: Array<Value> | DefaultValue): void => {
        //debug("set",newValues)
        if (!(newValues instanceof DefaultValue)) {
          //debug("updating:",subjectUri, pathString, newValues)
          this.onUpdateValues(subjectUri, pathString, newValues)
        }
      })
    }

  @Memoize((pathString: string, subjectUri: string) => {
    return subjectUri + pathString
  })
  getAtomForSubjectProperty(pathString: string, subjectUri: string) {
    //debug("gAtomfSprop", pathString, subjectUri)
    return atom<Array<Value>>({
      key: this.idHash + subjectUri + pathString,
      default: [],
      // effects_UNSTABLE no more, see https://github.com/facebookexperimental/Recoil/blob/main/CHANGELOG-recoil.md#breaking-changes-1
      effects: [ /*debugAtomEffect,*/ this.propsUpdateEffect(subjectUri, pathString)],
      // disable immutability in production
      dangerouslyAllowMutability: true,
    })
  }

  hasSubject(subjectUri: string): boolean {
    return subjectUri in this.newSubjectProps
  }
}

// a proxy to an EntityGraph that updates the entity graph but is purely read-only, so that React is happy
export class EntityGraph {
  onGetInitialValues: (subjectUri: string, pathString: string, values: Array<Value>) => void
  getAtomForSubjectProperty: (pathString: string, subjectUri: string) => RecoilState<Array<Value>>

  getValues: () => EntityGraphValues

  get values(): EntityGraphValues {
    return this.getValues()
  }

  // where to start when reconstructing the tree
  topSubjectUri: string
  store: rdf.Store
  // connexGraph is the store that contains the labels of associated resources
  // (ex: students, teachers, etc.), it's not present in all circumstances
  connexGraph?: rdf.Store
  prefixMap: ns.PrefixMap
  labelProperties: Array<rdf.NamedNode>
  descriptionProperties: Array<rdf.NamedNode>

  constructor(
    store: rdf.Store,
    topSubjectUri: string,
    prefixMap = ns.defaultPrefixMap,
    connexGraph: rdf.Store = rdf.graph(),
    labelProperties = ns.defaultLabelProperties,
    descriptionProperties = ns.defaultDescriptionProperties
  ) {
    this.store = store
    this.prefixMap = prefixMap
    this.descriptionProperties = descriptionProperties
    this.labelProperties = labelProperties
    // strange code: we're keeping values in the closure so that when the object freezes
    // the freeze doesn't proagate to it
    const values = new EntityGraphValues(topSubjectUri)
    this.topSubjectUri = topSubjectUri
    this.onGetInitialValues = values.onGetInitialValues
    this.getAtomForSubjectProperty = (pathString, subjectUri) => values.getAtomForSubjectProperty(pathString, subjectUri)
    this.connexGraph = connexGraph
    this.getValues = () => {
      return values
    }
  }

  addNewValuestoStore(store: rdf.Store): void {
    this.values.addNewValuestoStore(store, this.topSubjectUri)
  }

  static addIdToLitList = (litList: Array<rdf.Literal>): Array<LiteralWithId> => {
    return litList.map((lit: rdf.Literal): LiteralWithId => {
      return new LiteralWithId(lit.value, lit.language, lit.datatype)
    })
  }

  static addLabelsFromGraph = (resList: Array<rdf.NamedNode>, graph: EntityGraph): Array<RDFResourceWithLabel> => {
    return resList.map((res: rdf.NamedNode): RDFResourceWithLabel => {
      return new RDFResourceWithLabel(res, graph)
    })
  }

  static addExtDataFromGraph = (resList: Array<rdf.NamedNode>, graph: EntityGraph): Array<RDFResourceWithLabel> => {
    return resList.map((res: rdf.NamedNode): RDFResourceWithLabel => {
      if (!graph.connexGraph) {
        throw "trying to access inexistant associatedStore"
      }
      const perLang: Record<string, string> = {}
      for (const p of graph.labelProperties) {
        const lits: Array<rdf.Literal> = graph.connexGraph.each(res, p, null) as Array<rdf.Literal>
        for (const lit of lits) {
          if (lit.language in perLang) continue
          perLang[lit.language] = lit.value
        }
      }
      return new ExtRDFResourceWithLabel(res.uri, perLang, undefined, undefined, graph.prefixMap)
    })
  }

  hasSubject(subjectUri: string): boolean {
    if (this.values.hasSubject(subjectUri)) return true
    return this.store.any(rdf.sym(subjectUri) as rdf.NamedNode, null, null) != null
  }

  static subjectify = (resList: Array<rdf.NamedNode>, graph: EntityGraph): Array<Subject> => {
    return resList.map((res: rdf.NamedNode): Subject => {
      return new Subject(res, graph)
    })
  }

  // only returns the values that were not initalized before
  getUnitializedValues(s: RDFResource, p: any): Array<Value> | null {
    const path = p.path
    if (!path) return null
    if (this.values.isInitialized(s.uri, path.sparqlString)) {
      return null
    }
    return this.getPropValuesFromStore(s, p)
  }

  getPropValuesFromStore(s: RDFResource, p: any): Array<Value> {
    if (!p.path) {
      throw "can't find path of " + p.uri
    }
    switch (p.objectType) {
      case ObjectType.ResExt:
        if (!p.path.directPathNode) {
          // I'm not so sure about this exception but well... it's ok in our current rules
          throw "can't have non-direct path for property " + p.uri
        }
        const fromRDFResExt: Array<rdf.NamedNode> = s.getPropResValuesFromPath(p.path)
        const fromRDFResExtwData = EntityGraph.addExtDataFromGraph(fromRDFResExt, s.graph)
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFResExtwData)
        return fromRDFResExtwData
        break
      case ObjectType.Internal:
        const fromRDFSubNode: Array<rdf.NamedNode> = s.getPropResValuesFromPath(p.path)
        const fromRDFSubs = EntityGraph.subjectify(fromRDFSubNode, s.graph)
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFSubs)
        return fromRDFSubs
        break
      case ObjectType.ResInList:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri
        }
        const fromRDFResList: Array<rdf.NamedNode> = s.getPropResValues(p.path.directPathNode)
        // TODO: p.graph should be the graph of the ontology instead
        const fromRDFReswLabels = EntityGraph.addLabelsFromGraph(fromRDFResList, p.graph)
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFReswLabels)
        return fromRDFReswLabels
        break
      case ObjectType.Literal:
      case ObjectType.LitInList:
      default:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri
        }
        let fromRDFLits: Array<rdf.Literal>
        if (p.hasListAsObject) {
          const fromRDFLitsList = s.getPropLitValuesFromList(p.path.directPathNode)
          fromRDFLits = fromRDFLitsList === null ? [] : fromRDFLitsList
        } else {
          fromRDFLits = s.getPropLitValues(p.path.directPathNode)
        }
        const fromRDFLitIDs = EntityGraph.addIdToLitList(fromRDFLits)
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFLitIDs)
        return fromRDFLitIDs
        break
    }
  }
}

export class RDFResource {
  node: rdf.NamedNode | rdf.BlankNode | rdf.Collection
  graph: EntityGraph
  isCollection: boolean

  constructor(node: rdf.NamedNode | rdf.BlankNode | rdf.Collection, graph: EntityGraph) {
    this.node = node
    this.graph = graph
    this.isCollection = node instanceof rdf.Collection
  }

  public get id(): string {
    return this.node.value
  }

  public get value(): string {
    return this.node.value
  }

  public get lname(): string {
    return this.graph.prefixMap.lnameFromUri(this.node.value)
  }

  public get namespace(): string {
    return this.graph.prefixMap.namespaceFromUri(this.node.value)
  }

  public get qname(): string {
    return this.graph.prefixMap.qnameFromUri(this.node.value)
  }

  public get uri(): string {
    return this.node.value
  }

  static valuesByLang(values: Array<Value>): Record<string, string> {
    const res: Record<string, string> = {}
    for (const value of values) {
      if (value instanceof LiteralWithId) {
        res[value.language] = value.value
      }
    }
    return res
  }

  public getPropValueByLang(p: rdf.NamedNode): Record<string, string> {
    if (this.node instanceof rdf.Collection) return {}
    const lits: Array<rdf.Literal> = this.graph.store.each(this.node, p, null) as Array<rdf.Literal>
    const res: Record<string, string> = {}
    for (const lit of lits) {
      res[lit.language] = lit.value
    }
    return res
  }

  public getPropValueOrNullByLang(p: rdf.NamedNode): Record<string, string> | null {
    if (this.node instanceof rdf.Collection) return {}
    const lits: Array<rdf.Literal> = this.graph.store.each(this.node, p, null) as Array<rdf.Literal>
    const res: Record<string, string> = {}
    let i = 0
    for (const lit of lits) {
      i += 1
      res[lit.language] = lit.value
    }
    if (i == 0) return null
    return res
  }

  public getPropLitValues(p: rdf.NamedNode): Array<rdf.Literal> {
    if (this.node instanceof rdf.Collection) return []
    return this.graph.store.each(this.node, p, null) as Array<rdf.Literal>
  }

  public getPropResValues(p: rdf.NamedNode): Array<rdf.NamedNode> {
    if (this.node instanceof rdf.Collection) return []
    return this.graph.store.each(this.node, p, null) as Array<rdf.NamedNode>
  }

  public getPropResValuesFromList(p: rdf.NamedNode): Array<rdf.NamedNode> | null {
    if (this.node instanceof rdf.Collection) return null
    const colls = this.graph.store.each(this.node, p, null) as Array<rdf.Collection>
    for (const coll of colls) {
      return coll.elements as Array<rdf.NamedNode>
    }
    return null
  }

  public getPropLitValuesFromList(p: rdf.NamedNode): Array<rdf.Literal> | null {
    if (this.node instanceof rdf.Collection) return null
    const colls = this.graph.store.each(this.node, p, null) as Array<rdf.Collection>
    for (const coll of colls) {
      return coll.elements as Array<rdf.Literal>
    }
    return null
  }

  public getPropIntValue(p: rdf.NamedNode): number | null {
    if (this.node instanceof rdf.Collection) return null
    const lit: rdf.Literal | null = this.graph.store.any(this.node, p, null) as rdf.Literal | null
    if (lit === null) return null
    return rdfLitAsNumber(lit)
  }

  public getPropStringValue(p: rdf.NamedNode): string | null {
    if (this.node instanceof rdf.Collection) return null
    const lit: rdf.Literal | null = this.graph.store.any(this.node, p, null) as rdf.Literal | null
    if (lit === null) return null
    return lit.value
  }

  public getPropResValue(p: rdf.NamedNode): rdf.NamedNode | null {
    if (this.node instanceof rdf.Collection) return null
    const res: rdf.NamedNode | null = this.graph.store.any(this.node, p, null) as rdf.NamedNode | null
    return res
  }

  public getPropResValuesFromPath(p: Path): Array<rdf.NamedNode> {
    if (this.node instanceof rdf.Collection) return []
    if (p.directPathNode) {
      return this.graph.store.each(this.node, p.directPathNode, null) as Array<rdf.NamedNode>
    }
    return this.graph.store.each(null, p.inversePathNode, this.node) as Array<rdf.NamedNode>
  }

  public getPropResValueFromPath(p: Path): rdf.NamedNode | null {
    if (this.node instanceof rdf.Collection) return null
    if (p.directPathNode) {
      return this.graph.store.any(this.node, p.directPathNode, null) as rdf.NamedNode | null
    }
    return this.graph.store.any(this.node, p.inversePathNode, null) as rdf.NamedNode | null
  }

  public getPropBooleanValue(p: rdf.NamedNode, dflt = false): boolean {
    if (this.node instanceof rdf.Collection) return dflt
    const lit: rdf.Literal = this.graph.store.any(this.node, p, null) as rdf.Literal
    if (!lit) return dflt
    const n = Boolean(lit.value)
    if (n) {
      return n
    }
    return dflt
  }
}

export class RDFResourceWithLabel extends RDFResource {
  node: rdf.NamedNode

  constructor(node: rdf.NamedNode, graph: EntityGraph, labelProp?: rdf.NamedNode) {
    super(node, graph)
    this.node = node
  }

  @Memoize()
  public get prefLabels(): Record<string, string> {
    for (const p of this.graph.labelProperties) {
      const res = this.getPropValueOrNullByLang(p)
      if (res != null) return res
    }
    return { en: this.node.uri }
  }

  @Memoize()
  public get description(): Record<string, string> | null {
    for (const p of this.graph.descriptionProperties) {
      const res = this.getPropValueOrNullByLang(p)
      if (res != null) return res
    }
    return null
  }
}

// this class allows to create a resource from just a URI and labels, we need it for external entities
export class ExtRDFResourceWithLabel extends RDFResourceWithLabel {
  private _prefLabels: Record<string, string>
  private _description: Record<string, string> | null
  private _otherData: Record<string, any>

  public get prefLabels(): Record<string, string> {
    return this._prefLabels
  }

  public get description(): Record<string, string> | null {
    return this._description
  }

  public get otherData(): Record<string, any> {
    return this._otherData
  }

  constructor(
    uri: string,
    prefLabels: Record<string, string>,
    data: Record<string, any> = {},
    description: Record<string, any> | null = null,
    prefixMap?: ns.PrefixMap
  ) {
    super(rdf.sym(uri) as rdf.NamedNode, new EntityGraph(new rdf.Store(), uri, prefixMap))
    this._prefLabels = prefLabels
    this._description = description
    //debug("data", data)
    this._otherData = data
  }

  public addOtherData(key: string, value: any): ExtRDFResourceWithLabel {
    // TODO: will need actual config.prefixMap here as well
    return new ExtRDFResourceWithLabel(this.uri, this._prefLabels, { ...this._otherData, [key]: value })
  }
}

export class LiteralWithId extends rdf.Literal {
  id: string

  constructor(value: string, language?: string | null, datatype?: rdf.NamedNode, id?: string) {
    super(value, language, datatype)
    if (id) {
      this.id = id
    } else {
      this.id = nanoid()
    }
  }

  public copy() {
    return new LiteralWithId(this.value, this.language, this.datatype, this.id)
  }

  public copyWithUpdatedValue(value: string) {
    return new LiteralWithId(value, this.language, this.datatype, this.id)
  }

  public copyWithUpdatedLanguage(language: string) {
    return new LiteralWithId(this.value, language, this.datatype, this.id)
  }
}

export type Value = Subject | LiteralWithId | RDFResourceWithLabel

export class Subject extends RDFResource {
  node: rdf.NamedNode

  constructor(node: rdf.NamedNode, graph: EntityGraph) {
    super(node, graph)
    this.node = node
  }

  getUnitializedValues(property: any): Array<Value> | null {
    return this.graph.getUnitializedValues(this, property)
  }

  getAtomForProperty(pathString: string) {
    return this.graph.getAtomForSubjectProperty(pathString, this.uri)
  }

  /*
  // sets the flag to store to history or not according to the case,
  // allows to store value modification not on top of history,
  // 
  // ex: noHisto(false, -1)    // put empty subnodes in history before tmp:allValuesLoaded
  //     noHisto(false, 1)     // allow parent node in history but default empty subnodes before tmp:allValuesLoaded
  //     noHisto(false, false) // history back to normal => not exactly... must also use resetNoHisto()
  //     noHisto(true)         // disable value storing when doing undo/redo
  */
  noHisto(force = false, start: boolean | number = true) {
    const current = this.graph.getValues().noHisto
    //debug("noHisto:", force, start, this.qname, this, current)
    if (!force && current === -1) return
    // DONE: default values need to be added to history when entity is loading
    if (start !== true) this.graph.getValues().noHisto = start
    // TODO: update test to be true when adding empty val after having selected ExtEntity in a Facet (use getParentPath?)
    else if (force || history[this.uri] && history[this.uri].some((h) => h["tmp:allValuesLoaded"]))
      this.graph.getValues().noHisto = true
  }
  resetNoHisto() {
    this.graph.getValues().noHisto = false
  }

  static createEmpty(): Subject {
    return new Subject(rdf.sym("tmp:uri") as rdf.NamedNode, new EntityGraph(new rdf.Store(), "tmp:uri"))
  }

  isEmpty(): boolean {
    return this.node.uri == "tmp:uri"
  }
}

export const noneSelected = new ExtRDFResourceWithLabel("tmp:none", { en: "–" }, {}, { en: "none provided" })
export const emptyLiteral = new LiteralWithId("")

export const sameLanguage = (lang1: string, lang2: string): boolean => {
  // TODO: ignore suffixes
  return lang1 == lang2
}
