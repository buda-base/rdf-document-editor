import * as rdf from "rdflib"

export const BDR_uri = "http://purl.bdrc.io/resource/"
export const BDR = rdf.Namespace(BDR_uri)
export const BDS_uri = "http://purl.bdrc.io/ontology/shapes/core/"
export const BDS = rdf.Namespace(BDS_uri)
export const BDSA_uri = "http://purl.bdrc.io/ontology/shapes/adm/"
export const BDSA = rdf.Namespace(BDSA_uri)
export const BDSH_uri = "http://purl.bdrc.io/shapes/core/"
export const BDSH = rdf.Namespace(BDSH_uri)
export const BDO_uri = "http://purl.bdrc.io/ontology/core/"
export const BDO = rdf.Namespace(BDO_uri)
export const ADM_uri = "http://purl.bdrc.io/ontology/admin/"
export const ADM = rdf.Namespace(ADM_uri)
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
export const BDG_uri = "http://purl.bdrc.io/graph/"
export const BDG = rdf.Namespace(BDG_uri)
export const BDA_uri = "http://purl.bdrc.io/admindata/"
export const BDA = rdf.Namespace(BDA_uri)
export const TMP_uri = "http://purl.bdrc.io/ontology/tmp/"
export const TMP = rdf.Namespace(TMP_uri)
export const BDOU_uri = "http://purl.bdrc.io/ontology/ext/user/"
export const BDOU = rdf.Namespace(BDOU_uri)
export const BDU_uri = "http://purl.bdrc.io/resource-nc/user/"
export const BDU = rdf.Namespace(BDU_uri)
export const FOAF_uri = "http://xmlns.com/foaf/0.1/"
export const FOAF = rdf.Namespace(FOAF_uri)

const debug = require("debug")("rde:rdf:ns")

export const prefixToURI: { [key: string]: string } = {
  bdr: BDR_uri,
  bdo: BDO_uri,
  bds: BDS_uri,
  bdsh: BDSH_uri,
  adm: ADM_uri,
  dash: DASH_uri,
  owl: OWL_uri,
  rdfs: RDFS_uri,
  sh: SH_uri,
  rdf: RDF_uri,
  skos: SKOS_uri,
  xsd: XSD_uri,
  bdg: BDG_uri,
  bda: BDA_uri,
  bdsa: BDSA_uri,
  tmp: TMP_uri,
  bdou: BDOU_uri,
  bdu: BDU_uri,
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
  s.setPrefixForURI("", BDO_uri)
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

const entity_prefix_3 = ["WAS", "ITW", "PRA"]
const entity_prefix_2 = ["WA", "MW", "PR", "IE", "UT", "IT"]

export const removeEntityPrefix = (lname: string): string => {
  const len2 = 2,
    len3 = 3
  if (lname.length > len3 && entity_prefix_3.includes(lname.substring(0, len3))) return lname.substring(len3)
  if (lname.length > len2 && entity_prefix_2.includes(lname.substring(0, len2))) return lname.substring(len2)
  return lname.substring(1)
}
