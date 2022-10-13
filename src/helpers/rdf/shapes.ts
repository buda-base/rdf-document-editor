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
import { Memoize } from "typescript-memoize"
import { nanoid, customAlphabet } from "nanoid"

const debug = require("debug")("rde:rdf:shapes")

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
export const rdeDisplayPriority = ns.RDE("displayPriority") as rdf.NamedNode
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
export const rdePropertyShapeType = ns.RDE("propertyShapeType") as rdf.NamedNode
export const rdeInternalShape = ns.RDE("InternalShape") as rdf.NamedNode
export const rdeExternalShape = ns.RDE("ExternalShape") as rdf.NamedNode
export const rdeIgnoreShape = ns.RDE("IgnoreShape") as rdf.NamedNode
export const rdeClassIn = ns.RDE("classIn") as rdf.NamedNode
export const shIn = ns.SH("in") as rdf.NamedNode
export const shInversePath = ns.SH("inversePath") as rdf.NamedNode
export const shUniqueLang = ns.SH("uniqueLang") as rdf.NamedNode
export const rdeReadOnly = ns.RDE("readOnly") as rdf.NamedNode
export const rdeIdentifierPrefix = ns.RDE("identifierPrefix") as rdf.NamedNode
export const rdeAllowMarkDown = ns.RDE("allowMarkDown") as rdf.NamedNode
export const shNamespace = ns.SH("namespace") as rdf.NamedNode
export const rdeDefaultLanguage = ns.RDE("defaultLanguage") as rdf.NamedNode
export const rdeDefaultValue = ns.RDE("defaultValue") as rdf.NamedNode
export const shLanguageIn = ns.SH("languageIn") as rdf.NamedNode
export const shPattern = ns.SH("pattern") as rdf.NamedNode
export const rdeSortOnProperty = ns.RDE("sortOnProperty") as rdf.NamedNode
export const rdeAllowPushToTopLevelLabel = ns.RDE("allowPushToTopLevelLabel") as rdf.NamedNode
export const rdeIndependentIdentifiers = ns.RDE("independentIdentifiers") as rdf.NamedNode
export const rdeSpecialPattern = ns.RDE("specialPattern") as rdf.NamedNode
export const rdeConnectIDs = ns.RDE("connectIDs") as rdf.NamedNode
export const rdeAllowBatchManagement = ns.RDE("allowBatchManagement") as rdf.NamedNode
export const rdeCopyObjectsOfProperty = ns.RDE("copyObjectsOfProperty") as rdf.NamedNode
export const rdeUniqueValueAmongSiblings = ns.RDE("uniqueValueAmongSiblings") as rdf.NamedNode
export const rdfLangString = ns.RDF("langString") as rdf.NamedNode
export const skosDefinition = ns.SKOS("definition") as rdf.NamedNode
export const rdfsComment = ns.RDFS("comment") as rdf.NamedNode
export const shDescription = ns.SH("description") as rdf.NamedNode

export const defaultLabelProperties = [prefLabel, rdfsLabel, shName]
export const defaultDescriptionProperties = [skosDefinition, rdfsComment, shDescription]

export const sortByPropValue = (
  nodelist: Array<rdf.NamedNode>,
  property: rdf.NamedNode,
  store: rdf.Store
): Array<rdf.NamedNode> => {
  const nodeUriToPropValue: Record<string,number> = {}
  for (const node of nodelist) {
    const ordern: rdf.Literal | null = store.any(node, property, null) as rdf.Literal
    if (!ordern) nodeUriToPropValue[node.uri] = 0
    const asnum = rdfLitAsNumber(ordern)
    nodeUriToPropValue[node.uri] = asnum == null ? 0 : asnum
  }
  // TODO: untested
  return [...nodelist].sort((a: rdf.NamedNode, b: rdf.NamedNode) => {
    return nodeUriToPropValue[a.uri] - nodeUriToPropValue[b.uri]
  })
}

export class Path {
  sparqlString: string

  directPathNode: rdf.NamedNode | null = null
  inversePathNode: rdf.NamedNode | null = null

