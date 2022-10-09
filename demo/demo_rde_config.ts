import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId, EntityGraph } from "../src/helpers/rdf/types"
import { loadTtl } from "../src/helpers/rdf/io"
import * as shapes from "../src/helpers/rdf/shapes"
import * as ns from "../src/helpers/rdf/ns"
import { NodeShape, generateSubnode, rdfsLabel, shName, prefLabel, shDescription, skosDefinition, rdfsComment } from "../src/helpers/rdf/shapes"
import * as config from "../src/helpers/rde_config"
import { Lang, ValueByLangToStrPrefLang } from "../src/helpers/lang"
import { FC, useState } from "react"

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

const prefixMap = new ns.PrefixMap({
    rdfs: ns.RDFS_uri,
    rdf: ns.RDF_uri,
    skos: ns.SKOS_uri,
    bdr: "http://purl.bdrc.io/resource/",
    "": "http://purl.bdrc.io/ontology/core/",
    adm: "http://purl.bdrc.io/ontology/admin/",
    bda: "http://purl.bdrc.io/admindata/"
  })

const getShapesDocument = async (entity: rdf.NamedNode) => {
  // we always load the example shape in the demo
  const loadRes = loadTtl("/examples/PersonUIShapes.ttl")
  const { store, etag } = await loadRes
  const shape: NodeShape = new NodeShape(demoShape, new EntityGraph(store, demoShape.uri, prefixMap))
  return Promise.resolve(shape)
}

interface IFetchState {
  status: string
  error?: string
}



export const demoConfig: config.RDEConfig = {
  generateSubnode: generateSubnode,
  valueByLangToStrPrefLang: ValueByLangToStrPrefLang,
  possibleLiteralLangs: langs,
  labelProperties: shapes.defaultLabelProperties,
  descriptionProperties: shapes.defaultDescriptionProperties,
  prefixMap: prefixMap,
  generateConnectedID: generateConnectedID,
  getShapesDocument: getShapesDocument

  }
}
