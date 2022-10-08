import * as rdf from "rdflib"

export const DASH_uri = "http://datashapes.org/dash#"
export const DASH = rdf.Namespace(DASH_uri)
export const OWL_uri = "http://www.w3.org/2002/07/owl#"
export const OWL = rdf.Namespace(OWL_uri)
export const RDFS_uri = "http://www.w3.org/2000/01/rdf-schema#"
export const RDFS = rdf.Namespace(RDFS_uri)
export const SH_uri = "http://www.w3.org/ns/shacl#"
export const SH = rdf.Namespace(SH_uri)
export const RDF_uri = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
export const RDF = rdf.Namespace(RDF_uri)
export const SKOS_uri = "http://www.w3.org/2004/02/skos/core#"
export const SKOS = rdf.Namespace(SKOS_uri)
export const XSD_uri = "http://www.w3.org/2001/XMLSchema#"
export const XSD = rdf.Namespace(XSD_uri)
export const FOAF_uri = "http://xmlns.com/foaf/0.1/"
export const FOAF = rdf.Namespace(FOAF_uri)
export const RDE_uri = "https://github.com/buda-base/rdf-document-editor/"
export const RDE = rdf.Namespace(RDE_uri)

const debug = require("debug")("rde:rdf:ns")

export const prefixToURI: { [key: string]: string } = {
  dash: DASH_uri,
  owl: OWL_uri,
  rdfs: RDFS_uri,
  sh: SH_uri,
  rdf: RDF_uri,
  skos: SKOS_uri,
  xsd: XSD_uri,
  foaf: FOAF_uri,
}

export const URItoPrefix: { [key: string]: string } = {}
for (const [prefix, uri] of Object.entries(prefixToURI)) {
  URItoPrefix[uri] = prefix
}

export const setDefaultPrefixes = (s: rdf.Store): void => {
  for (const [prefix, uri] of Object.entries(prefixToURI)) {
    s.setPrefixForURI(prefix, uri)
  }
}

export const qnameFromUri = (uri = ""): string => {
  if (uri.match(/^[^:/#]+:[^:/#]+$/)) return uri

  let j = uri.indexOf("#")
  if (j < 0) j = uri.lastIndexOf("/")
  if (j < 0) throw new Error("Cannot make qname out of <" + uri + ">")

  const localid = uri.slice(j + 1)
  const namesp = uri.slice(0, j + 1)
  const prefix = URItoPrefix[namesp]
  if (!prefix) throw new Error("Cannot make qname out of <" + uri + ">")

  return prefix + ":" + localid
}

export const lnameFromUri = (uri: string): string => {
  let j = uri.indexOf("#")
  if (j < 0) j = uri.lastIndexOf("/")
  if (j < 0) throw new Error("Cannot make qname out of <" + uri + ">")

  return uri.slice(j + 1)
}

export const namespaceFromUri = (uri: string): string => {
  let j = uri.indexOf("#")
  if (j < 0) j = uri.lastIndexOf("/")
  if (j < 0) throw new Error("Cannot make namespace out of <" + uri + ">")

  return uri.slice(0, j + 1)
}

export const uriFromQname = (qname = ""): string => {
  const j = qname.indexOf(":")

  if (j < 0) throw new Error("Cannot make uri out of <" + qname + ">")

  const localid = qname.slice(j + 1)
  const prefix = qname.slice(0, j)
  const uri_base = prefixToURI[prefix]

  if (!uri_base) throw new Error("Cannot make uri out of <" + qname + ">")

  return uri_base + localid
}

export const lnameFromQname = (qname = ""): string => {
  const j = qname.indexOf(":")

  if (j < 0) throw new Error("Cannot make lname out of <" + qname + ">")

  return qname.slice(j + 1)
}
