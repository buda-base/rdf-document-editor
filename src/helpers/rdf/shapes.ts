import * as rdf from "rdflib"
import {
  RDFResource,
  RDFResourceWithLabel,
  EntityGraph,
  Subject,
  rdfLitAsNumber,
  LiteralWithId,
  ObjectType,
  Path,
} from "./types"
import * as ns from "./ns"
import {
  dashSingleLine,
  rdeConnectIDs,
  rdeDefaultValue,
  rdeDisplayPriority,
  rdfsLabel,
  shMessage,
  shMinCount,
} from "./ns"
import { Memoize } from "typescript-memoize"
import { customAlphabet } from "nanoid"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:rdf:shapes")

export const sortByPropValue = (
  nodelist: Array<rdf.NamedNode>,
  property: rdf.NamedNode,
  store: rdf.Store
): Array<rdf.NamedNode> => {
  const nodeUriToPropValue: Record<string, number> = {}
  for (const node of nodelist) {
    const ordern: rdf.Literal | null = store.any(node, property, null) as rdf.Literal
    if (!ordern) {
      nodeUriToPropValue[node.uri] = 0
      continue
    }
    const asnum = rdfLitAsNumber(ordern)
    nodeUriToPropValue[node.uri] = asnum == null ? 0 : asnum
  }
  // TODO: untested
  const res = [...nodelist].sort((a: rdf.NamedNode, b: rdf.NamedNode) => {
    return nodeUriToPropValue[a.uri] - nodeUriToPropValue[b.uri]
  })
  return res
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
    const resFromShape = this.getPropValueByLang(ns.shName)
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
    return this.getPropIntValue(ns.shMaxCount)
  }

  @Memoize()
  public get minInclusive(): number | null {
    return this.getPropIntValue(ns.shMinInclusive)
  }

  @Memoize()
  public get maxInclusive(): number | null {
    return this.getPropIntValue(ns.shMaxInclusive)
  }

  @Memoize()
  public get minExclusive(): number | null {
    return this.getPropIntValue(ns.shMinExclusive)
  }

  @Memoize()
  public get maxExclusive(): number | null {
    return this.getPropIntValue(ns.shMaxExclusive)
  }

  @Memoize()
  public get allowMarkDown(): boolean | null {
    return this.getPropBooleanValue(ns.rdeAllowMarkDown)
  }

  @Memoize()
  public get allowBatchManagement(): boolean | null {
    return this.getPropBooleanValue(ns.rdeAllowBatchManagement)
  }

  @Memoize()
  public get uniqueValueAmongSiblings(): boolean | null {
    return this.getPropBooleanValue(ns.rdeUniqueValueAmongSiblings)
  }

  @Memoize()
  public get uniqueLang(): boolean | null {
    return this.getPropBooleanValue(ns.shUniqueLang)
  }

  @Memoize()
  public get readOnly(): boolean {
    return this.getPropBooleanValue(ns.rdeReadOnly)
  }

  @Memoize()
  public get defaultLanguage(): string | null {
    return this.getPropStringValue(ns.rdeDefaultLanguage)
  }

  @Memoize()
  public get editorLname(): string | null {
    const val = this.getPropResValue(ns.dashEditor)
    if (!val) return null
    return ns.defaultPrefixMap.lnameFromUri(val.value)
  }

  @Memoize()
  public get group(): rdf.NamedNode | null {
    return this.getPropResValue(ns.shGroup as rdf.NamedNode)
  }

  @Memoize()
  public get copyObjectsOfProperty(): Array<rdf.NamedNode> | null {
    return this.graph.store.each(this.node, ns.rdeCopyObjectsOfProperty, null) as Array<rdf.NamedNode>
  }

  @Memoize()
  public get datatype(): rdf.NamedNode | null {
    const res = this.getPropResValue(ns.shDatatype)
    if (res === null && this.hasListAsObject) {
      const propNodes: Array<rdf.NamedNode | rdf.BlankNode> = this.graph.store.each(
        this.node,
        ns.shProperty,
        null
      ) as Array<rdf.NamedNode | rdf.BlankNode>
      if (!propNodes) return null
      const props: Array<RDFResource> = PropertyShape.resourcizeWithInit(propNodes, this.graph)
      for (const p of props) {
        return p.getPropResValue(ns.shDatatype)
      }
    }
    return res
  }

  @Memoize()
  public get pattern(): string | null {
    return this.getPropStringValue(ns.shPattern)
  }

  @Memoize()
  public get sortOnProperty(): rdf.NamedNode | null {
    return this.getPropResValue(ns.rdeSortOnProperty)
  }

  @Memoize()
  public get allowPushToTopLevelLabel(): boolean {
    return this.getPropBooleanValue(ns.rdeAllowPushToTopLevelLabel)
  }

  @Memoize()
  public get specialPattern(): rdf.NamedNode | null {
    return this.getPropResValue(ns.rdeSpecialPattern)
  }

  public static resourcizeWithInit(
    nodes: Array<rdf.NamedNode | rdf.BlankNode>,
    graph: EntityGraph
  ): Array<RDFResourceWithLabel> {
    const res: Array<RDFResourceWithLabel> = []
    for (const node of nodes)
      if (node instanceof rdf.NamedNode) {
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
    const res = this.graph.store.each(this.node, ns.shNode, ns.dashListShape)
    if (res == null || res.length == 0) return false
    return true
  }

  @Memoize()
  public get in(): Array<RDFResourceWithLabel | LiteralWithId> | null {
    //debug("in:",this.id,this.hasListAsObject,this.datatype)
    if (this.hasListAsObject) {
      // if no direct in, let's look at the sh:property objects (quite counter intuitive, but it follows the shacl examples)
      const propNodes: Array<rdf.NamedNode | rdf.BlankNode> = this.graph.store.each(
        this.node,
        ns.shProperty,
        null
      ) as Array<rdf.NamedNode | rdf.BlankNode>
      if (!propNodes) return null
      const props: Array<RDFResource> = PropertyShape.resourcizeWithInit(propNodes, this.graph)
      for (const p of props) {
        if (p.getPropResValue(ns.shDatatype)) {
          const nodes = p.getPropLitValuesFromList(ns.shIn)
          if (nodes) return EntityGraph.addIdToLitList(nodes)
        } else {
          const nodes = p.getPropResValuesFromList(ns.shIn)
          if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.graph)
        }
      }
    }
    if (this.datatype) {
      const nodes = this.getPropLitValuesFromList(ns.shIn)
      if (nodes) return EntityGraph.addIdToLitList(nodes)
    } else {
      // if no datatype, then it's res
      const nodes = this.getPropResValuesFromList(ns.shIn)
      //debug("nodes:",nodes)
      if (nodes) return PropertyShape.resourcizeWithInit(nodes, this.graph)
    }
    return null
  }

  @Memoize()
  public get expectedObjectTypes(): Array<RDFResourceWithLabel> | null {
    let nodes = this.getPropResValuesFromList(ns.rdeClassIn)
    if (!nodes) {
      const cl = this.getPropResValues(ns.shClass)
      if (cl.length) nodes = cl
    }
    if (!nodes) return null
    return PropertyShape.resourcizeWithInit(nodes, this.graph)
  }

  @Memoize()
  public get path(): Path | null {
    const pathNode = this.getPropResValue(ns.shPath)
    if (!pathNode) return null
    return new Path(pathNode, this.graph, this.hasListAsObject)
  }

  @Memoize()
  public get objectType(): ObjectType {
    const propertyShapeType = this.getPropResValue(ns.rdePropertyShapeType)
    if (!propertyShapeType) {
      const editor = this.getPropResValue(ns.dashEditor)
      if (!editor) return ObjectType.Literal
      if (editor.value == ns.dashEnumSelectEditor.value) {
        if (this.datatype) return ObjectType.LitInList
        return ObjectType.ResInList
      }
      return ObjectType.Literal
    }
    // for some reason direct comparison doesn't work...
    if (propertyShapeType.value == ns.rdeInternalShape.value) return ObjectType.Internal
    else if (propertyShapeType.value == ns.rdeExternalShape.value) return ObjectType.ResExt
    else if (propertyShapeType.value == ns.rdeIgnoreShape.value) return ObjectType.ResIgnore
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
      val = this.graph.store.any(null, ns.shTargetObjectsOf, path.directPathNode) as rdf.NamedNode | null
      if (val == null) return null
      return new NodeShape(val, this.graph)
    }
    if (path.inversePathNode) {
      val = this.graph.store.any(null, ns.shTargetSubjectsOf, path.inversePathNode) as rdf.NamedNode | null
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
    let propsingroup: Array<rdf.NamedNode> = this.graph.store.each(null, ns.shGroup, this.node) as Array<rdf.NamedNode>
    propsingroup = sortByPropValue(propsingroup, ns.shOrder, this.graph.store)
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
    const targetClass: rdf.NamedNode | null = this.graph.store.any(this.node, ns.shTargetClass, null) as rdf.NamedNode
    if (targetClass == null) return null
    const classInOntology = new RDFResourceWithLabel(targetClass, this.graph)
    return classInOntology.prefLabels
  }

  @Memoize()
  public get properties(): Array<PropertyShape> {
    const res: Array<PropertyShape> = []
    // get all ?shape sh:property/sh:group ?group
    let props: Array<rdf.NamedNode> = this.graph.store.each(this.node, ns.shProperty, null) as Array<rdf.NamedNode>
    props = sortByPropValue(props, ns.shOrder, this.graph.store)
    for (const prop of props) {
      res.push(new PropertyShape(prop, this.graph))
    }
    return res
  }

  @Memoize()
  public get independentIdentifiers(): boolean {
    return this.getPropBooleanValue(ns.rdeIndependentIdentifiers, false)
  }

  @Memoize()
  public get groups(): Array<PropertyGroup> {
    const res: Array<PropertyGroup> = []
    // get all ?shape sh:property/sh:group ?group
    const props: Array<rdf.NamedNode> = this.graph.store.each(this.node, ns.shProperty, null) as Array<rdf.NamedNode>
    let grouplist: Array<rdf.NamedNode> = []
    for (const prop of props) {
      // we assume there's only one group per property, by construction of the shape (maybe it's wrong?)
      const group: rdf.NamedNode | null = this.graph.store.any(prop, ns.shGroup, null) as rdf.NamedNode
      // for some reason grouplist.includes(group) doesn't work, I suppose new objects are created by rdflib
      if (group && !grouplist.some((e) => e.value === group.value)) {
        grouplist.push(group)
      }
    }
    grouplist = sortByPropValue(grouplist, ns.shOrder, this.graph.store)
    for (const group of grouplist) {
      res.push(new PropertyGroup(group, this.graph))
    }
    return res
  }
}

// default implementation, can be overridden through config
const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8) // eslint-disable-line no-magic-numbers

export const generateSubnodes = async (subshape: NodeShape | null, parent: RDFResource, n = 1): Promise<Subject[]> => {
  const prefix = subshape ? subshape.getPropStringValue(ns.rdeIdentifierPrefix) : ""
  let namespace = subshape?.getPropStringValue(ns.shNamespace)
  if (!namespace) namespace = parent.namespace
  const res: Subject[] = []
  for (let i = 0 ; i < n ; i++) {
    let uri = namespace + prefix + parent.lname + nanoidCustom()
    while (parent.graph.hasSubject(uri)) {
      uri = namespace + prefix + nanoidCustom()
    }
    res.push(new Subject(new rdf.NamedNode(uri), parent.graph))
  }
  return Promise.resolve(res)
}
