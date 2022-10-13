import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId, EntityGraph } from "../src/helpers/rdf/types"
import { fetchTtl, IFetchState } from "../src/helpers/rdf/io"
import * as shapes from "../src/helpers/rdf/shapes"
import * as ns from "../src/helpers/rdf/ns"
import { Entity } from "../src/containers/EntitySelectorContainer"
import {
  NodeShape,
  generateSubnode,
  rdfsLabel,
  shName,
  prefLabel,
  shDescription,
  skosDefinition,
  rdfsComment,
} from "../src/helpers/rdf/shapes"
import RDEConfig from "../src/helpers/rde_config"
import { LocalEntityInfo } from "../src/helpers/rde_config"
import { Lang, ValueByLangToStrPrefLang } from "../src/helpers/lang"
import { FC, useState, useEffect } from "react"
import { nanoid, customAlphabet } from "nanoid"

const langs = [
  {
    value: "en",
  },
  {
    value: "fr",
    keyboard: ["à", "ç", "é", "è", "ê", "î", "ô", "ù", "û"],
  },
]

const generateConnectedID = async (old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape) => {
  // just for the demo:
  return Promise.resolve(rdf.sym(old_resource.uri + "_CONNECTED"))
}

const demoShape = rdf.sym("http://purl.bdrc.io/ontology/shapes/core/PersonUIShapes")

const BDR_uri = "http://purl.bdrc.io/resource/"

const prefixMap = new ns.PrefixMap({
  rdfs: ns.RDFS_uri,
  rdf: ns.RDF_uri,
  skos: ns.SKOS_uri,
  bdr: BDR_uri,
  "": "http://purl.bdrc.io/ontology/core/",
  adm: "http://purl.bdrc.io/ontology/admin/",
  bda: "http://purl.bdrc.io/admindata/",
})

const getShapesDocument = async (entity: rdf.NamedNode) => {
  // we always load the example shape in the demo
  const loadRes = fetchTtl("/examples/PersonUIShapes.ttl")
  const { store, etag } = await loadRes
  const shape = new NodeShape(demoShape, new EntityGraph(store, demoShape.uri, prefixMap))
  return Promise.resolve(shape)
}

const getDocumentGraph = async (entity: rdf.NamedNode) => {
  if (entity == rdf.sym("http://purl.bdrc.io/resource/P1583")) {
    const loadRes = fetchTtl("/examples/P1583.ttl")
    const { store, etag } = await loadRes
    return Promise.resolve(store)
  }
  return Promise.resolve(new rdf.Store())
}

const getConnexGraph = async (entity: rdf.NamedNode) => {
  if (entity == rdf.sym("http://purl.bdrc.io/resource/P1583")) {
    const loadRes = fetchTtl("/examples/P1583-connexGraph.ttl")
    const { store, etag } = await loadRes
    return Promise.resolve(store)
  }
  return Promise.resolve(new rdf.Store())
}

const getDocument = async (entity: rdf.NamedNode) => {
  const documentGraph: rdf.Store = await getDocumentGraph(entity)
  const connexGraph: rdf.Store = await getConnexGraph(entity)
  const res = new Subject(entity, new EntityGraph(documentGraph, entity.uri, prefixMap, connexGraph))
  return Promise.resolve({subject: res, etag: ""})
}

const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8) // eslint-disable-line no-magic-numbers

const generateNode = async () => {
  return Promise.resolve(rdf.sym(BDR_uri + "P0DEMO" + nanoidCustom()))
}

