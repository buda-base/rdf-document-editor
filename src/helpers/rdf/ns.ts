import * as rdf from "rdflib"
import { debug as debugfactory } from "debug"

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

const debug = debugfactory("rde:rdf:ns")

const defaultPrefixToURI: { [key: string]: string } = {
  dash: DASH_uri,
  owl: OWL_uri,
  rde: RDE_uri,
  rdfs: RDFS_uri,
  sh: SH_uri,
  rdf: RDF_uri,
  skos: SKOS_uri,
  xsd: XSD_uri,
  foaf: FOAF_uri,
}

export class PrefixMap {
  prefixToURI: { [key: string]: string }
  URItoPrefix: { [key: string]: string }

  constructor(prefixToURI: { [key: string]: string }) {
    this.prefixToURI = { ...defaultPrefixToURI, ...prefixToURI }
    this.URItoPrefix = {}
    for (const [prefix, uri] of Object.entries(this.prefixToURI)) {
      this.URItoPrefix[uri] = prefix
    }
  }

  setDefaultPrefixes = (s: rdf.Store): void => {
    for (const [prefix, uri] of Object.entries(this.prefixToURI)) {
      s.setPrefixForURI(prefix, uri)
    }
  }

  qnameFromUri = (uri = ""): string => {
    if (uri.match(/^[^:/#]+:[^:/#]+$/)) return uri
    
    let j = uri.indexOf("#")
    if (j < 0) j = uri.lastIndexOf("/")
    if (j < 0) {
      debug("Cannot make qname out of <" + uri + ">")
      return uri
    }
    const localid = uri.slice(j + 1)
    const namesp = uri.slice(0, j + 1)
    const prefix = this.URItoPrefix[namesp]
    if (!prefix) {
      debug("Cannot make qname out of <" + uri + "> (can't find appropriate prefix)")
      return uri
    }

    return prefix + ":" + localid
  }

  lnameFromUri = (uri: string): string => {
    let j = uri.indexOf("#")
    if (j < 0) j = uri.lastIndexOf("/")
    if (j < 0) throw new Error("Cannot make lname out of <" + uri + ">")

    return uri.slice(j + 1)
  }

  namespaceFromUri = (uri: string): string => {
    let j = uri.indexOf("#")
    if (j < 0) j = uri.lastIndexOf("/")
    if (j < 0) throw new Error("Cannot get namespace from <" + uri + ">")

    return uri.slice(0, j + 1)
  }

  uriFromQname = (qname = ""): string => {
    const j = qname.indexOf(":")

    if (j < 0) throw new Error("Cannot make uri out of <" + qname + ">")

    const localid = qname.slice(j + 1)
    const prefix = qname.slice(0, j)
    const uri_base = this.prefixToURI[prefix]

    if (!uri_base) throw new Error("Cannot make uri out of <" + qname + ">")

    return uri_base + localid
  }

  lnameFromQname = (qname = ""): string => {
    const j = qname.indexOf(":")

    if (j < 0) throw new Error("Cannot make lname out of <" + qname + ">")

    return qname.slice(j + 1)
  }
}

export const rdfType = RDF("type") as rdf.NamedNode
export const shProperty = SH("property")
export const shGroup = SH("group")
export const shOrder = SH("order") as rdf.NamedNode
export const rdfsLabel = RDFS("label") as rdf.NamedNode
export const prefLabel = SKOS("prefLabel") as rdf.NamedNode
export const shName = SH("name") as rdf.NamedNode
export const shPath = SH("path") as rdf.NamedNode
export const dashEditor = DASH("editor") as rdf.NamedNode
export const shNode = SH("node") as rdf.NamedNode
export const dashListShape = DASH("ListShape") as rdf.NamedNode
export const dashEnumSelectEditor = DASH("EnumSelectEditor") as rdf.NamedNode
export const shMessage = SH("message") as rdf.NamedNode
export const rdeDisplayPriority = RDE("displayPriority") as rdf.NamedNode
export const shMinCount = SH("minCount") as rdf.NamedNode
export const shMinInclusive = SH("minInclusive") as rdf.NamedNode
export const shMinExclusive = SH("minExclusive") as rdf.NamedNode
export const shClass = SH("class") as rdf.NamedNode
export const shMaxCount = SH("maxCount") as rdf.NamedNode
export const shMaxInclusive = SH("maxInclusive") as rdf.NamedNode
export const shMaxExclusive = SH("maxExclusive") as rdf.NamedNode
export const shDatatype = SH("datatype") as rdf.NamedNode
export const dashSingleLine = DASH("singleLine") as rdf.NamedNode
export const shTargetClass = SH("targetClass") as rdf.NamedNode
export const shTargetObjectsOf = SH("targetObjectsOf") as rdf.NamedNode
export const shTargetSubjectsOf = SH("targetSubjectsOf") as rdf.NamedNode
export const rdePropertyShapeType = RDE("propertyShapeType") as rdf.NamedNode
export const rdeInternalShape = RDE("InternalShape") as rdf.NamedNode
export const rdeExternalShape = RDE("ExternalShape") as rdf.NamedNode
export const rdeIgnoreShape = RDE("IgnoreShape") as rdf.NamedNode
export const rdeClassIn = RDE("classIn") as rdf.NamedNode
export const shIn = SH("in") as rdf.NamedNode
export const shInversePath = SH("inversePath") as rdf.NamedNode
export const shUniqueLang = SH("uniqueLang") as rdf.NamedNode
export const rdeReadOnly = RDE("readOnly") as rdf.NamedNode
export const rdeIdentifierPrefix = RDE("identifierPrefix") as rdf.NamedNode
export const rdeAllowMarkDown = RDE("allowMarkDown") as rdf.NamedNode
export const shNamespace = SH("namespace") as rdf.NamedNode
export const rdeDefaultLanguage = RDE("defaultLanguage") as rdf.NamedNode
export const rdeDefaultValue = RDE("defaultValue") as rdf.NamedNode
export const shLanguageIn = SH("languageIn") as rdf.NamedNode
export const shPattern = SH("pattern") as rdf.NamedNode
export const rdeSortOnProperty = RDE("sortOnProperty") as rdf.NamedNode
export const rdeAllowPushToTopLevelLabel = RDE("allowPushToTopLevelLabel") as rdf.NamedNode
export const rdeIndependentIdentifiers = RDE("independentIdentifiers") as rdf.NamedNode
export const rdeSpecialPattern = RDE("specialPattern") as rdf.NamedNode
export const rdeConnectIDs = RDE("connectIDs") as rdf.NamedNode
export const rdeAllowBatchManagement = RDE("allowBatchManagement") as rdf.NamedNode
export const rdeCopyObjectsOfProperty = RDE("copyObjectsOfProperty") as rdf.NamedNode
export const rdeUniqueValueAmongSiblings = RDE("uniqueValueAmongSiblings") as rdf.NamedNode
export const rdfLangString = RDF("langString") as rdf.NamedNode
export const skosDefinition = SKOS("definition") as rdf.NamedNode
export const rdfsComment = RDFS("comment") as rdf.NamedNode
export const shDescription = SH("description") as rdf.NamedNode

export const defaultLabelProperties = [prefLabel, rdfsLabel, shName]
export const defaultDescriptionProperties = [skosDefinition, rdfsComment, shDescription]

export const defaultPrefixMap = new PrefixMap({})
