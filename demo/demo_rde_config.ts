import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId, EntityGraph } from "../src/helpers/rdf/types"
import { fetchTtl } from "../src/helpers/rdf/io"
import * as shapes from "../src/helpers/rdf/shapes"
import * as ns from "../src/helpers/rdf/ns"
import { NodeShape, generateSubnode, rdfsLabel, shName, prefLabel, shDescription, skosDefinition, rdfsComment } from "../src/helpers/rdf/shapes"
import * as config from "../src/helpers/rde_config"
import { Lang, ValueByLangToStrPrefLang } from "../src/helpers/lang"
import { FC, useState, useEffect } from "react"
import { nanoid, customAlphabet } from "nanoid"

const langs = [
  {
    "value": "en"
  },
  {
    "value": "fr",
    "keyboard": ["à", "ç", "é", "è", "ê", "î", "ô", "ù", "û"]
  }
]

const generateConnectedID = async (old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape) => {
  // just for the demo:
  return Promise.resolve(rdf.sym(old_resource.uri+"_CONNECTED"))
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
    bda: "http://purl.bdrc.io/admindata/"
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
  return Promise.resolve(res)
}

const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8)

const generateNode = async() => {
  return Promise.resolve(rdf.sym(BDR_uri + "P0DEMO" + nanoidCustom()))
}

interface IFetchState {
  status: string
  error?: string
}

export function EntityCreator(shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null, unmounting = { val: false }) {
  const [entityLoadingState, setEntityLoadingState] = useState<IFetchState>({ status: "idle", error: undefined })
  const [entity, setEntity] = useState<Subject>()
  const [shape, setShape] = useState<NodeShape>()

  useEffect(() => {
    return () => {
      unmounting.val = true
    }
  }, [])

  const reset = () => {
    setEntity(undefined)
    setShape(undefined)
    setEntityLoadingState({ status: "idle", error: undefined })
  }

  useEffect(() => {
    async function createResource(shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null) {
      if (!unmounting.val)
        setEntityLoadingState({ status: "fetching shape", error: undefined })
      const loadShape = getShapesDocument(shapeNode)

      let shape: NodeShape
      try {
        shape = await loadShape
        if (!unmounting.val)
          setShape(shape)
      } catch (e) {
        if (!unmounting.val)
          setEntityLoadingState({ status: "error", error: "error fetching shape" })
        return
      }
      if (!unmounting.val)
        setEntityLoadingState({ status: "creating", error: undefined })
      if (!entityNode)
        entityNode = await generateNode()
      const graph = new EntityGraph(rdf.graph(), entityNode.uri)
      const newSubject = new Subject(entityNode, graph)
      if (!unmounting.val) setEntity(newSubject)
      if (!unmounting.val) setEntityLoadingState({ status: "created", error: undefined })
    }
    createResource(shapeNode, entityNode)
  }, [shapeNode, entityNode])

  return { entityLoadingState, entity, reset }
}

export const demoConfig: config.RDEConfig = {
  generateSubnode: generateSubnode,
  valueByLangToStrPrefLang: ValueByLangToStrPrefLang,
  possibleLiteralLangs: langs,
  labelProperties: shapes.defaultLabelProperties,
  descriptionProperties: shapes.defaultDescriptionProperties,
  prefixMap: prefixMap,
  generateConnectedID: generateConnectedID,
  getShapesDocument: getShapesDocument,
  getDocument: getDocument,
  previewLiteral: (literal) => null,
  entityCreator: EntityCreator
}
}
