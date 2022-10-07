import * as rdf from "rdflib"
import {
  RDFResource,
  RDFResourceWithLabel,
  EntityGraph,
  ExtRDFResourceWithLabel,
  Subject,
  rdfLitAsNumber,
  LiteralWithId,
  ObjectType,
  Value,
} from "./types"
import * as ns from "./ns"
import { debugStore } from "./io"
import { Memoize } from "typescript-memoize"

const debug = require("debug")("rde:rdf:shapes")

// TODO: this should be fetched somewhere... unclear where yet
export const shapeRefsMap: Record<string, RDFResourceWithLabel> = {
  "bds:PersonShape": new ExtRDFResourceWithLabel(ns.BDS("PersonShape").value, { en: "Person" }),
  //"bds:TopicShape": new ExtRDFResourceWithLabel(ns.BDS("TopicShape").value, { en: "Topic" }), //etc.
  "bds:UserProfileShape": new ExtRDFResourceWithLabel(ns.BDS("UserProfileShape").value, { en: "User profile" }),
}

export const possibleShapeRefs: Array<RDFResourceWithLabel> = [
  shapeRefsMap["bds:PersonShape"],
  //shapeRefsMap["bds:TopicShape"], // etc.
]

export const rdfType = ns.RDF("type") as rdf.NamedNode
export const shProperty = ns.SH("property")
export const shGroup = ns.SH("group")
export const shOrder = ns.SH("order") as rdf.NamedNode
export const rdfsLabel = ns.RDFS("label") as rdf.NamedNode
export const prefLabel = ns.SKOS("prefLabel") as rdf.NamedNode
export const shName = ns.SH("name") as rdf.NamedNode
export const shPath = ns.SH("path") as rdf.NamedNode
export const dashEditor = ns.DASH("editor") as rdf.NamedNode
export const shNode = ns.SH("node") as rdf.NamedNode
export const dashListShape = ns.DASH("ListShape") as rdf.NamedNode
export const dashEnumSelectEditor = ns.DASH("EnumSelectEditor") as rdf.NamedNode
export const shMessage = ns.SH("message") as rdf.NamedNode
export const bdsDisplayPriority = ns.BDS("displayPriority") as rdf.NamedNode
export const shMinCount = ns.SH("minCount") as rdf.NamedNode
export const shMinInclusive = ns.SH("minInclusive") as rdf.NamedNode
export const shMinExclusive = ns.SH("minExclusive") as rdf.NamedNode
export const shClass = ns.SH("class") as rdf.NamedNode
export const shMaxCount = ns.SH("maxCount") as rdf.NamedNode
export const shMaxInclusive = ns.SH("maxInclusive") as rdf.NamedNode
export const shMaxExclusive = ns.SH("maxExclusive") as rdf.NamedNode
export const shDatatype = ns.SH("datatype") as rdf.NamedNode
export const dashSingleLine = ns.DASH("singleLine") as rdf.NamedNode
export const shTargetClass = ns.SH("targetClass") as rdf.NamedNode
export const shTargetObjectsOf = ns.SH("targetObjectsOf") as rdf.NamedNode
export const shTargetSubjectsOf = ns.SH("targetSubjectsOf") as rdf.NamedNode
export const bdsPropertyShapeType = ns.BDS("propertyShapeType") as rdf.NamedNode
export const bdsFacetShape = ns.BDS("FacetShape") as rdf.NamedNode
export const bdsExternalShape = ns.BDS("ExternalShape") as rdf.NamedNode
export const bdsIgnoreShape = ns.BDS("IgnoreShape") as rdf.NamedNode
export const bdsClassIn = ns.BDS("classIn") as rdf.NamedNode
export const shIn = ns.SH("in") as rdf.NamedNode
export const shInversePath = ns.SH("inversePath") as rdf.NamedNode
export const shUniqueLang = ns.SH("uniqueLang") as rdf.NamedNode
export const bdsReadOnly = ns.BDS("readOnly") as rdf.NamedNode
export const bdsIdentifierPrefix = ns.BDS("identifierPrefix") as rdf.NamedNode
export const bdsAllowMarkDown = ns.BDS("allowMarkDown") as rdf.NamedNode
export const shNamespace = ns.SH("namespace") as rdf.NamedNode
export const bdsDefaultLanguage = ns.BDS("defaultLanguage") as rdf.NamedNode
export const bdsDefaultValue = ns.BDS("defaultValue") as rdf.NamedNode
export const shLanguageIn = ns.SH("languageIn") as rdf.NamedNode
export const shPattern = ns.SH("pattern") as rdf.NamedNode
export const bdsSortOnProperty = ns.BDS("sortOnProperty") as rdf.NamedNode
export const bdsAllowPushToTopLevelSkosPrefLabel = ns.BDS("allowPushToTopLevelSkosPrefLabel") as rdf.NamedNode
export const bdsIndependentIdentifiers = ns.BDS("independentIdentifiers") as rdf.NamedNode
export const bdsSpecialPattern = ns.BDS("specialPattern") as rdf.NamedNode
export const bdsConnectIDs = ns.BDS("connectIDs") as rdf.NamedNode
export const bdsAllowBatchManagement = ns.BDS("allowBatchManagement") as rdf.NamedNode
export const bdsCopyObjectsOfProperty = ns.BDS("copyObjectsOfProperty") as rdf.NamedNode
export const bdsUniqueValueAmongSiblings = ns.BDS("uniqueValueAmongSiblings") as rdf.NamedNode