  constructor(node: rdf.NamedNode, graph: EntityGraph, listMode: boolean) {
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
  constructor(node: rdf.NamedNode, graph: EntityGraph) {
    super(node, graph, rdfsLabel)
  }

  // different property for prefLabels, property shapes are using sh:name, otherwise use
  // labels of the property
  @Memoize()
  public get prefLabels(): Record<string, string> {
    let res = {}
    if (this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.graph)
        res = propInOntology.prefLabels
      }
    }
    const resFromShape = this.getPropValueByLang(shName)
    res = { ...res, ...resFromShape }
    return res
  }

  // helpMessage directly from shape or from the property
  @Memoize()
  public get helpMessage(): Record<string, string> | null {
    let res = this.description
    if (res == null && this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.graph)
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
    return this.graph.store.any(this.node, rdeDefaultValue, null)
  }

  @Memoize()
  public get singleLine(): boolean {
    return this.getPropBooleanValue(dashSingleLine)
  }

  @Memoize()
  public get connectIDs(): boolean {
    return this.getPropBooleanValue(rdeConnectIDs, false)
  }

  @Memoize()
  public get displayPriority(): number | null {
    return this.getPropIntValue(rdeDisplayPriority)
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
    return this.getPropBooleanValue(rdeAllowMarkDown)
  }

  @Memoize()
  public get allowBatchManagement(): boolean | null {
    return this.getPropBooleanValue(rdeAllowBatchManagement)
  }

  @Memoize()
  public get uniqueValueAmongSiblings(): boolean | null {
    return this.getPropBooleanValue(rdeUniqueValueAmongSiblings)
  }

  @Memoize()
  public get uniqueLang(): boolean | null {
    return this.getPropBooleanValue(shUniqueLang)
  }

  @Memoize()
  public get readOnly(): boolean {
    return this.getPropBooleanValue(rdeReadOnly)
  }

  @Memoize()
  public get defaultLanguage(): string | null {
    return this.getPropStringValue(rdeDefaultLanguage)
  }

  @Memoize()
  public get editorLname(): string | null {
    const val = this.getPropResValue(dashEditor)
    if (!val) return null
    return ns.defaultPrefixMap.lnameFromUri(val.value)
  }

  @Memoize()
  public get group(): rdf.NamedNode | null {
    return this.getPropResValue(shGroup as rdf.NamedNode)
  }

  @Memoize()
  public get copyObjectsOfProperty(): Array<rdf.NamedNode> | null {
    const res: Array<PropertyShape> = []
    return this.graph.store.each(this.node, rdeCopyObjectsOfProperty, null) as Array<rdf.NamedNode>
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
    return this.getPropResValue(rdeSortOnProperty)
  }

  @Memoize()
  public get allowPushToTopLevelLabel(): boolean {
    return this.getPropBooleanValue(rdeAllowPushToTopLevelLabel)
  }

  @Memoize()
  public get specialPattern(): rdf.NamedNode | null {
    return this.getPropResValue(rdeSpecialPattern)
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
          if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.graph)
        }
      }
    }
    if (this.datatype) {
      const nodes = this.getPropLitValuesFromList(shIn)
      if (nodes) return EntityGraph.addIdToLitList(nodes)
    } else {
      // if no datatype, then it's res
      const nodes = this.getPropResValuesFromList(shIn)
      if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.graph)
    }
    return null
  }

  @Memoize()
  public get expectedObjectTypes(): Array<RDFResourceWithLabel> | null {
    let nodes = this.getPropResValuesFromList(rdeClassIn)
    if (!nodes) {
      const cl = this.getPropResValues(shClass)
      if (cl.length) nodes = cl
    }
    if (!nodes) return null
    return PropertyShape.resourcizeWithInit(nodes, this.graph)
  }

  @Memoize()
  public get path(): Path | null {
    const pathNode = this.getPropResValue(shPath)
    if (!pathNode) return null
    return new Path(pathNode, this.graph, this.hasListAsObject)
  }

  @Memoize()
  public get objectType(): ObjectType {
    const propertyShapeType = this.getPropResValue(rdePropertyShapeType)
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
    if (propertyShapeType.value == rdeInternalShape.value) return ObjectType.Internal
    else if (propertyShapeType.value == rdeExternalShape.value) return ObjectType.ResExt
    else if (propertyShapeType.value == rdeIgnoreShape.value) return ObjectType.ResIgnore
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
      return new NodeShape(val, this.graph)
    }
    if (path.inversePathNode) {
      val = this.graph.store.any(null, shTargetSubjectsOf, path.inversePathNode) as rdf.NamedNode | null
      if (val == null) return null
      return new NodeShape(val, this.graph)
    }
    return null
  }
}

export class PropertyGroup extends RDFResourceWithLabel {
  constructor(node: rdf.NamedNode, graph: EntityGraph) {
    super(node, graph, rdfsLabel)
  }

  @Memoize()
  public get properties(): Array<PropertyShape> {
    const res: Array<PropertyShape> = []
    let propsingroup: Array<rdf.NamedNode> = this.graph.store.each(null, shGroup, this.node) as Array<rdf.NamedNode>
    propsingroup = sortByPropValue(propsingroup, shOrder, this.graph.store)
    for (const prop of propsingroup) {
      res.push(new PropertyShape(prop, this.graph))
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
  constructor(node: rdf.NamedNode, graph: EntityGraph) {
    super(node, graph, rdfsLabel)
  }

  @Memoize()
  public get targetClassPrefLabels(): Record<string, string> | null {
    const targetClass: rdf.NamedNode | null = this.graph.store.any(this.node, shTargetClass, null) as rdf.NamedNode
    if (targetClass == null) return null
    const classInOntology = new RDFResourceWithLabel(targetClass, this.graph)
    return classInOntology.prefLabels
  }

  @Memoize()
  public get properties(): Array<PropertyShape> {
    const res: Array<PropertyShape> = []
    // get all ?shape sh:property/sh:group ?group
    let props: Array<rdf.NamedNode> = this.graph.store.each(this.node, shProperty, null) as Array<rdf.NamedNode>
    props = sortByPropValue(props, shOrder, this.graph.store)
    for (const prop of props) {
      res.push(new PropertyShape(prop, this.graph))
    }
    return res
  }

  @Memoize()
  public get independentIdentifiers(): boolean {
    return this.getPropBooleanValue(rdeIndependentIdentifiers, false)
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
      res.push(new PropertyGroup(group, this.graph))
    }
    return res
  }
}

// default implementation, can be overridden through config
const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8) // eslint-disable-line no-magic-numbers

export const generateSubnode = async (subshape: NodeShape, parent: RDFResource): Promise<Subject> => {
  const prefix = subshape.getPropStringValue(rdeIdentifierPrefix)
  if (prefix == null) throw "cannot find entity prefix for " + subshape.qname
  let namespace = subshape.getPropStringValue(shNamespace)
  if (namespace == null) namespace = parent.namespace
  let uri = namespace + prefix + parent.lname + nanoidCustom()
  while (parent.graph.hasSubject(uri)) {
    uri = namespace + prefix + nanoidCustom()
  }
  const res = new Subject(new rdf.NamedNode(uri), parent.graph)
  return Promise.resolve(res)
}