export function EntityCreator(shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null, unmounting = { val: false }) {
  const [entityLoadingState, setEntityLoadingState] = useState<IFetchState>({ status: "idle", error: undefined })
  const [entity, setEntity] = useState<Subject|null>(null)
  const [shape, setShape] = useState<NodeShape|null>(null)

  useEffect(() => {
    return () => {
      unmounting.val = true
    }
  }, [])

  const reset = () => {
    setEntity(null)
    setShape(null)
    setEntityLoadingState({ status: "idle", error: undefined })
  }

  useEffect(() => {
    async function createResource(shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null) {
      if (!unmounting.val) setEntityLoadingState({ status: "fetching shape", error: undefined })
      const loadShape = getShapesDocument(shapeNode)

      let shape: NodeShape
      try {
        shape = await loadShape
        if (!unmounting.val) setShape(shape)
      } catch (e) {
        if (!unmounting.val) setEntityLoadingState({ status: "error", error: "error fetching shape" })
        return
      }
      if (!unmounting.val) setEntityLoadingState({ status: "creating", error: undefined })
      if (!entityNode) entityNode = await generateNode()
      const graph = new EntityGraph(rdf.graph(), entityNode.uri)
      const newSubject = new Subject(entityNode, graph)
      if (!unmounting.val) setEntity(newSubject)
      if (!unmounting.val) setEntityLoadingState({ status: "created", error: undefined })
    }
    createResource(shapeNode, entityNode)
  }, [shapeNode, entityNode])

  return { entityLoadingState, entity, reset }
}

export const iconFromEntity = (entity: Entity | null): string => {
  if (!entity) return ""
  let icon
  if (entity.subject) {
    const rdfType = ns.RDF("type") as rdf.NamedNode
    if (entity?.subject?.graph?.store?.statements)
      for (const s of entity.subject.graph.store.statements) {
        if (s.predicate.value === rdfType.value && s.subject.value === entity.subject.node.value) {
          icon = s.object.value.replace(/.*?[/]([^/]+)$/, "$1") // .toLowerCase()
          if (icon.toLowerCase() === "user") break
        }
      }
  }
  let shapeQname = entity.shapeQname
  if (!icon && shapeQname) {
    // TODO: might be something better than that...
    icon = shapeQname.replace(/^[^:]+:([^:]+?)Shape[^/]*$/, "$1")
  }
  return icon as string
}

export const getUserMenuState = async (): Promise<Entity[]>  => {
  const datastr = localStorage.getItem("rde_menu_state")
  return datastr ? await JSON.parse(datastr) : {}
}

export const setUserMenuState = async (
  subjectQname: string,
  shapeQname: string | null,
  labels: string | undefined,
  del: boolean,
  etag: string | null
): Promise<void> => {
  const datastr = localStorage.getItem("rde_menu_state")
  const data = datastr ? await JSON.parse(datastr) : {}
  if (!del) data[subjectQname] = { shapeQname, labels, etag }
  else if (data[subjectQname]) delete data[subjectQname]
  const dataNewStr = JSON.stringify(data)
  localStorage.setItem("rde_menu_state", dataNewStr)
}

export const getUserLocalEntities = async (): Promise<Record<string, LocalEntityInfo>> => {
  const datastr = localStorage.getItem("rde_entities")
  return datastr ? await JSON.parse(datastr) : {}
}

export const setUserLocalEntity = async (
  subjectQname: string,
  shapeQname: string | null,
  ttl: string | null,
  del: boolean,
  userId: string,
  etag: string | null,
  needsSaving: boolean
): Promise<void> => {
  const datastr = localStorage.getItem("rde_entities")
  const data = datastr ? await JSON.parse(datastr) : {}
  if (!del) data[subjectQname] = { shapeQname, ttl, etag, needsSaving }
  else if (data[subjectQname]) delete data[subjectQname]
  const dataNewStr = JSON.stringify(data)
  localStorage.setItem("rde_entities", dataNewStr)
}

export const demoConfig: RDEConfig = {
  generateSubnode: generateSubnode,
  valueByLangToStrPrefLang: ValueByLangToStrPrefLang,
  possibleLiteralLangs: langs,
  labelProperties: shapes.defaultLabelProperties,
  descriptionProperties: shapes.defaultDescriptionProperties,
  prefixMap: prefixMap,
  getConnexGraph: getConnexGraph,
  generateConnectedID: generateConnectedID,
  getShapesDocument: getShapesDocument,
  getDocument: getDocument,
  previewLiteral: (literal: LiteralWithId) => null,
  entityCreator: EntityCreator,
  iconFromEntity: iconFromEntity,
  getUserMenuState: getUserMenuState,
  setUserMenuState: setUserMenuState,
  getUserLocalEntities: getUserLocalEntities,
  setUserLocalEntity: setUserLocalEntity
}