export const typeUriToShape: Record<string, Array<RDFResourceWithLabel>> = {}
typeUriToShape[ns.BDO_uri + "Person"] = [shapeRefsMap["bds:PersonShape"]]
//typeUriToShape[ns.BDO_uri + "Topic"] = [shapeRefsMap["bds:TopicShape"]] // etc.

export const shapeRefsForEntity = (subject: Subject): Array<RDFResourceWithLabel> | null => {
  const type = subject.getPropResValue(rdfType)
  debug("type:", subject, type)
  if (type == null) return null
  return typeUriToShape[type.uri]
}

export const sortByPropValue = (
  nodelist: Array<rdf.NamedNode>,
  p: rdf.NamedNode,
  store: rdf.Store
): Array<rdf.NamedNode> => {
  const orderedGroupObjs: Record<number, rdf.NamedNode> = {}
  let orders: Array<number> = []
  for (const node of nodelist) {
    let order = 0
    const ordern: rdf.Literal | null = store.any(node, p, null) as rdf.Literal
    if (ordern) {
      const asnum = rdfLitAsNumber(ordern)
      if (asnum !== null) order = asnum
      else throw "no order found for node and property: " + node.value + " , " + p.value + " , " + asnum
      //orders.push(order) // instead let's try to avoid duplicates first
    }
    // TODO: enable this as exception
    else debug("missing order from node and property" + node.value + " , " + p.value)

    // quickfix for bug when multiple order are the same
    if (orderedGroupObjs[order]) {
      debug("current node:", node)
      debug("  order " + order + " already exists:", orderedGroupObjs[order])
      let possibleOrder = Object.keys(orderedGroupObjs)
      if (orderedGroupObjs[possibleOrder.length]) {
        possibleOrder = possibleOrder.reduce((acc, n) => n > acc ? n : acc, -1)
        possibleOrder++
      }
      order = possibleOrder
    }
    orderedGroupObjs[order] = node
  }
  orders = Object.keys(orderedGroupObjs).sort((a, b) => a - b)
  const res: Array<rdf.NamedNode> = []
  for (const order of orders) {
    res.push(orderedGroupObjs[order])
  }
  return res
}

export class Path {
  sparqlString: string

  directPathNode: rdf.NamedNode | null = null
  inversePathNode: rdf.NamedNode | null = null

  constructor(node: rdf.Node, graph: EntityGraph, listMode: boolean) {
    const invpaths = graph.store.each(node, shInversePath, null) as Array<rdf.NamedNode>
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

export class PropertyShape extends RDFResourceWithLabel {
  ontologyGraph: EntityGraph

  constructor(node: rdf.NamedNode, graph: EntityGraph, ontologyGraph: EntityGraph) {
    super(node, graph, rdfsLabel)
    this.ontologyGraph = ontologyGraph
  }

  // different property for prefLabels, property shapes are using sh:name, otherwise use
  // ontology
  @Memoize()
  public get prefLabels(): Record<string, string> {
    let res = {}
    if (this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.ontologyGraph)
        res = propInOntology.prefLabels
      }
    }
    const resFromShape = this.getPropValueByLang(shName)
    res = { ...res, ...resFromShape }
    return res
  }

  // helpMessage directly from shape or from the ontology
  @Memoize()
  public get helpMessage(): Record<string, string> | null {
    let res = this.description
    if (res == null && this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.ontologyGraph)
        res = propInOntology.description
      }
    }
    return res
  }

  // error message?
  @Memoize()
  public get errorMessage(): Record<string, string> | null {
    const res = this.getPropValueByLang(shMessage)
    return res
  }

  @Memoize()
  public get defaultValue(): rdf.Node | null {
    return this.graph.store.any(this.node, bdsDefaultValue, null)
  }

  @Memoize()
  public get singleLine(): boolean {
    return this.getPropBooleanValue(dashSingleLine)
  }

  @Memoize()
  public get connectIDs(): boolean {
    return this.getPropBooleanValue(bdsConnectIDs, false)
  }

  @Memoize()
  public get displayPriority(): number | null {
    return this.getPropIntValue(bdsDisplayPriority)
  }

  @Memoize()
  public get minCount(): number | null {
    return this.getPropIntValue(shMinCount)
  }

  @Memoize()
  public get maxCount(): number | null {
    return this.getPropIntValue(shMaxCount)
  }

  @Memoize()
  public get minInclusive(): number | null {
    return this.getPropIntValue(shMinInclusive)
  }

  @Memoize()
  public get maxInclusive(): number | null {
    return this.getPropIntValue(shMaxInclusive)
  }

  @Memoize()
  public get minExclusive(): number | null {
    return this.getPropIntValue(shMinExclusive)
  }

  @Memoize()
  public get maxExclusive(): number | null {
    return this.getPropIntValue(shMaxExclusive)
  }

  @Memoize()
  public get allowMarkDown(): boolean | null {
    return this.getPropBooleanValue(bdsAllowMarkDown)
  }

  @Memoize()
  public get allowBatchManagement(): boolean | null {
    return this.getPropBooleanValue(bdsAllowBatchManagement)
  }

  @Memoize()
  public get uniqueValueAmongSiblings(): boolean | null {
    return this.getPropBooleanValue(bdsUniqueValueAmongSiblings)
  }

  @Memoize()
  public get uniqueLang(): boolean | null {
    return this.getPropBooleanValue(shUniqueLang)
  }

  @Memoize()
  public get readOnly(): boolean {
    return this.getPropBooleanValue(bdsReadOnly)
  }

  @Memoize()
  public get defaultLanguage(): string | null {
    return this.getPropStringValue(bdsDefaultLanguage)
  }

  @Memoize()
  public get editorLname(): string | null {
    const val = this.getPropResValue(dashEditor)
    if (!val) return null
    return ns.lnameFromUri(val.value)
  }

  @Memoize()
  public get group(): rdf.NamedNode | null {
    return this.getPropResValue(shGroup as rdf.NamedNode)
  }

  @Memoize()
  public get copyObjectsOfProperty(): Array<rdf.NamedNode> | null {
    const res: Array<PropertyShape> = []
    return this.graph.store.each(this.node, bdsCopyObjectsOfProperty, null) as Array<rdf.NamedNode>
  }

  @Memoize()
  public get datatype(): rdf.NamedNode | null {
    const res = this.getPropResValue(shDatatype)
    if (res === null && this.hasListAsObject) {
      const propNodes: Array<rdf.NamedNode | rdf.BlankNode> = this.graph.store.each(
        this.node,
        shProperty,
        null
      ) as Array<rdf.NamedNode | rdf.BlankNode>
      if (!propNodes) return null
      const props: Array<RDFResource> = PropertyShape.resourcizeWithInit(propNodes, this.graph)
      for (const p of props) {
        return p.getPropResValue(shDatatype)
      }
    }
    return res
  }

  @Memoize()
  public get pattern(): string | null {
    return this.getPropStringValue(shPattern)
  }

  @Memoize()
  public get sortOnProperty(): rdf.NamedNode | null {
    return this.getPropResValue(bdsSortOnProperty)
  }

  @Memoize()
  public get allowPushToTopLevelSkosPrefLabel(): boolean {
    return this.getPropBooleanValue(bdsAllowPushToTopLevelSkosPrefLabel)
  }

  @Memoize()
  public get specialPattern(): string | null {
    return this.getPropResValue(bdsSpecialPattern)
  }

  public static resourcizeWithInit(
    nodes: Array<rdf.NamedNode | rdf.BlankNode>,
    graph: EntityGraph
  ): Array<RDFResourceWithLabel> {
    const res: Array<RDFResourceWithLabel> = []
    for (const node of nodes) {
      const r = new RDFResourceWithLabel(node, graph)
      // just a way to intialize the value before the object gets frozen like a yogurt by Recoil
      let justforinit = r.description
      justforinit = r.prefLabels
      res.push(r)
    }
    return res
  }

  @Memoize()
  public get hasListAsObject(): boolean {
    const res = this.graph.store.each(this.node, shNode, dashListShape)
    if (res == null || res.length == 0) return false
    return true
  }

  @Memoize()
  public get in(): Array<RDFResourceWithLabel | LiteralWithId> | null {
    if (this.hasListAsObject) {
      // if no direct in, let's look at the sh:property objects (quite counter intuitive, but it follows the shacl examples)
      const propNodes: Array<rdf.NamedNode | rdf.BlankNode> = this.graph.store.each(
        this.node,
        shProperty,
        null
      ) as Array<rdf.NamedNode | rdf.BlankNode>
      if (!propNodes) return null
      const props: Array<RDFResource> = PropertyShape.resourcizeWithInit(propNodes, this.graph)
      for (const p of props) {
        if (p.getPropResValue(shDatatype)) {
          const nodes = p.getPropLitValuesFromList(shIn)
          if (nodes) return EntityGraph.addIdToLitList(nodes)
        } else {
          const nodes = p.getPropResValuesFromList(shIn)
          if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.ontologyGraph)
        }
      }
    }
    if (this.datatype) {
      const nodes = this.getPropLitValuesFromList(shIn)
      if (nodes) return EntityGraph.addIdToLitList(nodes)
    } else {
      // if no datatype, then it's res
      const nodes = this.getPropResValuesFromList(shIn)
      if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.ontologyGraph)
    }
    return null
  }

  @Memoize()
  public get expectedObjectTypes(): Array<RDFResourceWithLabel> | null {
    let nodes = this.getPropResValuesFromList(bdsClassIn)
    if (!nodes) {
      const cl = this.getPropResValues(shClass)
      if (cl.length) nodes = cl
    }
    if (!nodes) return null
    return PropertyShape.resourcizeWithInit(nodes, this.ontologyGraph)
  }

  @Memoize()
  public get path(): Path | null {
    const pathNode = this.getPropResValue(shPath)
    if (!pathNode) return null
    return new Path(pathNode, this.graph, this.hasListAsObject)
  }

  @Memoize()
  public get objectType(): ObjectType {
    const propertyShapeType = this.getPropResValue(bdsPropertyShapeType)
    if (!propertyShapeType) {
      const editor = this.getPropResValue(dashEditor)
      if (!editor) return ObjectType.Literal
      if (editor.value == dashEnumSelectEditor.value) {
        if (this.datatype) return ObjectType.LitInList
        return ObjectType.ResInList
      }
      return ObjectType.Literal
    }
    // for some reason direct comparison doesn't work...
    if (propertyShapeType.value == bdsFacetShape.value) return ObjectType.Facet
    else if (propertyShapeType.value == bdsExternalShape.value) return ObjectType.ResExt
    else if (propertyShapeType.value == bdsIgnoreShape.value) return ObjectType.ResIgnore
    throw "can't handle property shape type " + propertyShapeType.value + " for property shape " + this.qname
  }

  @Memoize()
  public get targetShape(): NodeShape | null {
    const path = this.path
    if (!path) {
      debug("can't find path for " + this.uri)
      return null
    }
    let val: rdf.NamedNode | null
    if (path.directPathNode) {
      val = this.graph.store.any(null, shTargetObjectsOf, path.directPathNode) as rdf.NamedNode | null
      if (val == null) return null
      return new NodeShape(val, this.graph, this.ontologyGraph)
    }
    if (path.inversePathNode) {
      val = this.graph.store.any(null, shTargetSubjectsOf, path.inversePathNode) as rdf.NamedNode | null
      if (val == null) return null
      return new NodeShape(val, this.graph, this.ontologyGraph)
    }
    return null
  }
}

export class PropertyGroup extends RDFResourceWithLabel {
  ontologyGraph: EntityGraph

  constructor(node: rdf.NamedNode, graph: EntityGraph, ontologyGraph: EntityGraph) {
    super(node, graph, rdfsLabel)
    this.ontologyGraph = ontologyGraph
  }

  @Memoize()
  public get properties(): Array<PropertyShape> {
    const res: Array<PropertyShape> = []
    let propsingroup: Array<rdf.NamedNode> = this.graph.store.each(null, shGroup, this.node) as Array<rdf.NamedNode>
    propsingroup = sortByPropValue(propsingroup, shOrder, this.graph.store)
    for (const prop of propsingroup) {
      res.push(new PropertyShape(prop, this.graph, this.ontologyGraph))
    }
    return res
  }

  // different property for prefLabels, property shapes are using sh:name
  @Memoize()
  public get prefLabels(): Record<string, string> {
    return this.getPropValueByLang(rdfsLabel)
  }
}

export class NodeShape extends RDFResourceWithLabel {
  ontologyGraph: EntityGraph

  constructor(node: rdf.NamedNode, graph: EntityGraph, ontologyGraph: EntityGraph) {
    super(node, graph, rdfsLabel)
    this.ontologyGraph = ontologyGraph
  }

  @Memoize()
  public get targetClassPrefLabels(): Record<string, string> | null {
    const targetClass: rdf.NamedNode | null = this.graph.store.any(this.node, shTargetClass, null) as rdf.NamedNode
    if (targetClass == null) return null
    const classInOntology = new RDFResourceWithLabel(targetClass, this.ontologyGraph)
    return classInOntology.prefLabels
  }

  @Memoize()
  public get properties(): Array<PropertyShape> {
    const res: Array<PropertyShape> = []
    // get all ?shape sh:property/sh:group ?group
    let props: Array<rdf.NamedNode> = this.graph.store.each(this.node, shProperty, null) as Array<rdf.NamedNode>
    props = sortByPropValue(props, shOrder, this.graph.store)
    for (const prop of props) {
      res.push(new PropertyShape(prop, this.graph, this.ontologyGraph))
    }
    return res
  }

  @Memoize()
  public get independentIdentifiers(): boolean {
    return this.getPropBooleanValue(bdsIndependentIdentifiers, false)
  }

  @Memoize()
  public get groups(): Array<PropertyGroup> {
    const res: Array<PropertyGroup> = []
    // get all ?shape sh:property/sh:group ?group
    const props: Array<rdf.NamedNode> = this.graph.store.each(this.node, shProperty, null) as Array<rdf.NamedNode>
    let grouplist: Array<rdf.NamedNode> = []
    for (const prop of props) {
      // we assume there's only one group per property, by construction of the shape (maybe it's wrong?)
      const group: rdf.NamedNode | null = this.graph.store.any(prop, shGroup, null) as rdf.NamedNode
      // for some reason grouplist.includes(group) doesn't work, I suppose new objects are created by rdflib
      if (group && !grouplist.some((e) => e.value === group.value)) {
        grouplist.push(group)
      }
    }
    grouplist = sortByPropValue(grouplist, shOrder, this.graph.store)
    for (const group of grouplist) {
      res.push(new PropertyGroup(group, this.graph, this.ontologyGraph))
    }
    return res
  }
}
