"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BUDAResourceSelector: () => BUDAResourceSelector_default,
  BottomBarContainer: () => BottomBarContainer,
  EntityCreationContainer: () => EntityCreationContainer_default,
  EntityCreationContainerRoute: () => EntityCreationContainerRoute,
  EntityEditContainer: () => EntityEditContainer_default,
  EntityEditContainerMayUpdate: () => EntityEditContainerMayUpdate,
  EntityGraph: () => EntityGraph,
  EntitySelectorContainer: () => EntitySelectorContainer_default,
  EntityShapeChooserContainer: () => EntityShapeChooserContainer_default,
  ExtRDFResourceWithLabel: () => ExtRDFResourceWithLabel,
  HttpError: () => HttpError,
  LangSelect: () => LangSelect,
  LiteralWithId: () => LiteralWithId,
  NewEntityContainer: () => NewEntityContainer_default,
  NodeShape: () => NodeShape,
  RDFResource: () => RDFResource,
  RDFResourceWithLabel: () => RDFResourceWithLabel,
  Subject: () => Subject,
  ValueByLangToStrPrefLang: () => ValueByLangToStrPrefLang,
  atoms: () => common_exports,
  enTranslations: () => en_default,
  fetchTtl: () => fetchTtl,
  generateSubnodes: () => generateSubnodes,
  getHistoryStatus: () => getHistoryStatus,
  history: () => history,
  ns: () => ns_exports,
  rdf: () => rdf10,
  shapes: () => shapes_exports,
  updateHistory: () => updateHistory
});
module.exports = __toCommonJS(src_exports);

// src/helpers/rdf/ns.ts
var ns_exports = {};
__export(ns_exports, {
  DASH: () => DASH,
  DASH_uri: () => DASH_uri,
  FOAF: () => FOAF,
  FOAF_uri: () => FOAF_uri,
  OWL: () => OWL,
  OWL_uri: () => OWL_uri,
  PrefixMap: () => PrefixMap,
  RDE: () => RDE,
  RDE_uri: () => RDE_uri,
  RDF: () => RDF,
  RDFS: () => RDFS,
  RDFS_uri: () => RDFS_uri,
  RDF_uri: () => RDF_uri,
  SH: () => SH,
  SH_uri: () => SH_uri,
  SKOS: () => SKOS,
  SKOS_uri: () => SKOS_uri,
  XSD: () => XSD,
  XSD_uri: () => XSD_uri,
  dashEditor: () => dashEditor,
  dashEnumSelectEditor: () => dashEnumSelectEditor,
  dashListShape: () => dashListShape,
  dashSingleLine: () => dashSingleLine,
  defaultDescriptionProperties: () => defaultDescriptionProperties,
  defaultLabelProperties: () => defaultLabelProperties,
  defaultPrefixMap: () => defaultPrefixMap,
  prefLabel: () => prefLabel,
  rdeAllowBatchManagement: () => rdeAllowBatchManagement,
  rdeAllowMarkDown: () => rdeAllowMarkDown,
  rdeAllowPushToTopLevelLabel: () => rdeAllowPushToTopLevelLabel,
  rdeClassIn: () => rdeClassIn,
  rdeConnectIDs: () => rdeConnectIDs,
  rdeCopyObjectsOfProperty: () => rdeCopyObjectsOfProperty,
  rdeDefaultLanguage: () => rdeDefaultLanguage,
  rdeDefaultValue: () => rdeDefaultValue,
  rdeDisplayPriority: () => rdeDisplayPriority,
  rdeExternalShape: () => rdeExternalShape,
  rdeIdentifierPrefix: () => rdeIdentifierPrefix,
  rdeIgnoreShape: () => rdeIgnoreShape,
  rdeIndependentIdentifiers: () => rdeIndependentIdentifiers,
  rdeInternalShape: () => rdeInternalShape,
  rdePropertyShapeType: () => rdePropertyShapeType,
  rdeReadOnly: () => rdeReadOnly,
  rdeSortOnProperty: () => rdeSortOnProperty,
  rdeSpecialPattern: () => rdeSpecialPattern,
  rdeUniqueValueAmongSiblings: () => rdeUniqueValueAmongSiblings,
  rdfFirst: () => rdfFirst,
  rdfLangString: () => rdfLangString,
  rdfNil: () => rdfNil,
  rdfRest: () => rdfRest,
  rdfType: () => rdfType,
  rdfsComment: () => rdfsComment,
  rdfsLabel: () => rdfsLabel,
  shClass: () => shClass,
  shDatatype: () => shDatatype,
  shDescription: () => shDescription,
  shGroup: () => shGroup,
  shIn: () => shIn,
  shInversePath: () => shInversePath,
  shLanguageIn: () => shLanguageIn,
  shMaxCount: () => shMaxCount,
  shMaxExclusive: () => shMaxExclusive,
  shMaxInclusive: () => shMaxInclusive,
  shMessage: () => shMessage,
  shMinCount: () => shMinCount,
  shMinExclusive: () => shMinExclusive,
  shMinInclusive: () => shMinInclusive,
  shName: () => shName,
  shNamespace: () => shNamespace,
  shNode: () => shNode,
  shOrder: () => shOrder,
  shPath: () => shPath,
  shPattern: () => shPattern,
  shProperty: () => shProperty,
  shTargetClass: () => shTargetClass,
  shTargetObjectsOf: () => shTargetObjectsOf,
  shTargetSubjectsOf: () => shTargetSubjectsOf,
  shUniqueLang: () => shUniqueLang,
  skosDefinition: () => skosDefinition
});
var rdf = __toESM(require("rdflib"));
var import_debug = require("debug");
var DASH_uri = "http://datashapes.org/dash#";
var DASH = rdf.Namespace(DASH_uri);
var OWL_uri = "http://www.w3.org/2002/07/owl#";
var OWL = rdf.Namespace(OWL_uri);
var RDFS_uri = "http://www.w3.org/2000/01/rdf-schema#";
var RDFS = rdf.Namespace(RDFS_uri);
var SH_uri = "http://www.w3.org/ns/shacl#";
var SH = rdf.Namespace(SH_uri);
var RDF_uri = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
var RDF = rdf.Namespace(RDF_uri);
var SKOS_uri = "http://www.w3.org/2004/02/skos/core#";
var SKOS = rdf.Namespace(SKOS_uri);
var XSD_uri = "http://www.w3.org/2001/XMLSchema#";
var XSD = rdf.Namespace(XSD_uri);
var FOAF_uri = "http://xmlns.com/foaf/0.1/";
var FOAF = rdf.Namespace(FOAF_uri);
var RDE_uri = "https://github.com/buda-base/rdf-document-editor/";
var RDE = rdf.Namespace(RDE_uri);
var debug = (0, import_debug.debug)("rde:rdf:ns");
var defaultPrefixToURI = {
  dash: DASH_uri,
  owl: OWL_uri,
  rde: RDE_uri,
  rdfs: RDFS_uri,
  sh: SH_uri,
  rdf: RDF_uri,
  skos: SKOS_uri,
  xsd: XSD_uri,
  foaf: FOAF_uri
};
var PrefixMap = class {
  prefixToURI;
  URItoPrefix;
  constructor(prefixToURI) {
    this.prefixToURI = { ...defaultPrefixToURI, ...prefixToURI };
    this.URItoPrefix = {};
    for (const [prefix, uri] of Object.entries(this.prefixToURI)) {
      this.URItoPrefix[uri] = prefix;
    }
  }
  setDefaultPrefixes = (s) => {
    for (const [prefix, uri] of Object.entries(this.prefixToURI)) {
      s.setPrefixForURI(prefix, uri);
    }
  };
  qnameFromUri = (uri = "") => {
    if (uri.match(/^[^:/#]+:[^:/#]+$/))
      return uri;
    let j = uri.indexOf("#");
    if (j < 0)
      j = uri.lastIndexOf("/");
    if (j < 0) {
      debug("Cannot make qname out of <" + uri + ">");
      return uri;
    }
    const localid = uri.slice(j + 1);
    const namesp = uri.slice(0, j + 1);
    const prefix = this.URItoPrefix[namesp];
    if (!prefix) {
      debug("Cannot make qname out of <" + uri + "> (can't find appropriate prefix)");
      return uri;
    }
    return prefix + ":" + localid;
  };
  lnameFromUri = (uri) => {
    let j = uri.indexOf("#");
    if (j < 0)
      j = uri.lastIndexOf("/");
    if (j < 0)
      throw new Error("Cannot make lname out of <" + uri + ">");
    return uri.slice(j + 1);
  };
  namespaceFromUri = (uri) => {
    let j = uri.indexOf("#");
    if (j < 0)
      j = uri.lastIndexOf("/");
    if (j < 0)
      throw new Error("Cannot get namespace from <" + uri + ">");
    return uri.slice(0, j + 1);
  };
  uriFromQname = (qname = "") => {
    if (!qname)
      return "";
    const j = qname.indexOf(":");
    if (j < 0)
      throw new Error("Cannot make uri out of <" + qname + ">");
    const localid = qname.slice(j + 1);
    const prefix = qname.slice(0, j);
    const uri_base = this.prefixToURI[prefix];
    if (!uri_base)
      throw new Error("Cannot make uri out of <" + qname + ">");
    return uri_base + localid;
  };
  lnameFromQname = (qname = "") => {
    const j = qname.indexOf(":");
    if (j < 0)
      throw new Error("Cannot make lname out of <" + qname + ">");
    return qname.slice(j + 1);
  };
};
var rdfType = RDF("type");
var shProperty = SH("property");
var shGroup = SH("group");
var shOrder = SH("order");
var rdfsLabel = RDFS("label");
var prefLabel = SKOS("prefLabel");
var shName = SH("name");
var shPath = SH("path");
var dashEditor = DASH("editor");
var shNode = SH("node");
var dashListShape = DASH("ListShape");
var dashEnumSelectEditor = DASH("EnumSelectEditor");
var shMessage = SH("message");
var rdeDisplayPriority = RDE("displayPriority");
var shMinCount = SH("minCount");
var shMinInclusive = SH("minInclusive");
var shMinExclusive = SH("minExclusive");
var shClass = SH("class");
var shMaxCount = SH("maxCount");
var shMaxInclusive = SH("maxInclusive");
var shMaxExclusive = SH("maxExclusive");
var shDatatype = SH("datatype");
var dashSingleLine = DASH("singleLine");
var shTargetClass = SH("targetClass");
var shTargetObjectsOf = SH("targetObjectsOf");
var shTargetSubjectsOf = SH("targetSubjectsOf");
var rdePropertyShapeType = RDE("propertyShapeType");
var rdeInternalShape = RDE("InternalShape");
var rdeExternalShape = RDE("ExternalShape");
var rdeIgnoreShape = RDE("IgnoreShape");
var rdeClassIn = RDE("classIn");
var shIn = SH("in");
var shInversePath = SH("inversePath");
var shUniqueLang = SH("uniqueLang");
var rdeReadOnly = RDE("readOnly");
var rdeIdentifierPrefix = RDE("identifierPrefix");
var rdeAllowMarkDown = RDE("allowMarkDown");
var shNamespace = SH("namespace");
var rdeDefaultLanguage = RDE("defaultLanguage");
var rdeDefaultValue = RDE("defaultValue");
var shLanguageIn = SH("languageIn");
var shPattern = SH("pattern");
var rdeSortOnProperty = RDE("sortOnProperty");
var rdeAllowPushToTopLevelLabel = RDE("allowPushToTopLevelLabel");
var rdeIndependentIdentifiers = RDE("independentIdentifiers");
var rdeSpecialPattern = RDE("specialPattern");
var rdeConnectIDs = RDE("connectIDs");
var rdeAllowBatchManagement = RDE("allowBatchManagement");
var rdeCopyObjectsOfProperty = RDE("copyObjectsOfProperty");
var rdeUniqueValueAmongSiblings = RDE("uniqueValueAmongSiblings");
var rdfLangString = RDF("langString");
var skosDefinition = SKOS("definition");
var rdfsComment = RDFS("comment");
var shDescription = SH("description");
var rdfFirst = RDF("first");
var rdfRest = RDF("rest");
var rdfNil = RDF("nil");
var defaultLabelProperties = [prefLabel, rdfsLabel, shName];
var defaultDescriptionProperties = [skosDefinition, rdfsComment, shDescription];
var defaultPrefixMap = new PrefixMap({});

// src/helpers/rdf/shapes.ts
var shapes_exports = {};
__export(shapes_exports, {
  NodeShape: () => NodeShape,
  PropertyGroup: () => PropertyGroup,
  PropertyShape: () => PropertyShape,
  generateSubnodes: () => generateSubnodes,
  sortByPropValue: () => sortByPropValue
});
var rdf3 = __toESM(require("rdflib"));

// src/helpers/rdf/types.ts
var rdf2 = __toESM(require("rdflib"));
var import_typescript_memoize = require("typescript-memoize");
var import_recoil = require("recoil");
var import_nanoid = require("nanoid");
var import_debug2 = require("debug");
var debug2 = (0, import_debug2.debug)("rde:rdf:types");
var defaultGraphNode = rdf2.sym(rdf2.Store.defaultGraphURI);
var errors = {};
var history = {};
var updateHistory = (entity, qname, prop, val, noHisto = true) => {
  if (!history[entity])
    history[entity] = [];
  else {
    while (history[entity].length && history[entity][history[entity].length - 1]["tmp:undone"]) {
      history[entity].pop();
    }
  }
  const newVal = {
    [qname]: { [prop]: val },
    ...entity != qname ? { "tmp:parentPath": getParentPath(entity, qname) } : {}
  };
  if (val?.length === 1 && !(val[0] instanceof LiteralWithId) && (val[0].uri === "tmp:uri" || val[0].value === ""))
    return;
  if (noHisto === -1) {
    const first = history[entity].findIndex((h) => h["tmp:allValuesLoaded"]);
    if (first > 0)
      history[entity].splice(first, 0, newVal);
    else
      history[entity].push(newVal);
  } else
    history[entity].push(newVal);
};
var getHistoryStatus = (entityUri) => {
  if (!history[entityUri])
    return { top: -1, current: -1, first: -1 };
  const top = history[entityUri].length - 1;
  let first = -1, current = -1;
  for (const [i, h] of history[entityUri].entries()) {
    if (h["tmp:allValuesLoaded"])
      first = i;
    else if (h["tmp:undone"])
      current = i - 1;
    if (first != -1 && current != -1)
      break;
  }
  return { top, first, current };
};
function getParentPath(entityUri, sub) {
  let parentPath = [];
  for (const h of history[entityUri]) {
    const subSubj = Object.keys(h).filter((k) => !["tmp:parent", "tmp:undone"].includes(k));
    for (const s of subSubj) {
      const subprop = Object.keys(h[s]).filter((k) => !["tmp:parent", "tmp:undone"].includes(k));
      for (const p of subprop) {
        if (typeof h[s][p] !== "string")
          for (const v of h[s][p]) {
            if (v instanceof Subject && v.uri === sub) {
              if (parentPath.length > 1 && parentPath[1] !== p)
                throw new Error("multiple property (" + parentPath + "," + p + ") for node " + sub);
              if (s !== entityUri)
                parentPath = getParentPath(entityUri, s);
              parentPath.push(s);
              parentPath.push(p);
            }
          }
      }
    }
  }
  return parentPath;
}
var rdfLitAsNumber = (lit) => {
  const n = Number(lit.value);
  if (!isNaN(n)) {
    return +n;
  }
  return null;
};
var Path = class {
  sparqlString;
  directPathNode = null;
  inversePathNode = null;
  constructor(node, graph3, listMode) {
    const invpaths = graph3.store.each(node, shInversePath, null);
    if (invpaths.length > 1) {
      throw "too many inverse path in shacl path:" + invpaths;
    }
    if (invpaths.length == 1) {
      const invpath = invpaths[0];
      this.sparqlString = "^" + invpath.value;
      this.inversePathNode = invpath;
    } else {
      if (listMode) {
        this.sparqlString = node.value + "[]";
      } else {
        this.sparqlString = node.value;
      }
      this.directPathNode = node;
    }
  }
};
var EntityGraphValues = class {
  oldSubjectProps = {};
  newSubjectProps = {};
  subjectUri = "";
  /* eslint-disable no-magic-numbers */
  idHash = Date.now();
  //getRandomIntInclusive(1000, 9999).toString()
  noHisto = false;
  constructor(subjectUri) {
    this.subjectUri = subjectUri;
  }
  onGetInitialValues = (subjectUri, pathString, values) => {
    if (!(subjectUri in this.oldSubjectProps))
      this.oldSubjectProps[subjectUri] = {};
    if (!(subjectUri in this.newSubjectProps))
      this.newSubjectProps[subjectUri] = {};
    this.oldSubjectProps[subjectUri][pathString] = values;
    this.newSubjectProps[subjectUri][pathString] = values;
  };
  onUpdateValues = (subjectUri, pathString, values) => {
    if (!(subjectUri in this.newSubjectProps))
      this.newSubjectProps[subjectUri] = {};
    this.newSubjectProps[subjectUri][pathString] = values;
    if (this.noHisto === true) {
      this.noHisto = false;
      return;
    }
    updateHistory(this.subjectUri, subjectUri, pathString, values, this.noHisto);
    if (this.noHisto === 1)
      this.noHisto = -1;
  };
  isInitialized = (subjectUri, pathString) => {
    return subjectUri in this.oldSubjectProps && pathString in this.oldSubjectProps[subjectUri];
  };
  addNewValuestoStore(store, subjectUri) {
    if (!(subjectUri in this.newSubjectProps))
      return;
    const subject = rdf2.sym(subjectUri);
    for (const pathString in this.newSubjectProps[subjectUri]) {
      if (pathString.startsWith("^")) {
        const property = rdf2.sym(pathString.substring(1));
        const values = this.newSubjectProps[subjectUri][pathString];
        for (const val of values) {
          if (val instanceof LiteralWithId) {
            throw "can't add literals in inverse path, something's wrong with the data!";
          } else {
            if (val.node?.value == "tmp:uri" || val.node?.value == "tmp:none")
              continue;
            store.add(val.node, property, subject, defaultGraphNode);
            if (val instanceof Subject) {
              this.addNewValuestoStore(store, val.uri);
            }
          }
        }
      } else {
        const listMode = pathString.endsWith("[]");
        const property = rdf2.sym(listMode ? pathString.substring(0, pathString.length - 2) : pathString);
        const values = this.newSubjectProps[subjectUri][pathString];
        const collection = new rdf2.Collection();
        for (const val of values) {
          if (val instanceof LiteralWithId) {
            if (val.value == "")
              continue;
            if (listMode)
              collection.append(val);
            else
              store.add(subject, property, val, defaultGraphNode);
          } else {
            if (val.node?.value == "tmp:uri" || val.node?.value == "tmp:none")
              continue;
            if (listMode) {
              if (val.node) {
                collection.append(val.node);
              } else if (val instanceof rdf2.Literal) {
                collection.append(val);
              } else
                throw "could not add " + val + " to collection " + collection;
            } else
              store.add(subject, property, val.node, defaultGraphNode);
            if (val instanceof Subject) {
              this.addNewValuestoStore(store, val.uri);
            }
          }
        }
        if (listMode && collection.elements.length) {
          collection.close();
          store.add(subject, property, collection, defaultGraphNode);
        }
      }
    }
  }
  propsUpdateEffect = (subjectUri, pathString) => ({ setSelf, onSet }) => {
    onSet((newValues) => {
      if (!(newValues instanceof import_recoil.DefaultValue)) {
        this.onUpdateValues(subjectUri, pathString, newValues);
      }
    });
  };
  getAtomForSubjectProperty(pathString, subjectUri) {
    return (0, import_recoil.atom)({
      key: this.idHash + subjectUri + pathString,
      default: [],
      // effects_UNSTABLE no more, see https://github.com/facebookexperimental/Recoil/blob/main/CHANGELOG-recoil.md#breaking-changes-1
      effects: [
        /*debugAtomEffect,*/
        this.propsUpdateEffect(subjectUri, pathString)
      ],
      // disable immutability in production
      dangerouslyAllowMutability: true
    });
  }
  hasSubject(subjectUri) {
    return subjectUri in this.newSubjectProps;
  }
};
__decorateClass([
  (0, import_typescript_memoize.Memoize)((pathString, subjectUri) => {
    return subjectUri + pathString;
  })
], EntityGraphValues.prototype, "getAtomForSubjectProperty", 1);
var EntityGraph = class _EntityGraph {
  onGetInitialValues;
  getAtomForSubjectProperty;
  getValues;
  get values() {
    return this.getValues();
  }
  // where to start when reconstructing the tree
  topSubjectUri;
  store;
  // connexGraph is the store that contains the labels of associated resources
  // (ex: students, teachers, etc.), it's not present in all circumstances
  connexGraph;
  prefixMap;
  labelProperties;
  descriptionProperties;
  constructor(store, topSubjectUri, prefixMap = defaultPrefixMap, connexGraph = rdf2.graph(), labelProperties = defaultLabelProperties, descriptionProperties = defaultDescriptionProperties) {
    this.store = store;
    this.prefixMap = prefixMap;
    this.descriptionProperties = descriptionProperties;
    this.labelProperties = labelProperties;
    const values = new EntityGraphValues(topSubjectUri);
    this.topSubjectUri = topSubjectUri;
    this.onGetInitialValues = values.onGetInitialValues;
    this.getAtomForSubjectProperty = (pathString, subjectUri) => values.getAtomForSubjectProperty(pathString, subjectUri);
    this.connexGraph = connexGraph;
    this.getValues = () => {
      return values;
    };
  }
  addNewValuestoStore(store) {
    this.values.addNewValuestoStore(store, this.topSubjectUri);
  }
  static addIdToLitList = (litList) => {
    return litList.map((lit) => {
      return new LiteralWithId(lit.value, lit.language, lit.datatype);
    });
  };
  static addLabelsFromGraph = (resList, graph3) => {
    return resList.map((res) => {
      return new RDFResourceWithLabel(res, graph3);
    });
  };
  static addExtDataFromGraph = (resList, graph3) => {
    return resList.map((res) => {
      if (!graph3.connexGraph) {
        throw "trying to access inexistant associatedStore";
      }
      const perLang = {};
      for (const p of graph3.labelProperties) {
        const lits = graph3.connexGraph.each(res, p, null);
        for (const lit of lits) {
          if (lit.language in perLang)
            continue;
          perLang[lit.language] = lit.value;
        }
      }
      debug2("connex:", res.uri, perLang);
      return new ExtRDFResourceWithLabel(res.uri, perLang, void 0, void 0, graph3.prefixMap);
    });
  };
  hasSubject(subjectUri) {
    if (this.values.hasSubject(subjectUri))
      return true;
    return this.store.any(rdf2.sym(subjectUri), null, null) != null;
  }
  static subjectify = (resList, graph3) => {
    return resList.map((res) => {
      return new Subject(res, graph3);
    });
  };
  // only returns the values that were not initalized before
  getUnitializedValues(s, p) {
    const path = p.path;
    if (!path)
      return null;
    if (this.values.isInitialized(s.uri, path.sparqlString)) {
      return null;
    }
    return this.getPropValuesFromStore(s, p);
  }
  getPropValuesFromStore(s, p) {
    if (!p.path) {
      throw "can't find path of " + p.uri;
    }
    switch (p.objectType) {
      case 3 /* ResExt */:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri;
        }
        const fromRDFResExt = s.getPropResValuesFromPath(p.path);
        const fromRDFResExtwData = _EntityGraph.addExtDataFromGraph(fromRDFResExt, s.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFResExtwData);
        return fromRDFResExtwData;
        break;
      case 1 /* Internal */:
        const fromRDFSubNode = s.getPropResValuesFromPath(p.path);
        const fromRDFSubs = _EntityGraph.subjectify(fromRDFSubNode, s.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFSubs);
        return fromRDFSubs;
        break;
      case 2 /* ResInList */:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri;
        }
        const fromRDFResList = s.getPropResValues(p.path.directPathNode);
        const fromRDFReswLabels = _EntityGraph.addLabelsFromGraph(fromRDFResList, p.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFReswLabels);
        return fromRDFReswLabels;
        break;
      case 0 /* Literal */:
      case 5 /* LitInList */:
      default:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri;
        }
        let fromRDFLits;
        if (p.hasListAsObject) {
          const fromRDFLitsList = s.getPropLitValuesFromList(p.path.directPathNode);
          fromRDFLits = fromRDFLitsList === null ? [] : fromRDFLitsList;
        } else {
          fromRDFLits = s.getPropLitValues(p.path.directPathNode);
        }
        const fromRDFLitIDs = _EntityGraph.addIdToLitList(fromRDFLits);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFLitIDs);
        return fromRDFLitIDs;
        break;
    }
  }
};
var RDFResource = class {
  node;
  graph;
  isCollection;
  constructor(node, graph3) {
    this.node = node;
    this.graph = graph3;
    this.isCollection = node instanceof rdf2.Collection;
  }
  get id() {
    return this.node.value;
  }
  get value() {
    return this.node.value;
  }
  get lname() {
    return this.graph.prefixMap.lnameFromUri(this.node.value);
  }
  get namespace() {
    return this.graph.prefixMap.namespaceFromUri(this.node.value);
  }
  get qname() {
    return this.graph.prefixMap.qnameFromUri(this.node.value);
  }
  get uri() {
    return this.node.value;
  }
  static valuesByLang(values) {
    const res = {};
    for (const value of values) {
      if (value instanceof LiteralWithId) {
        res[value.language] = value.value;
      }
    }
    return res;
  }
  getPropValueByLang(p) {
    if (this.node instanceof rdf2.Collection)
      return {};
    const lits = this.graph.store.each(this.node, p, null);
    const res = {};
    for (const lit of lits) {
      res[lit.language] = lit.value;
    }
    return res;
  }
  getPropValueOrNullByLang(p) {
    if (this.node instanceof rdf2.Collection)
      return {};
    const lits = this.graph.store.each(this.node, p, null);
    const res = {};
    let i = 0;
    for (const lit of lits) {
      i += 1;
      res[lit.language] = lit.value;
    }
    if (i == 0)
      return null;
    return res;
  }
  getPropLitValues(p) {
    if (this.node instanceof rdf2.Collection)
      return [];
    return this.graph.store.each(this.node, p, null);
  }
  getPropResValues(p) {
    if (this.node instanceof rdf2.Collection)
      return [];
    return this.graph.store.each(this.node, p, null);
  }
  fillElements(s, current) {
    if (!s || s instanceof rdf2.NamedNode && s.uri == rdfNil.uri)
      return;
    const first = this.graph.store.any(s, rdfFirst, null);
    current.push(first);
    this.fillElements(this.graph.store.any(s, rdfRest, null), current);
  }
  getPropResValuesFromList(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    const colls = this.graph.store.each(this.node, p, null);
    for (const coll of colls) {
      if (coll instanceof rdf2.Collection) {
        return coll.elements;
      }
      const res = [];
      this.fillElements(coll, res);
      return res;
    }
    return null;
  }
  getPropLitValuesFromList(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    const colls = this.graph.store.each(this.node, p, null);
    for (const coll of colls) {
      if (coll instanceof rdf2.Collection) {
        return coll.elements;
      }
      const res = [];
      this.fillElements(coll, res);
      return res;
    }
    return null;
  }
  getPropIntValue(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    const lit = this.graph.store.any(this.node, p, null);
    if (lit === null)
      return null;
    return rdfLitAsNumber(lit);
  }
  getPropStringValue(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    const lit = this.graph.store.any(this.node, p, null);
    if (lit === null)
      return null;
    return lit.value;
  }
  getPropResValue(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    const res = this.graph.store.any(this.node, p, null);
    return res;
  }
  getPropResValuesFromPath(p) {
    if (this.node instanceof rdf2.Collection)
      return [];
    if (p.directPathNode) {
      return this.graph.store.each(this.node, p.directPathNode, null);
    }
    return this.graph.store.each(null, p.inversePathNode, this.node);
  }
  getPropResValueFromPath(p) {
    if (this.node instanceof rdf2.Collection)
      return null;
    if (p.directPathNode) {
      return this.graph.store.any(this.node, p.directPathNode, null);
    }
    return this.graph.store.any(this.node, p.inversePathNode, null);
  }
  getPropBooleanValue(p, dflt = false) {
    if (this.node instanceof rdf2.Collection)
      return dflt;
    const lit = this.graph.store.any(this.node, p, null);
    if (!lit)
      return dflt;
    const n = Boolean(lit.value);
    if (n) {
      return n;
    }
    return dflt;
  }
};
var RDFResourceWithLabel = class extends RDFResource {
  node;
  constructor(node, graph3, labelProp) {
    super(node, graph3);
    this.node = node;
  }
  get prefLabels() {
    for (const p of this.graph.labelProperties) {
      const res = this.getPropValueOrNullByLang(p);
      if (res != null)
        return res;
    }
    return { en: this.node.value };
  }
  get description() {
    for (const p of this.graph.descriptionProperties) {
      const res = this.getPropValueOrNullByLang(p);
      if (res != null)
        return res;
    }
    return null;
  }
};
__decorateClass([
  (0, import_typescript_memoize.Memoize)()
], RDFResourceWithLabel.prototype, "prefLabels", 1);
__decorateClass([
  (0, import_typescript_memoize.Memoize)()
], RDFResourceWithLabel.prototype, "description", 1);
var ExtRDFResourceWithLabel = class _ExtRDFResourceWithLabel extends RDFResourceWithLabel {
  _prefLabels;
  _description;
  _otherData;
  get prefLabels() {
    return this._prefLabels;
  }
  get description() {
    return this._description;
  }
  get otherData() {
    return this._otherData;
  }
  constructor(uri, prefLabels, data = {}, description = null, prefixMap) {
    super(rdf2.sym(uri), new EntityGraph(new rdf2.Store(), uri, prefixMap));
    this._prefLabels = prefLabels;
    this._description = description;
    this._otherData = data;
  }
  addOtherData(key, value) {
    return new _ExtRDFResourceWithLabel(this.uri, this._prefLabels, { ...this._otherData, [key]: value });
  }
};
var LiteralWithId = class _LiteralWithId extends rdf2.Literal {
  id;
  constructor(value, language, datatype, id) {
    super(value, language, datatype);
    if (id) {
      this.id = id;
    } else {
      this.id = (0, import_nanoid.nanoid)();
    }
  }
  copy() {
    return new _LiteralWithId(this.value, this.language, this.datatype, this.id);
  }
  copyWithUpdatedValue(value) {
    return new _LiteralWithId(value, this.language, this.datatype, this.id);
  }
  copyWithUpdatedLanguage(language) {
    return new _LiteralWithId(this.value, language, this.datatype, this.id);
  }
};
var Subject = class _Subject extends RDFResource {
  node;
  constructor(node, graph3) {
    super(node, graph3);
    this.node = node;
  }
  getUnitializedValues(property) {
    return this.graph.getUnitializedValues(this, property);
  }
  getAtomForProperty(pathString) {
    return this.graph.getAtomForSubjectProperty(pathString, this.uri);
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
  noHisto(force = false, start = true) {
    const current = this.graph.getValues().noHisto;
    if (!force && current === -1)
      return;
    if (start !== true)
      this.graph.getValues().noHisto = start;
    else if (force || history[this.uri] && history[this.uri].some((h) => h["tmp:allValuesLoaded"]))
      this.graph.getValues().noHisto = true;
  }
  resetNoHisto() {
    this.graph.getValues().noHisto = false;
  }
  static createEmpty() {
    return new _Subject(rdf2.sym("tmp:uri"), new EntityGraph(new rdf2.Store(), "tmp:uri"));
  }
  isEmpty() {
    return this.node.uri == "tmp:uri";
  }
};
var noneSelected = new ExtRDFResourceWithLabel("tmp:none", { en: "\u2013" }, {}, { en: "none provided" });
var emptyLiteral = new LiteralWithId("");
var sameLanguage = (lang1, lang2) => {
  return lang1 == lang2;
};

// src/helpers/rdf/shapes.ts
var import_typescript_memoize2 = require("typescript-memoize");
var import_nanoid2 = require("nanoid");
var import_debug3 = require("debug");
var debug3 = (0, import_debug3.debug)("rde:rdf:shapes");
var sortByPropValue = (nodelist, property, store) => {
  const nodeUriToPropValue = {};
  for (const node of nodelist) {
    const ordern = store.any(node, property, null);
    if (!ordern) {
      nodeUriToPropValue[node.uri] = 0;
      continue;
    }
    const asnum = rdfLitAsNumber(ordern);
    nodeUriToPropValue[node.uri] = asnum == null ? 0 : asnum;
  }
  const res = [...nodelist].sort((a, b) => {
    return nodeUriToPropValue[a.uri] - nodeUriToPropValue[b.uri];
  });
  return res;
};
var _PropertyShape = class _PropertyShape extends RDFResourceWithLabel {
  constructor(node, graph3) {
    super(node, graph3, rdfsLabel);
  }
  get prefLabels() {
    let res = {};
    if (this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode;
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.graph);
        res = propInOntology.prefLabels;
      }
    }
    const resFromShape = this.getPropValueByLang(shName);
    res = { ...res, ...resFromShape };
    return res;
  }
  get helpMessage() {
    let res = this.description;
    if (res == null && this.path && (this.path.directPathNode || this.path.inversePathNode)) {
      const pathNode = this.path.directPathNode || this.path.inversePathNode;
      if (pathNode) {
        const propInOntology = new RDFResourceWithLabel(pathNode, this.graph);
        res = propInOntology.description;
      }
    }
    return res;
  }
  get errorMessage() {
    const res = this.getPropValueByLang(shMessage);
    return res;
  }
  get defaultValue() {
    return this.graph.store.any(this.node, rdeDefaultValue, null);
  }
  get singleLine() {
    return this.getPropBooleanValue(dashSingleLine);
  }
  get connectIDs() {
    return this.getPropBooleanValue(rdeConnectIDs, false);
  }
  get displayPriority() {
    return this.getPropIntValue(rdeDisplayPriority);
  }
  get minCount() {
    return this.getPropIntValue(shMinCount);
  }
  get maxCount() {
    return this.getPropIntValue(shMaxCount);
  }
  get minInclusive() {
    return this.getPropIntValue(shMinInclusive);
  }
  get maxInclusive() {
    return this.getPropIntValue(shMaxInclusive);
  }
  get minExclusive() {
    return this.getPropIntValue(shMinExclusive);
  }
  get maxExclusive() {
    return this.getPropIntValue(shMaxExclusive);
  }
  get allowMarkDown() {
    return this.getPropBooleanValue(rdeAllowMarkDown);
  }
  get allowBatchManagement() {
    return this.getPropBooleanValue(rdeAllowBatchManagement);
  }
  get uniqueValueAmongSiblings() {
    return this.getPropBooleanValue(rdeUniqueValueAmongSiblings);
  }
  get uniqueLang() {
    return this.getPropBooleanValue(shUniqueLang);
  }
  get readOnly() {
    return this.getPropBooleanValue(rdeReadOnly);
  }
  get defaultLanguage() {
    return this.getPropStringValue(rdeDefaultLanguage);
  }
  get editorLname() {
    const val = this.getPropResValue(dashEditor);
    if (!val)
      return null;
    return defaultPrefixMap.lnameFromUri(val.value);
  }
  get group() {
    return this.getPropResValue(shGroup);
  }
  get copyObjectsOfProperty() {
    return this.graph.store.each(this.node, rdeCopyObjectsOfProperty, null);
  }
  get datatype() {
    const res = this.getPropResValue(shDatatype);
    if (res === null && this.hasListAsObject) {
      const propNodes = this.graph.store.each(
        this.node,
        shProperty,
        null
      );
      if (!propNodes)
        return null;
      const props = _PropertyShape.resourcizeWithInit(propNodes, this.graph);
      for (const p of props) {
        return p.getPropResValue(shDatatype);
      }
    }
    return res;
  }
  get pattern() {
    return this.getPropStringValue(shPattern);
  }
  get sortOnProperty() {
    return this.getPropResValue(rdeSortOnProperty);
  }
  get allowPushToTopLevelLabel() {
    return this.getPropBooleanValue(rdeAllowPushToTopLevelLabel);
  }
  get specialPattern() {
    return this.getPropResValue(rdeSpecialPattern);
  }
  static resourcizeWithInit(nodes, graph3) {
    const res = [];
    for (const node of nodes) {
      const r = new RDFResourceWithLabel(node, graph3);
      let justforinit = r.description;
      justforinit = r.prefLabels;
      res.push(r);
    }
    return res;
  }
  get hasListAsObject() {
    const res = this.graph.store.each(this.node, shNode, dashListShape);
    if (res == null || res.length == 0)
      return false;
    return true;
  }
  get in() {
    if (this.hasListAsObject) {
      const propNodes = this.graph.store.each(
        this.node,
        shProperty,
        null
      );
      if (!propNodes)
        return null;
      const props = _PropertyShape.resourcizeWithInit(propNodes, this.graph);
      for (const p of props) {
        if (p.getPropResValue(shDatatype)) {
          const nodes = p.getPropLitValuesFromList(shIn);
          if (nodes)
            return EntityGraph.addIdToLitList(nodes);
        } else {
          const nodes = p.getPropResValuesFromList(shIn);
          if (nodes)
            return _PropertyShape.resourcizeWithInit(nodes, this.graph);
        }
      }
    }
    if (this.datatype) {
      const nodes = this.getPropLitValuesFromList(shIn);
      if (nodes)
        return EntityGraph.addIdToLitList(nodes);
    } else {
      const nodes = this.getPropResValuesFromList(shIn);
      if (nodes)
        return _PropertyShape.resourcizeWithInit(nodes, this.graph);
    }
    return null;
  }
  get expectedObjectTypes() {
    let nodes = this.getPropResValuesFromList(rdeClassIn);
    if (!nodes) {
      const cl = this.getPropResValues(shClass);
      if (cl.length)
        nodes = cl;
    }
    if (!nodes)
      return null;
    return _PropertyShape.resourcizeWithInit(nodes, this.graph);
  }
  get path() {
    const pathNode = this.getPropResValue(shPath);
    if (!pathNode)
      return null;
    return new Path(pathNode, this.graph, this.hasListAsObject);
  }
  get objectType() {
    const propertyShapeType = this.getPropResValue(rdePropertyShapeType);
    if (!propertyShapeType) {
      const editor = this.getPropResValue(dashEditor);
      if (!editor)
        return 0 /* Literal */;
      if (editor.value == dashEnumSelectEditor.value) {
        if (this.datatype)
          return 5 /* LitInList */;
        return 2 /* ResInList */;
      }
      return 0 /* Literal */;
    }
    if (propertyShapeType.value == rdeInternalShape.value)
      return 1 /* Internal */;
    else if (propertyShapeType.value == rdeExternalShape.value)
      return 3 /* ResExt */;
    else if (propertyShapeType.value == rdeIgnoreShape.value)
      return 4 /* ResIgnore */;
    throw "can't handle property shape type " + propertyShapeType.value + " for property shape " + this.qname;
  }
  get targetShape() {
    const path = this.path;
    if (!path) {
      debug3("can't find path for " + this.uri);
      return null;
    }
    let val;
    if (path.directPathNode) {
      val = this.graph.store.any(null, shTargetObjectsOf, path.directPathNode);
      if (val == null)
        return null;
      return new NodeShape(val, this.graph);
    }
    if (path.inversePathNode) {
      val = this.graph.store.any(null, shTargetSubjectsOf, path.inversePathNode);
      if (val == null)
        return null;
      return new NodeShape(val, this.graph);
    }
    return null;
  }
};
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "prefLabels", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "helpMessage", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "errorMessage", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "defaultValue", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "singleLine", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "connectIDs", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "displayPriority", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "minCount", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "maxCount", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "minInclusive", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "maxInclusive", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "minExclusive", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "maxExclusive", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "allowMarkDown", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "allowBatchManagement", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "uniqueValueAmongSiblings", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "uniqueLang", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "readOnly", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "defaultLanguage", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "editorLname", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "group", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "copyObjectsOfProperty", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "datatype", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "pattern", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "sortOnProperty", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "allowPushToTopLevelLabel", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "specialPattern", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "hasListAsObject", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "in", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "expectedObjectTypes", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "path", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "objectType", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], _PropertyShape.prototype, "targetShape", 1);
var PropertyShape = _PropertyShape;
var PropertyGroup = class extends RDFResourceWithLabel {
  constructor(node, graph3) {
    super(node, graph3, rdfsLabel);
  }
  get properties() {
    const res = [];
    let propsingroup = this.graph.store.each(null, shGroup, this.node);
    propsingroup = sortByPropValue(propsingroup, shOrder, this.graph.store);
    for (const prop of propsingroup) {
      res.push(new PropertyShape(prop, this.graph));
    }
    return res;
  }
  get prefLabels() {
    return this.getPropValueByLang(rdfsLabel);
  }
};
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], PropertyGroup.prototype, "properties", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], PropertyGroup.prototype, "prefLabels", 1);
var NodeShape = class extends RDFResourceWithLabel {
  constructor(node, graph3) {
    super(node, graph3, rdfsLabel);
  }
  get targetClassPrefLabels() {
    const targetClass = this.graph.store.any(this.node, shTargetClass, null);
    if (targetClass == null)
      return null;
    const classInOntology = new RDFResourceWithLabel(targetClass, this.graph);
    return classInOntology.prefLabels;
  }
  get properties() {
    const res = [];
    let props = this.graph.store.each(this.node, shProperty, null);
    props = sortByPropValue(props, shOrder, this.graph.store);
    for (const prop of props) {
      res.push(new PropertyShape(prop, this.graph));
    }
    return res;
  }
  get independentIdentifiers() {
    return this.getPropBooleanValue(rdeIndependentIdentifiers, false);
  }
  get groups() {
    const res = [];
    const props = this.graph.store.each(this.node, shProperty, null);
    let grouplist = [];
    for (const prop of props) {
      const group = this.graph.store.any(prop, shGroup, null);
      if (group && !grouplist.some((e) => e.value === group.value)) {
        grouplist.push(group);
      }
    }
    grouplist = sortByPropValue(grouplist, shOrder, this.graph.store);
    for (const group of grouplist) {
      res.push(new PropertyGroup(group, this.graph));
    }
    return res;
  }
};
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], NodeShape.prototype, "targetClassPrefLabels", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], NodeShape.prototype, "properties", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], NodeShape.prototype, "independentIdentifiers", 1);
__decorateClass([
  (0, import_typescript_memoize2.Memoize)()
], NodeShape.prototype, "groups", 1);
var nanoidCustom = (0, import_nanoid2.customAlphabet)("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
var generateSubnodes = async (subshape, parent, n = 1) => {
  const prefix = subshape ? subshape.getPropStringValue(rdeIdentifierPrefix) : "";
  let namespace = subshape?.getPropStringValue(shNamespace);
  if (!namespace)
    namespace = parent.namespace;
  const res = [];
  for (let i = 0; i < n; i++) {
    let uri = namespace + prefix + parent.lname + nanoidCustom();
    while (parent.graph.hasSubject(uri)) {
      uri = namespace + prefix + nanoidCustom();
    }
    res.push(new Subject(new rdf3.NamedNode(uri), parent.graph));
  }
  return Promise.resolve(res);
};

// src/atoms/common.ts
var common_exports = {};
__export(common_exports, {
  ESfromRecoilSelector: () => ESfromRecoilSelector,
  EditedEntityState: () => EditedEntityState,
  defaultEntityLabelAtom: () => defaultEntityLabelAtom,
  entitiesAtom: () => entitiesAtom,
  initListAtom: () => initListAtom,
  initMapAtom: () => initMapAtom,
  initStringAtom: () => initStringAtom,
  initkvAtom: () => initkvAtom,
  isUniqueTestSelector: () => isUniqueTestSelector,
  noUndo: () => noUndo,
  noUndoRedo: () => noUndoRedo,
  orderedByPropSelector: () => orderedByPropSelector,
  orderedNewValSelector: () => orderedNewValSelector,
  personNamesLabelsSelector: () => personNamesLabelsSelector,
  possiblePrefLabelsSelector: () => possiblePrefLabelsSelector,
  reloadEntityState: () => reloadEntityState,
  sameUndo: () => sameUndo,
  sameUndoSub: () => sameUndoSub,
  savePopupState: () => savePopupState,
  sessionLoadedState: () => sessionLoadedState,
  toCopySelector: () => toCopySelector,
  uiDisabledTabsState: () => uiDisabledTabsState,
  uiEditState: () => uiEditState,
  uiGroupState: () => uiGroupState,
  uiHistoryState: () => uiHistoryState,
  uiLangState: () => uiLangState,
  uiLitLangState: () => uiLitLangState,
  uiNavState: () => uiNavState,
  uiRIDState: () => uiRIDState,
  uiReadyState: () => uiReadyState,
  uiTabState: () => uiTabState,
  uiUndosState: () => uiUndosState
});
var import_recoil2 = require("recoil");
var import_lodash = __toESM(require("lodash"));
var import_debug4 = require("debug");
var debug4 = (0, import_debug4.debug)("rde:common");
var EditedEntityState = /* @__PURE__ */ ((EditedEntityState3) => {
  EditedEntityState3[EditedEntityState3["Error"] = 0] = "Error";
  EditedEntityState3[EditedEntityState3["Saved"] = 1] = "Saved";
  EditedEntityState3[EditedEntityState3["NeedsSaving"] = 2] = "NeedsSaving";
  EditedEntityState3[EditedEntityState3["Loading"] = 3] = "Loading";
  EditedEntityState3[EditedEntityState3["NotLoaded"] = 4] = "NotLoaded";
  return EditedEntityState3;
})(EditedEntityState || {});
var entitiesAtom = (0, import_recoil2.atom)({
  key: "rde_entities",
  default: []
});
var defaultEntityLabelAtom = (0, import_recoil2.atom)({
  key: "rde_defaultEntityLabelAtom",
  default: [new LiteralWithId("...", "en")]
  // TODO: use the i18n stuff
});
var uiLangState = (0, import_recoil2.atom)({
  key: "rde_uiLangState",
  default: "en"
});
var uiLitLangState = (0, import_recoil2.atom)({
  key: "rde_uiLitLangState",
  default: ["en"]
});
var uiReadyState = (0, import_recoil2.atom)({
  key: "rde_uiReadyState",
  default: false
});
var uiTabState = (0, import_recoil2.atom)({
  key: "rde_uiTabState",
  default: -1
});
var uiRIDState = (0, import_recoil2.atom)({
  key: "rde_uiRIDState",
  default: []
});
var uiEditState = (0, import_recoil2.atom)({
  key: "rde_uiEditState",
  default: ""
});
var uiGroupState = (0, import_recoil2.atom)({
  key: "rde_uiGroupState",
  default: ""
});
var uiHistoryState = (0, import_recoil2.atom)({
  key: "rde_uiHistoryState",
  default: {}
});
var sameUndoSub = (undo1, undo2) => {
  const ret = undo1.enabled === undo2.enabled && undo1.subjectUri === undo2.subjectUri && undo1.propertyPath === undo2.propertyPath && undo1.parentPath.length === undo2.parentPath.length && undo1.parentPath.filter((u, i) => u === undo2.parentPath[i]).length === undo1.parentPath.length;
  return ret;
};
var sameUndo = (undo1, undo2) => {
  return !undo1 && !undo2 || undo1 && undo2 && sameUndoSub(undo1.prev, undo2.prev) && sameUndoSub(undo1.next, undo2.next);
};
var noUndo = { enabled: false, subjectUri: "", propertyPath: "", parentPath: [] };
var noUndoRedo = { prev: noUndo, next: noUndo };
var uiUndosState = (0, import_recoil2.atom)({
  key: "rde_uiUndosState",
  default: {}
});
var uiNavState = (0, import_recoil2.atom)({
  key: "rde_uiNavState",
  default: ""
});
var sessionLoadedState = (0, import_recoil2.atom)({
  key: "rde_sessionLoadedState",
  default: false
});
var uiDisabledTabsState = (0, import_recoil2.atom)({
  key: "rde_uiDisabledTabsState",
  default: false
});
var reloadEntityState = (0, import_recoil2.atom)({
  key: "rde_reloadEntityState",
  default: ""
});
var orderedByPropSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_orderedByPropSelector",
  get: (args) => ({ get }) => {
    let { atom: atom3, propertyPath, order } = args;
    if (propertyPath) {
      if (!order)
        order = "asc";
      const unorderedList = get(atom3);
      const orderedList = import_lodash.default.orderBy(
        unorderedList.map((w) => {
          if (w instanceof Subject) {
            const s = w;
            let k;
            const v = get(s.getAtomForProperty(propertyPath));
            if (Array.isArray(v) && v.length)
              k = Number(v[0].value);
            else if (order === "desc")
              k = Number.MIN_SAFE_INTEGER;
            else
              k = Number.MAX_SAFE_INTEGER;
            return { s, k };
          }
          return { s: w, k: order === "asc" ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER };
        }),
        ["k"],
        [order === "asc" ? "asc" : "desc"]
      ).map((i) => i.s);
      return orderedList;
    }
    return [];
  }
});
var personNamesLabelsSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_personNamesLabelsSelector",
  get: (args) => ({ get }) => {
    const { atom: atom3 } = args;
    if (atom3) {
      const names = get(atom3);
      const namesLabelsAtoms = names.map((n) => n.getAtomForProperty(rdfsLabel.uri));
      const namesLabels = namesLabelsAtoms.reduce(
        (acc, nl) => [...acc, ...get(nl)],
        []
      );
      return namesLabels;
    }
    return [];
  }
});
var initListAtom = (0, import_recoil2.atom)({ key: "rde_initListAtom", default: [] });
var initStringAtom = (0, import_recoil2.atom)({ key: "rde_initStringAtom", default: "" });
var initMapAtom = (0, import_recoil2.atom)({ key: "rde_initMapAtom", default: {} });
var initkvAtom = (0, import_recoil2.atom)({
  key: "rde_initkvAtom",
  default: {}
});
var possiblePrefLabelsSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_possiblePrefLabelsSelector",
  get: (args) => ({ get }) => {
    const res = {};
    for (const g of Object.keys(args.canPushPrefLabelGroups)) {
      const labels = [], atoms = [];
      const canPushPrefLabelGroup = args.canPushPrefLabelGroups[g];
      if (canPushPrefLabelGroup.subprops) {
        Object.keys(canPushPrefLabelGroup.subprops).map((k) => {
          if (!canPushPrefLabelGroup.subprops || !canPushPrefLabelGroup.subprops[k].atom)
            return [];
          const names = get(canPushPrefLabelGroup.subprops[k].atom);
          for (const n of names) {
            for (const a of canPushPrefLabelGroup.subprops[k].allowPush) {
              const vals = get(n.getAtomForProperty(a));
              vals.map((v) => labels.push(v));
            }
          }
          if (canPushPrefLabelGroup.props) {
            canPushPrefLabelGroup.props.map((a) => {
              const vals = get(a);
              vals.map((v) => labels.push(v));
            });
          }
          return labels;
        });
      }
      if (labels.length)
        res[g] = labels;
    }
    return res;
  }
});
var orderedNewValSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_orderedNewValSelector",
  get: (args) => ({ get }) => {
    let newVal = -1;
    if (args.atom) {
      const order = args.order ? args.order : "asc";
      const parentList = get(args.atom);
      parentList.map((s, i) => {
        if (i < parentList.length - 1 - 1)
          return;
        const k = get(s.getAtomForProperty(args.propertyPath));
        let kint = 0;
        if (Array.isArray(k) && k.length)
          kint = Number(k[0].value);
        if (newVal === -1 || order === "asc" && kint >= newVal || order === "desc" && kint <= newVal) {
          if (order === "asc")
            newVal = kint + 1;
          else
            newVal = kint - 1;
        }
      });
    }
    return newVal.toString();
  }
});
var toCopySelector = (0, import_recoil2.selectorFamily)({
  key: "rde_toCopySelector",
  get: (args) => ({ get }) => {
    const res = [];
    args.list?.map(({ property, atom: atom3 }) => {
      const val = get(atom3);
      res.push({ k: property, val });
    });
    return res;
  },
  set: (args) => ({ get, set }, newValue) => {
    if (newValue instanceof import_recoil2.DefaultValue) {
      return;
    }
    const { k, val } = newValue[0];
    args.list?.map(({ property, atom: atom3 }) => {
      if (k == property)
        set(atom3, [...get(atom3).filter((lit) => lit.value), ...val]);
    });
  }
});
var savePopupState = (0, import_recoil2.atom)({
  key: "rde_savePopupState",
  default: false
});
var ESfromRecoilSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_ESfromRecoilSelector",
  get: ({}) => ({ get }) => {
    return true;
  },
  set: ({}) => ({ get, set }, args) => {
    const entities = get(entitiesAtom);
    const setEntities = (val) => set(entitiesAtom, val);
    const n = entities.findIndex((e) => e.subjectQname === args.entityQname);
    if (n > -1) {
      const ent = entities[n];
      if (args.status === 0 /* Error */) {
        if (!errors[ent.subjectQname])
          errors[ent.subjectQname] = {};
        errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id] = true;
        if (ent.state != args.status) {
          const newEntities = [...entities];
          newEntities[n] = { ...entities[n], state: args.status };
          setEntities(newEntities);
        }
        return;
      }
      const status = ent.etag && (!args.undo || args.undo.prev && !args.undo.prev.enabled) && !ent.loadedUnsavedFromLocalStorage ? 1 /* Saved */ : 2 /* NeedsSaving */;
      const hasError = errors[ent.subjectQname] && errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id];
      if (ent.state != status || hasError && args.forceRemove) {
        if (args.removingFacet) {
          if (errors[ent.subjectQname]) {
            const keys = Object.keys(errors[ent.subjectQname]);
            for (const k of keys) {
              if (k.startsWith(args.id))
                delete errors[ent.subjectQname][k];
            }
          }
        } else if (hasError) {
          delete errors[ent.subjectQname][args.subject.qname + ";" + args.property.qname + ";" + args.id];
        }
        if (!errors[ent.subjectQname] || !Object.keys(errors[ent.subjectQname]).length) {
          const newEntities = [...entities];
          newEntities[n] = { ...entities[n], state: status };
          setEntities(newEntities);
        }
      }
    }
  }
});
var isUniqueTestSelector = (0, import_recoil2.selectorFamily)({
  key: "rde_isUniqueTestSelector",
  get: (args) => ({ get }) => {
    if (!args.checkUnique)
      return true;
    const siblings = get(args.siblingsAtom), vals = [];
    for (const s of siblings) {
      const lit = get(s.getAtomForProperty(args.propertyPath));
      if (lit.length) {
        if (vals.includes(lit[0].value)) {
          return false;
        }
        vals.push(lit[0].value);
      }
    }
    return true;
  }
});

// src/translations/en.js
var enTranslations = {
  home: {
    title: "RDF Document Editor",
    uilang: "UI Language",
    nav: "navigation"
  },
  types: {
    loading: "Loading...",
    creating: "Creating...",
    redirect: "Redirecting...",
    boolean: "Boolean",
    true: "True",
    false: "False",
    unset: "-"
  },
  search: {
    help: {
      preview: "Preview resource",
      open: "Open in Library",
      replace: "Replace",
      edit: "Edit resource"
    },
    lookup: "lookup",
    cancel: "cancel",
    change: "change",
    create: "...",
    new: "new {{type}}",
    open: "open"
  },
  error: {
    inferiorTo: "must be inferior to {{val}}",
    superiorTo: "must be superior to {{val}}",
    inferiorToStrict: "must be inferior and not equal to {{val}}",
    superiorToStrict: "must be superior and not equal to {{val}}",
    empty: "should not be empty",
    unique: "duplicate language",
    uniqueV: "duplicate value",
    exist: "Entity {{id}} does not exist",
    shape: "Cannot find any appropriate shape for entity {{id}}",
    redirect: "Create new or load another entity",
    minC: "at least {{count}} value must be provided",
    maxC: "at most {{count}} value can be provided",
    prefix: "RID prefix must be set in <res>user profile</res>",
    notF: "Resource {{RID}} not found",
    type: "{{id}} is a {{actual}}; but a {{allow}} is required here",
    preview: "This entity has not been saved yet",
    force: "Errors are detected and will be likely rejected by the server.\nTry anyway?",
    modified: "Entity must be reloaded first (modified by someone else?)",
    unauthorized: "not authorized to modify {{url}}",
    year: "Year must be between {{min}} and {{max}}",
    select: "'{{val}}' is not in list of allowed values",
    local_load_fail: "could not load local data, fetching remote version"
  },
  general: {
    add_another: "Add {{val}}",
    add_another_plural: "Add N {{val}}",
    toggle: "{{show}} empty secondary properties",
    show: "Show",
    hide: "Hide",
    add_nb: "Number of {{val}} to add",
    close: "Close all open entities",
    import: "Import labels",
    save: "Save",
    ok: "Ok",
    cancel: "Cancel",
    load_previous_q: "found previous local edits for this resource, load them?"
  }
};
var en_default = enTranslations;

// src/index.ts
var rdf10 = __toESM(require("rdflib"));

// src/containers/EntityEditContainer.tsx
var import_react4 = __toESM(require("react"));

// src/helpers/rdf/io.ts
var rdf4 = __toESM(require("rdflib"));
var import_i18next = __toESM(require("i18next"));
var import_react = require("react");
var import_recoil3 = require("recoil");
var import_debug5 = require("debug");
var import_react_i18next = require("react-i18next");
var debug5 = (0, import_debug5.debug)("rde:rdf:io");
var defaultFetchTtlHeaders = new Headers();
defaultFetchTtlHeaders.set("Accept", "text/turtle");
var HttpError = class extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};
var fetchTtl = async (url, allow404 = false, headers = defaultFetchTtlHeaders, allowEmptyEtag = true) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, { headers });
    if (allow404 && response.status == 404) {
      resolve({ store: new rdf4.Store(), etag: null });
      return;
    }
    if (response.status != 200) {
      reject(new HttpError("cannot fetch " + url, response.status));
      return;
    }
    const etag = response.headers.get("etag");
    if (!allowEmptyEtag && !etag) {
      reject(new Error("no etag returned from " + url));
      return;
    }
    const body = await response.text();
    const store = new rdf4.Store();
    try {
      rdf4.parse(body, store, rdf4.Store.defaultGraphURI, "text/turtle");
    } catch {
      reject(new Error("cannot parse result of " + url + " in ttl"));
      return;
    }
    resolve({ store, etag });
  });
};
var shapesMap = {};
var loading = {};
function ShapeFetcher(shapeQname, entityQname, config) {
  const [loadingState, setLoadingState] = (0, import_react.useState)({ status: "idle", error: void 0 });
  const [shape, setShape] = (0, import_react.useState)();
  const [current, setCurrent] = (0, import_react.useState)(shapeQname);
  const [entities, setEntities] = (0, import_recoil3.useRecoilState)(entitiesAtom);
  (0, import_react.useEffect)(() => {
    if (current != shapeQname) {
      reset();
    }
  });
  const reset = () => {
    setCurrent(shapeQname);
    setShape(void 0);
    setLoadingState({ status: "idle", error: void 0 });
  };
  (0, import_react.useEffect)(() => {
    if (shapeQname in shapesMap) {
      setLoadingState({ status: "fetched", error: void 0 });
      setShape(shapesMap[shapeQname]);
      return;
    }
    if (shapeQname === current && loading[shapeQname] && !shape) {
      return;
    }
    if (shape && shapeQname === current && ["fetched", "fetching"].includes(loadingState.status)) {
      return;
    }
    async function fetchResource(shapeQname2) {
      loading[shapeQname2] = true;
      setLoadingState({ status: "fetching", error: void 0 });
      const shapeNode = rdf4.sym(config.prefixMap.uriFromQname(shapeQname2));
      const loadShape = config.getShapesDocument(shapeNode);
      try {
        const shape2 = await loadShape;
        shapesMap[shapeQname2] = shape2;
        setShape(shape2);
        if (entityQname && entityQname !== "tmp:uri") {
          const index = entities.findIndex((e) => e.subjectQname === entityQname);
          if (index !== -1) {
            const newEntities = [...entities];
            newEntities[index] = {
              ...newEntities[index],
              shapeQname: shape2.qname
            };
            setEntities(newEntities);
          }
        }
        setLoadingState({ status: "fetched", error: void 0 });
      } catch (e) {
        debug5("shape error:", e);
        setLoadingState({ status: "error", error: "error fetching shape or ontology" });
      }
      loading[shapeQname2] = false;
    }
    if (current === shapeQname)
      fetchResource(shapeQname);
  }, [config, entityQname, shape, shapeQname, current, entities]);
  const retVal = shapeQname === current && shape && shapeQname == shape.qname ? { loadingState, shape, reset } : { loadingState: { status: "loading", error: void 0 }, shape: void 0, reset };
  return retVal;
}
function EntityFetcher(entityQname, shapeQname, config, unmounting = { val: false }, shapeLoaded = false) {
  const [entityLoadingState, setEntityLoadingState] = (0, import_react.useState)({ status: "idle", error: void 0 });
  const [entity, setEntity] = (0, import_react.useState)(Subject.createEmpty());
  const [uiReady, setUiReady] = (0, import_recoil3.useRecoilState)(uiReadyState);
  const [entities, setEntities] = (0, import_recoil3.useRecoilState)(entitiesAtom);
  const [sessionLoaded, setSessionLoaded] = (0, import_recoil3.useRecoilState)(sessionLoadedState);
  const [current, setCurrent] = (0, import_react.useState)(entityQname);
  const [reloadEntity, setReloadEntity] = (0, import_recoil3.useRecoilState)(reloadEntityState);
  const [disabled, setDisabled] = (0, import_recoil3.useRecoilState)(uiDisabledTabsState);
  (0, import_react.useEffect)(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (unmounting.val)
      return;
    if (current != entityQname) {
      reset();
    }
  });
  const reset = () => {
    setCurrent(entityQname);
    setEntity(Subject.createEmpty());
    setEntityLoadingState({ status: "idle", error: void 0 });
  };
  const { t } = (0, import_react_i18next.useTranslation)();
  (0, import_react.useEffect)(() => {
    if (unmounting.val)
      return;
    async function fetchResource(entityQname2) {
      setEntityLoadingState({ status: "fetching", error: void 0 });
      const entityUri = config.prefixMap.uriFromQname(entityQname2);
      const entityNode = rdf4.sym(entityUri);
      let loadRes, loadLabels, localRes, useLocal, notFound, needsSaving;
      let res = null;
      let etag = null;
      const localEntities = await config.getUserLocalEntities();
      if (reloadEntity !== entityQname2 && shapeQname && localEntities[entityQname2] !== void 0) {
        useLocal = window.confirm(t("general.load_previous_q"));
        const store = rdf4.graph();
        if (useLocal) {
          try {
            rdf4.parse(localEntities[entityQname2].ttl, store, rdf4.Store.defaultGraphURI, "text/turtle");
            etag = localEntities[entityQname2].etag;
            needsSaving = localEntities[entityQname2].needsSaving;
            debug5("nS:", needsSaving);
          } catch (e) {
            debug5(e);
            debug5(localEntities[entityQname2]);
            window.alert(import_i18next.default.t("local_load_fail"));
            useLocal = false;
            delete localEntities[entityQname2];
          }
        } else {
          rdf4.parse("", store, rdf4.Store.defaultGraphURI, "text/turtle");
        }
        const subject = new Subject(entityNode, new EntityGraph(
          store,
          entityUri,
          config.prefixMap,
          void 0,
          void 0,
          config.descriptionProperties
        ));
        res = { subject, etag };
      }
      try {
        if (!useLocal) {
          res = await config.getDocument(entityNode);
          needsSaving = false;
        }
      } catch (e) {
        notFound = true;
      }
      let _entities = entities;
      if (!sessionLoaded) {
        const obj = await config.getUserMenuState();
        if (obj) {
          _entities = [];
          for (const k of Object.keys(obj)) {
            _entities.push({
              subjectQname: k,
              subject: null,
              shapeQname: obj[k].shapeQname,
              subjectLabelState: defaultEntityLabelAtom,
              state: 4 /* NotLoaded */,
              preloadedLabel: obj[k].preloadedLabel,
              etag: obj[k].etag,
              loadedUnsavedFromLocalStorage: true
            });
          }
        }
      }
      try {
        if (notFound)
          throw Error("not found");
        const resInfo = await config.getDocument(entityNode);
        const subject = resInfo.subject;
        etag = resInfo.etag;
        let index2 = _entities.findIndex((e) => e.subjectQname === entityQname2);
        const newEntities = [..._entities];
        if (index2 === -1) {
          newEntities.push({
            subjectQname: entityQname2,
            state: 3 /* Loading */,
            shapeQname,
            subject: null,
            subjectLabelState: defaultEntityLabelAtom,
            etag,
            loadedUnsavedFromLocalStorage: false
          });
          index2 = newEntities.length - 1;
        }
        if (index2 >= 0 && newEntities[index2] && !newEntities[index2].subject) {
          newEntities[index2] = {
            ...newEntities[index2],
            subject,
            state: 1 /* Saved */,
            subjectLabelState: subject.getAtomForProperty(prefLabel.uri),
            preloadedLabel: "",
            etag,
            ...etag ? { loadedUnsavedFromLocalStorage: needsSaving } : {}
          };
          setEntities(newEntities);
        }
        setEntityLoadingState({ status: "fetched", error: void 0 });
        setEntity(subject);
        setUiReady(true);
        if (reloadEntity)
          setReloadEntity("");
      } catch (e) {
        debug5("e:", e.message, e);
        setDisabled(false);
        setEntityLoadingState({
          status: "error",
          error: e.message !== "not found" ? "error fetching entity" : "not found"
        });
        if (!entities.length && _entities.length) {
          setEntities(_entities);
        }
      }
      if (!sessionLoaded)
        setSessionLoaded(true);
    }
    const index = entities.findIndex(
      (e) => e.subjectQname === entityQname
    );
    if (shapeLoaded && (reloadEntity === entityQname && !entities[index].subject || current === entityQname && (index === -1 || entities[index] && !entities[index].subject))) {
      fetchResource(entityQname);
    } else {
      if (unmounting.val)
        return;
      else
        setEntityLoadingState({ status: "fetched", error: void 0 });
      const subj = entities[index] ? entities[index].subject : null;
      if (unmounting.val)
        return;
      else if (subj)
        setEntity(subj);
      if (unmounting.val)
        return;
      else
        setUiReady(true);
    }
  }, [config, entities, entityQname, entity, current, shapeQname, reloadEntity, shapeLoaded]);
  const retVal = entityQname === current ? { entityLoadingState, entity, reset } : { entityLoadingState: { status: "loading", error: void 0 }, entity: Subject.createEmpty(), reset };
  return retVal;
}

// src/containers/EntityEditContainer.tsx
var import_icons_material3 = require("@mui/icons-material");

// src/containers/PropertyGroupContainer.tsx
var import_react3 = require("react");

// src/containers/ValueList.tsx
var import_react2 = __toESM(require("react"));
var rdf5 = __toESM(require("rdflib"));
var import_recoil4 = require("recoil");
var import_material = require("@mui/material");
var import_icons_material = require("@mui/icons-material");

// src/helpers/lang.ts
var import_debug6 = require("debug");
var debug6 = (0, import_debug6.debug)("rde:rdf:lang");
var ValueByLangToStrPrefLang = (vbl, prefLang) => {
  if (vbl == null)
    return "";
  if (!Array.isArray(prefLang))
    prefLang = [prefLang];
  for (const pL of prefLang) {
    if (pL in vbl)
      return vbl[pL];
  }
  const vals = Object.values(vbl);
  if (vals[0])
    return vals[0];
  return "";
};
var cache = {};
var langsWithDefault = (defaultLanguage, langs) => {
  if (defaultLanguage in cache)
    return cache[defaultLanguage];
  let res = langs.filter((l) => l.value === defaultLanguage);
  if (!res?.length) {
    debug6("can't find defaultLanguage ", defaultLanguage, " in languages");
    return langs;
  }
  res = res.concat(langs.filter((l) => l.value !== defaultLanguage));
  cache[defaultLanguage] = res;
  return res;
};

// src/containers/ValueList.tsx
var import_react_md_editor = __toESM(require("@uiw/react-md-editor"));
var import_debug7 = require("debug");
var import_react_i18next2 = require("react-i18next");
var import_jsx_runtime = require("react/jsx-runtime");
var debug7 = (0, import_debug7.debug)("rde:entity:container:ValueList");
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
var PropertyContainer = ({ property, subject, embedded, force, editable, owner, topEntity, shape, siblingsPath, config }) => {
  const [css, setCss] = (0, import_react2.useState)("");
  const setCssClass = (txt, add = true) => {
    if (add) {
      if (!css.includes(txt))
        setCss(css + txt + " ");
    } else {
      if (css.includes(txt))
        setCss(css.replace(new RegExp(txt), ""));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "main", ...css ? { className: css } : {}, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "album", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "container" + (embedded ? " px-0" : "") + " editable-" + editable,
      style: { border: "dashed 1px none" },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ValueList,
        {
          subject,
          property,
          embedded,
          force,
          editable,
          ...owner ? { owner } : {},
          ...topEntity ? { topEntity } : {},
          shape,
          siblingsPath,
          setCssClass,
          config
        }
      )
    }
  ) }) }) });
};
var MinimalAddButton = ({ add, className, disable }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "minimalAdd disable_" + disable + (className !== void 0 ? className : " text-right"),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          className: "btn btn-link ml-2 px-0",
          onClick: (ev) => add(ev, 1),
          ...disable ? { disabled: true } : {},
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.AddCircleOutline, {})
        }
      )
    }
  );
};
var BlockAddButton = ({ add, label, count = 1 }) => {
  const [n, setN] = (0, import_react2.useState)(1);
  const [disable, setDisable] = (0, import_react2.useState)(false);
  const { t } = (0, import_react_i18next2.useTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "blockAdd text-center pb-1 mt-3",
      style: { width: "100%", ...count > 1 ? { display: "flex" } : {} },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            className: "btn btn-sm btn-block btn-outline-primary px-0",
            style: {
              boxShadow: "none",
              pointerEvents: disable ? "none" : "auto",
              ...disable ? { opacity: 0.5, pointerEvents: "none" } : {}
            },
            onClick: (e) => add(e, n),
            children: [
              t("general.add_another", { val: label, count }),
              "\xA0",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.AddCircleOutline, {})
            ]
          }
        ),
        count > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_material.TextField,
          {
            variant: "standard",
            label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("general.add_nb", { val: label }) }),
            style: { width: 200 },
            value: n,
            className: "ml-2",
            type: "number",
            InputLabelProps: { shrink: true },
            onChange: (e) => setN(Number(e.target.value)),
            InputProps: { inputProps: { min: 1, max: 500 } }
          }
        )
      ]
    }
  ) });
};
var generateDefault = async (property, parent, val = "", config) => {
  switch (property.objectType) {
    case 3 /* ResExt */:
      return new ExtRDFResourceWithLabel("tmp:uri", {}, {}, null, config.prefixMap);
      break;
    case 1 /* Internal */:
      if (property.targetShape == null)
        throw "no target shape for " + property.uri;
      return config.generateSubnodes(property.targetShape, parent, 1);
      break;
    case 2 /* ResInList */:
      if (property.defaultValue)
        return new ExtRDFResourceWithLabel(property.defaultValue.value, {}, {}, null, config.prefixMap);
      if (!property.minCount)
        return noneSelected;
      const propIn = property.in;
      if (!propIn)
        throw "can't find a list for " + property.uri;
      return propIn[0];
      break;
    case 5 /* LitInList */:
      const defaultValueLiL = property.defaultValue;
      if (defaultValueLiL !== null)
        return new LiteralWithId(defaultValueLiL.value, defaultValueLiL.language, defaultValueLiL.datatype);
      if (!property.minCount) {
        const datatype2 = property.datatype?.value;
        if (datatype2 === RDF("langString").value) {
          return new LiteralWithId("", property?.defaultLanguage ? property.defaultLanguage : "bo-x-ewts");
        } else {
          return new LiteralWithId("", null, property.datatype ? property.datatype : void 0);
        }
      }
      const propInLit = property.in;
      if (!propInLit)
        throw "can't find a list for " + property.uri;
      return propInLit[0];
      break;
    case 0 /* Literal */:
    default:
      const defaultValue = property.defaultValue;
      if (defaultValue !== null)
        return new LiteralWithId(defaultValue.value, defaultValue.language, defaultValue.datatype);
      const datatype = property.datatype?.value;
      if (datatype === RDF("langString").value) {
        return new LiteralWithId("", property?.defaultLanguage ? property.defaultLanguage : "bo-x-ewts");
      } else if (datatype === XSD("integer").value) {
        return new LiteralWithId(val, null, property.datatype ? property.datatype : void 0);
      } else {
        return new LiteralWithId("", null, property.datatype ? property.datatype : void 0);
      }
      break;
  }
};
var ValueList = ({ subject, property, embedded, force, editable, owner, topEntity, shape, siblingsPath, setCssClass, config }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [unsortedList, setList] = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang);
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang);
  const [undos, setUndos] = (0, import_recoil4.useRecoilState)(uiUndosState);
  const sortOnPath = property?.sortOnProperty?.value;
  const orderedList = (0, import_recoil4.useRecoilValue)(
    orderedByPropSelector({
      atom: subject.getAtomForProperty(property.path.sparqlString),
      propertyPath: sortOnPath || ""
      //order: "desc" // default is "asc"
    })
  );
  let list = unsortedList;
  if (orderedList.length)
    list = orderedList;
  if (list === void 0)
    list = [];
  const withOrder = shape.properties.filter((p) => p.sortOnProperty?.value === property.path?.sparqlString);
  let newVal = (0, import_recoil4.useRecoilValue)(
    orderedNewValSelector({
      atom: withOrder.length && withOrder[0].path ? (topEntity ? topEntity : subject).getAtomForProperty(withOrder[0].path.sparqlString) : null,
      propertyPath: property.path.sparqlString
      //order: "desc" // default is "asc"
    })
  );
  if (newVal != "") {
    const newValNum = Number(newVal);
    if (property.minInclusive && newValNum < property.minInclusive)
      newVal = property.minInclusive.toString();
    if (property.maxInclusive && newValNum > property.maxInclusive)
      newVal = property.maxInclusive.toString();
  }
  const [getESfromRecoil, setESfromRecoil] = (0, import_recoil4.useRecoilState)(ESfromRecoilSelector({}));
  const updateEntityState = (status, id, removingFacet = false, forceRemove = false) => {
    if (id === void 0)
      throw new Error("id undefined");
    const entityQname = topEntity ? topEntity.qname : subject.qname;
    const undo = undos[config.prefixMap.uriFromQname(entityQname)];
    const hStatus = getHistoryStatus(config.prefixMap.uriFromQname(entityQname));
    setESfromRecoil({ property, subject, entityQname, undo, hStatus, status, id, removingFacet, forceRemove });
  };
  const alreadyHasEmptyValue = () => {
    if (!list)
      return false;
    for (const val of list) {
      if (val instanceof LiteralWithId && val.value === "")
        return true;
      if (val instanceof RDFResourceWithLabel && val.node.value === "tmp:none")
        return true;
    }
    return false;
  };
  const canAdd = !editable || alreadyHasEmptyValue() || property.readOnly && property.readOnly === true || property.displayPriority && property.displayPriority > 1 ? false : property.objectType != 3 /* ResExt */ && property.maxCount ? list.length < property.maxCount : true;
  const canDel = (!property.minCount || property.minCount < list.length) && !property.readOnly && editable;
  const onChange = (value, idx, removeFirst) => {
    const newList = replaceItemAtIndex(list, idx, value);
    setList(newList);
  };
  const exists = (0, import_react2.useCallback)(
    (uri) => {
      for (const val of list) {
        if (val instanceof RDFResourceWithLabel && (val.qname === uri || val.uri === uri)) {
          return true;
        }
      }
      return false;
    },
    [list]
  );
  let firstValueIsEmptyField = true;
  const setListAsync = (0, import_react2.useCallback)(async (pre = false, vals = [], solo = false) => {
    const res = await generateDefault(property, subject, newVal.toString(), config);
    if (topEntity)
      topEntity.noHisto();
    else if (owner)
      owner.noHisto();
    else
      subject.noHisto();
    if (solo)
      setList(Array.isArray(res) ? res : [res]);
    else if (vals.length)
      setList(vals.concat(Array.isArray(res) ? res : [res]));
    else if (pre)
      setList((oldList) => (Array.isArray(res) ? res : [res]).concat(oldList));
    else
      setList((oldList = []) => oldList.concat(Array.isArray(res) ? res : [res]));
  }, [property, subject, newVal, config, topEntity, owner, setList]);
  (0, import_react2.useEffect)(() => {
    if (list.length && (!property.maxCount || property.maxCount > list.length)) {
      const first = list[0];
      if (first instanceof ExtRDFResourceWithLabel && first.uri !== "tmp:uri" && first.uri !== "tmp:none")
        firstValueIsEmptyField = false;
    }
    const vals = subject.getUnitializedValues(property);
    debug7("got uninitialized values for property ", property, vals);
    if (vals && vals.length) {
      if (property.minCount && vals.length < property.minCount && (!property.maxCount || property.maxCount > list.length)) {
        setListAsync(void 0, vals);
      } else {
        debug7("set list on atom");
        setList(vals);
      }
    } else if (property.objectType != 2 /* ResInList */ && property.objectType != 5 /* LitInList */ && property.objectType != 1 /* Internal */ && (!property.displayPriority || property.displayPriority === 0 || property.displayPriority === 1 && (list.length || force)) && (property.minCount && list.length < property.minCount || !list.length || !firstValueIsEmptyField) && (!property.maxCount || property.maxCount > list.length)) {
      if (!firstValueIsEmptyField) {
        setListAsync(true);
      } else {
        setListAsync(false);
      }
    } else if (property.objectType == 1 /* Internal */ && property.minCount && list.length < property.minCount && (!property.maxCount || property.maxCount > list.length)) {
      setListAsync(true);
    } else if (property.objectType != 2 /* ResInList */ && property.objectType != 5 /* LitInList */ && property.displayPriority && property.displayPriority === 1 && list.length === 1 && !force) {
    } else if (!list.length && (property.objectType == 2 /* ResInList */ || property.objectType == 5 /* LitInList */)) {
      setListAsync(false, void 0, true);
    }
  }, [subject, list, force]);
  let addBtn = property.objectType === 1 /* Internal */;
  const isEmptyValue = (val) => {
    if (val instanceof RDFResourceWithLabel) {
      return val.uri === "tmp:uri" || val.uri === "tmp:none";
    } else if (val instanceof LiteralWithId) {
      return val.value === "";
    }
    return false;
  };
  const isErrorValue = (val) => {
    if (val instanceof LiteralWithId && errors[topEntity ? topEntity.qname : subject.qname]) {
      const errorKeys = Object.keys(errors[topEntity ? topEntity.qname : subject.qname]);
      return errorKeys.some((k) => k.endsWith(";" + val.id));
    }
    return false;
  };
  const hasNonEmptyValue = list.some((v) => !isEmptyValue(v) || isErrorValue(v));
  (0, import_react2.useEffect)(() => {
    if (setCssClass) {
      if (!hasNonEmptyValue)
        setCssClass("unset", true);
      else
        setCssClass("unset", false);
    }
  }, [hasNonEmptyValue]);
  const showLabel = !property.displayPriority || property.displayPriority === 0 || property.displayPriority === 1 && (force || list.length > 1 || hasNonEmptyValue) || property.displayPriority === 2 && (list.length >= 1 || hasNonEmptyValue);
  const scrollElem = (0, import_react2.useRef)(null);
  const [edit, setEdit] = (0, import_recoil4.useRecoilState)(uiEditState);
  (0, import_react2.useEffect)(() => {
    if (property?.group?.value !== edit && scrollElem?.current) {
      scrollElem.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [edit]);
  const hasEmptyExtEntityAsFirst = list.length > 0 && list[0] instanceof RDFResourceWithLabel && property.objectType == 3 /* ResExt */ && list[0].uri === "tmp:uri";
  const titleCase = (s) => {
    if (!s)
      return s;
    return s[0].toUpperCase() + s.substring(1);
  };
  const canPush = property.allowPushToTopLevelLabel;
  const isUniqueValueAmongSiblings = (0, import_recoil4.useRecoilValue)(
    isUniqueTestSelector({
      checkUnique: property.uniqueValueAmongSiblings,
      siblingsAtom: siblingsPath ? (owner ? owner : subject).getAtomForProperty(siblingsPath) : initListAtom,
      propertyPath: property.path.sparqlString
    })
  );
  const renderListElem = (val, i, nbvalues) => {
    if (val instanceof RDFResourceWithLabel || property.objectType == 2 /* ResInList */ || property.objectType == 5 /* LitInList */) {
      if (property.objectType == 3 /* ResExt */)
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExtEntityComponent,
          {
            subject,
            property,
            extRes: val,
            canDel: canDel && (i > 0 || !(val instanceof LiteralWithId) && val.uri !== "tmp:uri"),
            onChange,
            idx: i,
            exists,
            editable,
            ...owner ? { owner } : {},
            title: titleCase(propLabel),
            updateEntityState,
            shape,
            config
          },
          val.id + ":" + i
        );
      else if (val instanceof LiteralWithId || val instanceof RDFResourceWithLabel) {
        addBtn = false;
        const canSelectNone = i == 0 && !property.minCount || i > 0 && i == nbvalues - 1;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SelectComponent,
          {
            canSelectNone,
            subject,
            property,
            res: val,
            selectIdx: i,
            canDel: canDel && val != noneSelected,
            editable,
            create: canAdd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              Create,
              {
                subject,
                property,
                embedded,
                newVal: Number(newVal),
                shape,
                config
              }
            ) : void 0,
            updateEntityState
          },
          "select_" + val.id + "_" + i
        );
      }
    } else if (val instanceof Subject) {
      addBtn = true;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        FacetComponent,
        {
          subject,
          property,
          subNode: val,
          canDel: canDel && editable,
          ...force ? { force } : {},
          editable,
          ...topEntity ? { topEntity } : { topEntity: subject },
          updateEntityState,
          shape,
          config
        },
        val.id
      );
    } else if (val instanceof LiteralWithId) {
      addBtn = false;
      const isUniqueLang = list.filter((l) => l instanceof LiteralWithId && l.language === val.language).length === 1;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        LiteralComponent,
        {
          subject,
          property,
          lit: val,
          ...{ canDel, isUniqueLang, isUniqueValueAmongSiblings },
          create: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Create,
            {
              disable: !canAdd || !(val && val.value !== ""),
              subject,
              property,
              embedded,
              newVal: Number(newVal),
              shape,
              config
            }
          ),
          editable,
          topEntity,
          updateEntityState,
          config
        },
        val.id
      );
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "ValueList " + (property.maxCount && property.maxCount < list.length ? "maxCount" : "") + (hasNonEmptyValue ? "" : "empty") + (property.objectType === 3 /* ResExt */ ? " ResExt" : "") + (embedded ? "" : " main") + (canPush ? " canPush" : ""),
        "data-priority": property.displayPriority ? property.displayPriority : 0,
        role: "main",
        style: {
          display: "flex",
          flexWrap: "wrap",
          ...list.length > 1 && firstValueIsEmptyField && property.path.sparqlString !== SKOS("prefLabel").value ? {
            /*borderBottom: "2px solid #eee", paddingBottom: "16px"*/
          } : {}
        },
        children: [
          showLabel && (!property.in || property.in.length > 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "label",
            {
              className: "propLabel",
              "data-prop": property.qname,
              "data-type": property.objectType,
              "data-priority": property.displayPriority,
              children: [
                titleCase(propLabel),
                helpMessage && property.objectType === 3 /* ResExt */ && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help label" }) })
              ]
            }
          ),
          hasEmptyExtEntityAsFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100%" }, children: renderListElem(list[0], 0, list.length) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: scrollElem,
              className: !embedded && property.objectType !== 1 /* Internal */ ? "overFauto" : "",
              style: {
                width: "100%",
                //...!embedded && property.objectType !== ObjectType.Internal ? { maxHeight: "338px" } : {}, // overflow conflict with iframe...
                ...property?.group?.value !== edit ? { paddingRight: "0.5rem" } : {}
              },
              children: list.map((val, i) => {
                if (!hasEmptyExtEntityAsFirst || i > 0)
                  return renderListElem(val, i, list.length);
              })
            }
          )
        ]
      }
    ),
    canAdd && addBtn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Create,
      {
        subject,
        property,
        embedded,
        newVal: Number(newVal),
        shape,
        config
      }
    )
  ] });
};
var Create = ({ subject, property, embedded, disable, newVal, shape, config }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const recoilArray = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  let list = recoilArray[0];
  const setList = recoilArray[1];
  if (list === void 0)
    list = [];
  let collecNode = null;
  if (list.length === 1 && list[0] instanceof RDFResource && list[0].node && list[0].node instanceof rdf5.Collection) {
    collecNode = list[0].node;
  }
  const collec = collecNode?.termType === "Collection" ? collecNode?.elements : void 0;
  const listOrCollec = collec ? collec : list;
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const [entities, setEntities] = (0, import_recoil4.useRecoilState)(entitiesAtom);
  const [uiTab] = (0, import_recoil4.useRecoilState)(uiTabState);
  const entity = entities.findIndex((e, i) => i === uiTab);
  const [edit, setEdit] = (0, import_recoil4.useRecoilState)(uiEditState);
  let nextVal = (0, import_recoil4.useRecoilValue)(
    property.sortOnProperty ? orderedNewValSelector({
      atom: property.sortOnProperty ? subject.getAtomForProperty(property.path.sparqlString) : null,
      propertyPath: property.sortOnProperty.value
      //order: "desc" // default is "asc"
    }) : initStringAtom
  );
  const sortProps = property.targetShape?.properties.filter(
    (p) => p.path?.sparqlString === property.sortOnProperty?.value
  );
  if (sortProps?.length) {
    const sortProp = sortProps[0];
    if (sortProp?.minInclusive != null && Number(nextVal) < sortProp.minInclusive)
      nextVal = sortProp.minInclusive.toString();
    if (sortProp?.maxInclusive != null && Number(nextVal) > sortProp.maxInclusive)
      nextVal = sortProp.maxInclusive.toString();
  }
  let waitForNoHisto = false;
  const addItem = async (event, n) => {
    if (n > 1) {
      if (!property.targetShape)
        throw new Error("no target shape on " + property.qname);
      const subjects = await config.generateSubnodes(property.targetShape, subject, n);
      setList([...listOrCollec, ...subjects]);
      return;
    }
    if (waitForNoHisto)
      return;
    if (property.objectType === 1 /* Internal */) {
      waitForNoHisto = true;
      subject.noHisto(false, 1);
    }
    const item = await generateDefault(property, subject, newVal?.toString(), config);
    setList([...listOrCollec, ...Array.isArray(item) ? item : [item]]);
    if (property.objectType === 1 /* Internal */ && item instanceof Subject) {
      setImmediate(() => {
        setEdit(subject.qname + " " + property.qname + " " + item.qname);
      });
      setTimeout(() => {
        subject.noHisto(false, false);
        waitForNoHisto = false;
      }, 350);
    }
  };
  if (property.objectType !== 1 /* Internal */ && (embedded || property.objectType == 0 /* Literal */ || property.objectType == 2 /* ResInList */ || property.objectType == 5 /* LitInList */))
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimalAddButton, { disable, add: addItem, className: " " });
  else {
    const targetShapeLabels = property.targetShape?.targetClassPrefLabels;
    const labels = targetShapeLabels ? targetShapeLabels : property.prefLabels;
    const count = property.allowBatchManagement ? 2 : 1;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockAddButton, { add: addItem, label: ValueByLangToStrPrefLang(labels, uiLang), count });
  }
};
var EditLangString = ({ property, lit, onChange, label, globalError, editable, updateEntityState, entity, index, config }) => {
  const [editMD, setEditMD] = (0, import_react2.useState)(false);
  const [keyboard, setKeyboard] = (0, import_react2.useState)(false);
  const canPushPrefLabel = property.allowPushToTopLevelLabel;
  const { t } = (0, import_react_i18next2.useTranslation)();
  const getLangStringError = (val) => {
    let err = "";
    if (!val && property.minCount)
      err = t("error.empty");
    else if (globalError)
      err = globalError;
    return err;
  };
  const [error, setError] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    const newError = getLangStringError(lit.value);
    if (newError != error) {
      updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, lit.id);
      setError(newError);
    }
  });
  (0, import_react2.useEffect)(() => {
    return () => {
      const inOtherEntity = !window.location.href.includes("/" + entity.qname + "/");
      if (!inOtherEntity)
        updateEntityState(1 /* Saved */, lit.id, false, !inOtherEntity);
    };
  }, []);
  const errorData = {
    helperText: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.default.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Error, { style: { fontSize: "20px", verticalAlign: "-7px" } }),
      "\xA0",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: error })
    ] }),
    error: true
  };
  const [preview, setPreview] = (0, import_react2.useState)(null);
  (0, import_react2.useLayoutEffect)(() => {
    if (document.activeElement === inputRef.current) {
      const { value, error: error2 } = config.previewLiteral(lit, uiLang);
      if (preview !== value)
        setPreview(value);
      if (error2 !== error2)
        setError(error2);
    } else {
      if (preview !== null)
        setPreview(null);
    }
  });
  let padBot = "0px";
  if (preview) {
    padBot = "40px";
  } else if (property.singleLine && editMD) {
    padBot = "1px";
  }
  const codeEdit = { ...import_react_md_editor.commands.codeEdit, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Edit, { style: { width: "12px", height: "12px" } }) }, codePreview = { ...import_react_md_editor.commands.codePreview, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Visibility, { style: { width: "12px", height: "12px" } }) };
  const hasKB = config.possibleLiteralLangs.filter((l) => l.value === lit.language);
  const inputRef = (0, import_react2.useRef)();
  const keepFocus = () => {
    if (inputRef.current && document.activeElement != inputRef.current)
      inputRef.current.focus();
  };
  const insertChar = (str) => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd, value } = inputRef.current;
      const newValue = value.substring(0, selectionStart ? selectionStart : 0) + str + value.substring(selectionEnd ? selectionEnd : 0);
      onChange(lit.copyWithUpdatedValue(newValue));
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = (selectionStart ? selectionStart : 0) + str.length;
          inputRef.current.selectionEnd = inputRef.current.selectionStart;
        }
      }, 10);
    }
  };
  let prefLabelAtom = entity?.getAtomForProperty(SKOS("prefLabel").value);
  if (!prefLabelAtom)
    prefLabelAtom = initListAtom;
  const [prefLabels, setPrefLabels] = (0, import_recoil4.useRecoilState)(prefLabelAtom);
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const pushAsPrefLabel = () => {
    let newPrefLabels = [], found = false;
    for (const l in prefLabels) {
      if (prefLabels[l] instanceof LiteralWithId) {
        const litWi = prefLabels[l];
        if (litWi.language === lit.language) {
          found = true;
          newPrefLabels = replaceItemAtIndex(prefLabels, Number(l), lit);
          break;
        }
      }
    }
    if (!found)
      newPrefLabels = [...prefLabels, lit.copy()];
    if (newPrefLabels.length)
      setPrefLabels(newPrefLabels);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "mb-0" + (preview ? " withPreview" : ""),
      style: {
        display: "flex",
        width: "100%",
        alignItems: "flex-end",
        paddingBottom: padBot,
        position: "relative"
      },
      children: [
        canPushPrefLabel && !error && !globalError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "canPushPrefLabel", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { onClick: pushAsPrefLabel, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Use as the main name or title for this language" }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "img", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.More, { style: { position: "relative", color: "white", left: "-9px", fontSize: "18px" } }) }) }, lit.id) }) }),
        (property.singleLine || !editMD) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100%", position: "relative" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_material.TextField,
            {
              variant: "standard",
              inputRef,
              className: lit.language === "bo" ? " lang-bo" : "",
              label,
              style: { width: "100%" },
              value: lit.value,
              multiline: !property.singleLine,
              InputLabelProps: { shrink: true },
              inputProps: { spellCheck: "true", lang: lit.language === "en" ? "en_US" : lit.language },
              onChange: (e) => {
                const newError = getLangStringError(lit.value);
                if (newError && error != newError)
                  setError(newError);
                else
                  updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, lit.id);
                onChange(lit.copyWithUpdatedValue(e.target.value));
              },
              ...error ? errorData : {},
              ...!editable ? { disabled: true } : {},
              onFocus: () => {
                const { value, error: error2 } = config.previewLiteral(lit, uiLang);
                if (value !== preview)
                  setPreview(value);
                if (error2 !== error2)
                  setError(error2);
              },
              onBlur: () => {
                if (preview !== null)
                  setPreview(null);
                setTimeout(() => {
                  if (inputRef.current && document.activeElement != inputRef.current && keyboard !== false)
                    setKeyboard(false);
                }, 350);
              }
            }
          ),
          property.allowMarkDown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "span",
            {
              className: "opaHover",
              style: { position: "absolute", right: 0, top: 0, fontSize: "0px" },
              onClick: () => setEditMD(!editMD),
              children: [
                !editMD && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.FormatBold, { style: { height: "16px" } }),
                editMD && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.FormatBold, { style: { height: "16px" } })
              ]
            }
          ),
          hasKB.length > 0 && hasKB[0].keyboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              onClick: () => {
                setKeyboard(!keyboard);
                keepFocus();
              },
              className: "opaHover " + (keyboard ? "on" : ""),
              style: {
                position: "absolute",
                right: 0,
                top: "0px",
                height: "100%",
                display: "flex",
                alignItems: "center"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Keyboard, {})
            }
          ),
          hasKB.length > 0 && hasKB[0].keyboard && keyboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card px-2 py-2 hasKB", style: { display: "block", width: "405px" }, onClick: keepFocus, children: hasKB[0].keyboard.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: "card mx-1 my-1",
              style: {
                display: "inline-flex",
                width: "40px",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              },
              onClick: () => insertChar(k),
              children: k
            },
            i
          )) })
        ] }),
        !property.singleLine && editMD && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { width: "100%", position: "relative", paddingBottom: "1px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_md_editor.default,
            {
              textareaProps: { spellCheck: "true", lang: lit.language === "en" ? "en_US" : lit.language },
              value: lit.value,
              preview: "edit",
              onChange: (e) => {
                if (e)
                  onChange(lit.copyWithUpdatedValue(e));
              },
              commands: [
                import_react_md_editor.commands.bold,
                import_react_md_editor.commands.italic,
                import_react_md_editor.commands.strikethrough,
                import_react_md_editor.commands.hr,
                import_react_md_editor.commands.title,
                import_react_md_editor.commands.divider,
                import_react_md_editor.commands.link,
                import_react_md_editor.commands.quote,
                import_react_md_editor.commands.code,
                import_react_md_editor.commands.image,
                import_react_md_editor.commands.divider,
                import_react_md_editor.commands.unorderedListCommand,
                import_react_md_editor.commands.orderedListCommand,
                import_react_md_editor.commands.checkedListCommand,
                import_react_md_editor.commands.divider,
                codeEdit,
                codePreview
              ],
              extraCommands: []
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: "opaHover on",
              style: { position: "absolute", right: "5px", top: "7px", fontSize: "0px", cursor: "pointer" },
              onClick: () => setEditMD(!editMD),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.FormatBold, { style: { height: "15px" }, titleAccess: "Use rich text editor" })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          LangSelect,
          {
            onChange: (value) => {
              onChange(lit.copyWithUpdatedLanguage(value));
            },
            value: lit.language || "",
            property,
            ...error ? { error: true } : {},
            editable,
            config
          }
        ),
        preview && // TODO see if fromWylie & MD can both be used ('escape' some chars?)
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "preview-ewts", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.TextField, { disabled: true, value: preview, variant: "standard" }) })
      ]
    }
  );
};
var LangSelect = ({ onChange, value, property, disabled, error, editable, config }) => {
  const onChangeHandler = (event) => {
    onChange(event.target.value);
  };
  const languages = property?.defaultLanguage ? langsWithDefault(property.defaultLanguage, config.possibleLiteralLangs) : config.possibleLiteralLangs;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_material.TextField,
    {
      variant: "standard",
      select: true,
      InputLabelProps: { shrink: true },
      className: "ml-2",
      value,
      style: { minWidth: 100, flexShrink: 0, marginTop: "5px" },
      onChange: onChangeHandler,
      ...disabled ? { disabled: true } : {},
      ...error ? { error: true, helperText: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}) } : {},
      ...!editable ? { disabled: true } : {},
      children: [
        languages.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.MenuItem, { value: option.value, children: option.value }, option.value)),
        !languages.some((l) => l.value === value) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.MenuItem, { value, children: value }, value)
      ]
    }
  ) });
};
var EditString = ({ property, lit, onChange, label, editable, updateEntityState, entity, index, config }) => {
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const dt = property.datatype;
  const pattern = property.pattern ? new RegExp(property.pattern) : void 0;
  const [error, setError] = (0, import_react2.useState)(null);
  const [preview, setPreview] = (0, import_react2.useState)(null);
  const getPatternError = (val) => {
    let err = "";
    if (pattern !== void 0 && val !== "" && !val.match(pattern)) {
      err = ValueByLangToStrPrefLang(property.errorMessage, uiLang);
      if (!err)
        err = "pattern error";
      debug7("err:", err, property.errorMessage);
    }
    return err;
  };
  let timerPreview = 0, changeCallback = function(val) {
  };
  (0, import_react2.useEffect)(() => {
    changeCallback = (val) => {
      if (val === "") {
        setError(null);
        setPreview(null);
        updateEntityState(1 /* Saved */, lit.id);
      } else {
        if (timerPreview)
          window.clearTimeout(timerPreview);
        const delay = 350;
        timerPreview = window.setTimeout(() => {
          const obj = config.previewLiteral(new rdf5.Literal(val, lit.language, lit.datatype), uiLang);
          const { value } = obj;
          let { error: error2 } = obj;
          setPreview(value);
          if (!error2)
            error2 = getPatternError(val);
          setError(error2);
          updateEntityState(error2 ? 0 /* Error */ : 1 /* Saved */, lit.id);
        }, delay);
      }
      onChange(lit.copyWithUpdatedValue(val));
    };
  });
  const { t } = (0, import_react_i18next2.useTranslation)();
  const getEmptyStringError = (val) => {
    if (!val && property.minCount)
      return;
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Error, { style: { fontSize: "20px", verticalAlign: "-7px" } }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("error.empty") }) })
    ] });
    return null;
  };
  (0, import_react2.useEffect)(() => {
    const newError = error || getEmptyStringError(lit.value);
    if (newError != error) {
      setError(newError);
      updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, lit.id);
    }
  });
  (0, import_react2.useEffect)(() => {
    changeCallback(lit.value);
  }, [lit.value]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", width: "100%" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_material.TextField,
      {
        variant: "standard",
        label,
        style: { width: "100%" },
        value: lit.value,
        ...property.qname !== "bds:NoteShape-contentLocationStatement" ? { InputLabelProps: { shrink: true } } : {},
        onBlur: (e) => {
          if (preview !== null)
            setPreview(null);
        },
        onFocus: (e) => changeCallback(e.target.value),
        onChange: (e) => changeCallback(e.target.value),
        ...!editable ? { disabled: true } : {},
        ...error ? { error: true, helperText: error } : {}
      }
    ),
    preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "preview-EDTF", style: { width: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: preview }) })
  ] });
};
var EditBool = ({ property, lit, onChange, label, editable }) => {
  const { t } = (0, import_react_i18next2.useTranslation)();
  const dt = property.datatype;
  let val = !lit.value || lit.value == "false" || lit.value == "0" ? false : true;
  if (property.defaultValue === null && lit.value == "")
    val = "unset";
  const changeCallback = (val2) => {
    onChange(lit.copyWithUpdatedValue(val2 == "false" ? "0" : "1"));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_material.TextField,
    {
      variant: "standard",
      select: true,
      style: { padding: "1px", minWidth: "250px" },
      label,
      value: val,
      InputLabelProps: { shrink: true },
      onChange: (e) => {
        if (e.target.value != "-")
          changeCallback(e.target.value);
      },
      ...!editable ? { disabled: true } : {},
      children: ["true", "false"].concat(val === "unset" ? [val] : []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.MenuItem, { value: v, children: t("types." + v) }, v))
    }
  );
};
var EditInt = ({ property, lit, onChange, label, editable, updateEntityState, hasNoOtherValue, index, globalError }) => {
  const { t } = (0, import_react_i18next2.useTranslation)();
  const dt = property.datatype;
  const minInclusive = property.minInclusive;
  const maxInclusive = property.maxInclusive;
  const minExclusive = property.minExclusive;
  const maxExclusive = property.maxExclusive;
  const getIntError = (val) => {
    let err = "";
    if (globalError) {
      err = globalError;
    } else if (hasNoOtherValue && val === "") {
      err = t("error.empty");
    } else if (val !== void 0 && val !== "") {
      const valueInt = parseInt(val);
      if (minInclusive && minInclusive > valueInt) {
        err = t("error.superiorTo", { val: minInclusive });
      } else if (maxInclusive && maxInclusive < valueInt) {
        err = t("error.inferiorTo", { val: maxInclusive });
      } else if (minExclusive && minExclusive >= valueInt) {
        err = t("error.superiorToStrict", { val: minExclusive });
      } else if (maxExclusive && maxExclusive <= valueInt) {
        err = t("error.inferiorToStrict", { val: maxExclusive });
      }
    }
    return err;
  };
  const [error, setError] = (0, import_react2.useState)("");
  (0, import_react2.useEffect)(() => {
    if (!hasNoOtherValue && (lit.value === void 0 || lit.value === null || lit.value === ""))
      return;
    const newError = getIntError(lit.value);
    if (newError != error) {
      setError(newError);
      updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, lit.id);
    }
  });
  const changeCallback = (val) => {
    const newError = getIntError(val);
    if (newError != error)
      setError(newError);
    else
      updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, lit.id);
    if (dt && dt.value == xsdgYear) {
      if (val.startsWith("-")) {
        val = "-" + val.substring(1).padStart(4, "0");
      } else {
        val = val.padStart(4, "0");
      }
    }
    onChange(lit.copyWithUpdatedValue(val));
  };
  let value = lit.value;
  if (dt && dt.value == xsdgYear) {
    value = value.replace(/^(-?)0+/, "$1");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_material.TextField,
    {
      variant: "standard",
      label,
      style: { width: 240 },
      value,
      ...error ? {
        helperText: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.default.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Error, { style: { fontSize: "20px", verticalAlign: "-7px" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("i", { children: [
            " ",
            error
          ] })
        ] }),
        error: true
      } : {},
      type: "number",
      InputProps: { inputProps: { min: minInclusive, max: maxInclusive } },
      InputLabelProps: { shrink: true },
      onChange: (e) => changeCallback(e.target.value),
      ...!editable ? { disabled: true } : {}
    }
  );
};
var xsdgYear = XSD("gYear").value;
var rdflangString = RDF("langString").value;
var xsdinteger = XSD("integer").value;
var xsddecimal = XSD("decimal").value;
var xsdint = XSD("int").value;
var xsdboolean = XSD("boolean").value;
var intishTypeList = [xsdinteger, xsddecimal, xsdint];
var LiteralComponent = ({
  lit,
  subject,
  property,
  canDel,
  isUniqueValueAmongSiblings,
  isUniqueLang,
  create,
  editable,
  topEntity,
  updateEntityState,
  config
}) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  const index = list.findIndex((listItem) => listItem === lit);
  const [entities, setEntities] = (0, import_recoil4.useRecoilState)(entitiesAtom);
  const [undos, setUndos] = (0, import_recoil4.useRecoilState)(uiUndosState);
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang);
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang);
  const onChange = (value) => {
    const newList = replaceItemAtIndex(list, index, value);
    setList(newList);
  };
  const deleteItem = () => {
    const newList = removeItemAtIndex(list, index);
    setList(newList);
    updateEntityState(1 /* Saved */, lit.id);
  };
  (0, import_react2.useEffect)(() => {
    let error = false;
    const entityQname = topEntity ? topEntity.qname : subject.qname;
    const n = entities.findIndex((e) => e.subjectQname === entityQname);
    if (n > -1) {
      const ent = entities[n];
      if (ent.state === 0 /* Error */)
        error = true;
    }
    if (!error && (!errors[entityQname] || !Object.keys(errors[entityQname]).length)) {
      updateEntityState(1 /* Saved */, lit.id);
    }
  }, [undos]);
  const { t: tr } = (0, import_react_i18next2.useTranslation)();
  const t = property.datatype;
  let edit, classN;
  if (t?.value === rdflangString) {
    classN = "langString " + (lit.value ? "lang-" + lit.language : "");
    edit = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      EditLangString,
      {
        property,
        lit,
        onChange,
        label: [
          propLabel,
          helpMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help literal" }) }, lit.id) : null
        ],
        ...property.uniqueLang && !isUniqueLang ? { globalError: tr("error.unique") } : {},
        editable: editable && !property.readOnly,
        updateEntityState,
        entity: topEntity ? topEntity : subject,
        index,
        config
      }
    );
  } else if (t?.value === xsdgYear || t && t?.value && intishTypeList.includes(t.value)) {
    classN = "gYear intish";
    edit = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      EditInt,
      {
        property,
        lit,
        onChange,
        label: [
          propLabel,
          helpMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help literal" }) }, lit.id) : null
        ],
        editable: editable && !property.readOnly,
        updateEntityState,
        hasNoOtherValue: property.minCount === 1 && list.length === 1,
        index,
        ...property.uniqueValueAmongSiblings && !isUniqueValueAmongSiblings ? { globalError: tr("error.uniqueV") } : {}
      }
    );
  } else if (t?.value === xsdboolean) {
    edit = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      EditBool,
      {
        property,
        lit,
        onChange,
        label: [
          propLabel,
          helpMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help literal" }) }, lit.id) : null
        ],
        editable: editable && !property.readOnly
      }
    );
  } else {
    edit = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      EditString,
      {
        property,
        lit,
        onChange,
        label: [
          propLabel,
          helpMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help literal" }) }, lit.id) : null
        ],
        editable: editable && !property.readOnly,
        updateEntityState,
        entity: subject,
        index,
        config
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: classN, style: {
    display: "flex",
    alignItems: "flex-end"
    /*, width: "100%"*/
  }, children: [
    edit,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hoverPart", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          className: "btn btn-link ml-2 px-0 py-0 close-facet-btn",
          onClick: deleteItem,
          ...!canDel ? { disabled: true } : {},
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.RemoveCircleOutline, { className: "my-0 close-facet-btn" })
        }
      ),
      create
    ] })
  ] }) });
};
var FacetComponent = ({
  subNode,
  subject,
  property,
  canDel,
  /*force,*/
  editable,
  topEntity,
  updateEntityState,
  shape,
  config
}) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const index = list.findIndex((listItem) => listItem === subNode);
  const [entities, setEntities] = (0, import_recoil4.useRecoilState)(entitiesAtom);
  const deleteItem = () => {
    updateEntityState(1 /* Saved */, subNode.qname, true);
    const newList = removeItemAtIndex(list, index);
    setList(newList);
  };
  const targetShape = property.targetShape;
  if (!targetShape)
    throw "unable to find target shape of " + property.lname;
  const withDisplayPriority = [], withoutDisplayPriority = [];
  targetShape.properties.map((subprop) => {
    if (subprop.displayPriority && subprop.displayPriority >= 1) {
      withDisplayPriority.push(subprop);
    } else {
      withoutDisplayPriority.push(subprop);
    }
  });
  const [force, setForce] = (0, import_react2.useState)(false);
  const hasExtra = withDisplayPriority.length > 0;
  let waitForNoHisto = false;
  const toggleExtra = () => {
    if (waitForNoHisto)
      return;
    waitForNoHisto = true;
    subject.noHisto(false, -1);
    setForce(!force);
    const delay = 350;
    setTimeout(() => {
      subject.noHisto(false, false);
      subject.resetNoHisto();
      waitForNoHisto = false;
    }, delay);
  };
  const [edit, setEdit] = (0, import_recoil4.useRecoilState)(uiEditState);
  let editClass = "";
  if (edit === subject.qname + " " + property.qname + " " + subNode.qname || edit.startsWith(subNode.qname + " ") || edit.endsWith(" " + subject.qname)) {
    editClass = "edit";
  }
  const { t } = (0, import_react_i18next2.useTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "facet " + editClass + " editable-" + editable + " force-" + force,
      onClick: (ev) => {
        setEdit(subject.qname + " " + property.qname + " " + subNode.qname);
        const target = ev.target;
        if (editClass || target?.classList && !target?.classList?.contains("close-facet-btn")) {
          ev.stopPropagation();
        }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card pt-2 pb-3 pr-3 mt-4 pl-2 " + (hasExtra ? "hasDisplayPriority" : ""), children: [
        targetShape.independentIdentifiers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "internalId", children: subNode.lname }),
        withoutDisplayPriority.map((p, index2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PropertyContainer,
          {
            property: p,
            subject: subNode,
            embedded: true,
            force,
            editable: !p.readOnly,
            owner: subject,
            topEntity,
            shape,
            siblingsPath: property.path?.sparqlString,
            config
          },
          index2 + p.uri
        )),
        withDisplayPriority.map((p, index2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PropertyContainer,
          {
            property: p,
            subject: subNode,
            embedded: true,
            force,
            editable: !p.readOnly,
            owner: subject,
            topEntity,
            shape,
            siblingsPath: property.path?.sparqlString,
            config
          },
          index2 + p.uri
        )),
        hasExtra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "toggle-btn btn btn-rouge mt-4", onClick: toggleExtra, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("general.toggle", { show: force ? t("general.hide") : t("general.show") }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "close-btn", children: [
          targetShape.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: ValueByLangToStrPrefLang(targetShape.description, uiLang), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              className: "btn btn-link ml-2 px-0 close-facet-btn py-0",
              onClick: deleteItem,
              ...!canDel ? { disabled: true } : {},
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Close, { className: "close-facet-btn my-1" })
            }
          )
        ] })
      ] })
    }
  ) });
};
var ExtEntityComponent = ({
  extRes,
  subject,
  property,
  canDel,
  onChange,
  idx,
  exists,
  editable,
  owner,
  title,
  updateEntityState,
  shape,
  config
}) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  const index = list.findIndex((listItem) => listItem === extRes);
  const [entities, setEntities] = (0, import_recoil4.useRecoilState)(entitiesAtom);
  const deleteItem = () => {
    let newList = removeItemAtIndex(list, index);
    if (idx === 1 && newList.length === 1) {
      const first = newList[0];
      if (first instanceof ExtRDFResourceWithLabel && first.uri === "tmp:uri")
        newList = [];
    }
    setList(newList);
  };
  const [error, setError] = (0, import_react2.useState)("");
  const { t } = (0, import_react_i18next2.useTranslation)();
  (0, import_react2.useEffect)(() => {
    let newError;
    const nonEmptyList = list.filter((e) => e instanceof RDFResource && e.uri !== "tmp:uri");
    if (property.minCount && nonEmptyList.length < property.minCount) {
      newError = t("error.minC", { count: property.minCount });
    } else if (property.maxCount && nonEmptyList.length > property.maxCount) {
      newError = t("error.maxC", { count: property.maxCount });
    } else
      newError = "";
    setError(newError);
    updateEntityState(newError ? 0 /* Error */ : 1 /* Saved */, property.qname);
  }, [list]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "extEntity" + (extRes.uri === "tmp:uri" ? " new" : ""), style: { position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        ...extRes.uri !== "tmp:uri" ? {
          display: "inline-flex",
          width: "auto",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          border: "1px solid #ccc",
          flexDirection: "row",
          position: "static"
        } : {
          display: "flex"
        }
      },
      ...extRes.uri !== "tmp:uri" ? { className: "px-2 py-1 mr-2 mt-2 card" } : {},
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          config.resourceSelector,
          {
            value: extRes,
            onChange,
            property,
            idx,
            exists,
            subject,
            editable,
            ...owner ? { owner } : {},
            title,
            globalError: error,
            updateEntityState,
            shape,
            config
          }
        ),
        extRes.uri !== "tmp:uri" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-link ml-2 px-0", onClick: deleteItem, ...!canDel ? { disabled: true } : {}, children: extRes.uri === "tmp:uri" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.RemoveCircleOutline, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Close, {}) })
      ]
    }
  ) });
};
var SelectComponent = ({ res, subject, property, canDel, canSelectNone, selectIdx, editable, create, updateEntityState }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = (0, import_recoil4.useRecoilState)(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang, setUiLang] = (0, import_recoil4.useRecoilState)(uiLangState);
  const [uiLitLang, setUiLitLang] = (0, import_recoil4.useRecoilState)(uiLitLangState);
  const [entities, setEntities] = (0, import_recoil4.useRecoilState)(entitiesAtom);
  const [uiTab] = (0, import_recoil4.useRecoilState)(uiTabState);
  const entity = entities.findIndex((e, i) => i === uiTab);
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang);
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLitLang);
  let possibleValues = property.in;
  if (possibleValues == null)
    throw "can't find possible list for " + property.uri;
  if (canSelectNone)
    possibleValues = [noneSelected, ...possibleValues];
  const index = selectIdx;
  const deleteItem = () => {
    const newList = removeItemAtIndex(list, index);
    setList(newList);
  };
  const getElementFromValue = (value, checkActualValue = false) => {
    if (possibleValues === null)
      return null;
    for (const v of possibleValues) {
      if (v.id === value || checkActualValue && v.value === value) {
        return v;
      }
    }
    debug7("error cannot get element from value " + value);
    return null;
  };
  const val = res instanceof RDFResourceWithLabel ? res : getElementFromValue(list[index].value, true);
  const onChange = (event) => {
    const resForNewValue = getElementFromValue(event.target.value);
    if (resForNewValue == null) {
      throw "getting value from SelectComponent that's not in the list of possible values " + event.target.value;
    }
    let newList;
    if (resForNewValue == noneSelected && canDel) {
      newList = removeItemAtIndex(list, index);
    } else {
      newList = replaceItemAtIndex(list, index, resForNewValue);
    }
    setList(newList);
  };
  if (possibleValues.length == 1 && list.length == 0) {
    setList([possibleValues[0]]);
  }
  const { t } = (0, import_react_i18next2.useTranslation)();
  const [error, setError] = (0, import_react2.useState)("");
  const valueNotInList = !possibleValues.some((pv) => pv.id === val?.id);
  (0, import_react2.useEffect)(() => {
    if (valueNotInList) {
      setError("" + t("error.select", { val: val?.value }));
      updateEntityState(0 /* Error */, property.path?.sparqlString + "_" + selectIdx);
    } else {
      updateEntityState(1 /* Saved */, property.path?.sparqlString + "_" + selectIdx);
    }
  }, [valueNotInList]);
  (0, import_react2.useEffect)(() => {
    return () => {
      const inOtherEntity = !window.location.href.includes("/" + entities[entity]?.subjectQname + "/");
      if (!inOtherEntity)
        updateEntityState(1 /* Saved */, property.path?.sparqlString + "_" + selectIdx, false, !inOtherEntity);
    };
  }, []);
  if (possibleValues.length > 1 || error) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "resSelect", style: { display: "inline-flex", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_material.TextField,
        {
          variant: "standard",
          select: true,
          className: "selector mr-2",
          value: val?.id,
          style: { padding: "1px", minWidth: "250px" },
          onChange,
          label: [
            propLabel,
            // ? propLabel : "[unlabelled]",
            helpMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: helpMessage, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Help, { className: "help" }) }, "tooltip_" + selectIdx + "_" + index) : null
          ],
          ...error ? {
            helperText: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.default.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Error, { style: { fontSize: "20px", verticalAlign: "-7px" } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("i", { children: [
                " ",
                error
              ] })
            ] }),
            error: true
          } : {},
          ...!editable ? { disabled: true } : {},
          children: [
            possibleValues.map((v, k) => {
              if (v instanceof RDFResourceWithLabel) {
                const r = v;
                const label = ValueByLangToStrPrefLang(r.prefLabels, uiLang);
                const span = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label ? label : r.qname });
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.MenuItem, { value: r.id, className: "withDescription", children: r.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Tooltip, { title: ValueByLangToStrPrefLang(r.description, uiLang), children: span }) : span }, "menu-uri_" + selectIdx + r.id);
              } else {
                const l = v;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_material.MenuItem,
                  {
                    value: l.id,
                    className: "withDescription",
                    children: l.value
                  },
                  "menu-lit_" + selectIdx + l.id + "_" + index + "_" + k
                );
              }
            }),
            valueNotInList && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_material.MenuItem,
              {
                value: val?.id,
                className: "withDescription",
                style: { color: "red" },
                disabled: true,
                children: val?.value
              },
              "extra-val-id"
            )
          ]
        },
        "textfield_" + selectIdx + "_" + index
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hoverPart", children: [
        canDel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-link mx-0 px-0 py-0", onClick: deleteItem, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.RemoveCircleOutline, {}) }),
        create
      ] })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};

// src/containers/PropertyGroupContainer.tsx
var import_icons_material2 = require("@mui/icons-material");
var import_recoil5 = require("recoil");
var import_react_leaflet = require("react-leaflet");
var import_react_leaflet_google_layer = __toESM(require("react-leaflet-google-layer"));
var import_leaflet_geosearch = require("leaflet-geosearch");
var import_leaflet = __toESM(require("leaflet"));
var import_leaflet2 = require("leaflet/dist/leaflet.css");
var import_geosearch = require("leaflet-geosearch/dist/geosearch.css");
var import_debug8 = require("debug");
var import_react_i18next3 = require("react-i18next");
var import_jsx_runtime2 = require("react/jsx-runtime");
var debug8 = (0, import_debug8.debug)("rde:entity:propertygroup");
var redIcon = new import_leaflet.default.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  // eslint-disable-line no-magic-numbers
  iconAnchor: [12, 41],
  // eslint-disable-line no-magic-numbers
  popupAnchor: [1, -34],
  // eslint-disable-line no-magic-numbers
  shadowSize: [41, 41]
  // eslint-disable-line no-magic-numbers
});
function DraggableMarker({
  pos,
  icon,
  setCoords
}) {
  const [position, setPosition] = (0, import_react3.useState)(pos);
  const markerRef = (0, import_react3.useRef)(null);
  const eventHandlers = (0, import_react3.useMemo)(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setCoords(marker.getLatLng());
        }
      }
    }),
    []
  );
  (0, import_react3.useEffect)(() => {
    if (markerRef.current && (markerRef.current.lat != pos.lat || markerRef.current.lng != pos.lng)) {
      markerRef.current.setLatLng(pos);
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.Marker, { draggable: true, eventHandlers, position, icon, ref: markerRef });
}
var MapEventHandler = ({
  coords,
  redraw,
  setCoords,
  config
}) => {
  const map = (0, import_react_leaflet.useMapEvents)({
    click: (ev) => {
      debug8("click:", ev);
      setCoords(ev.latlng);
    }
  });
  (0, import_react3.useEffect)(() => {
    map.setView(coords, map.getZoom());
  });
  (0, import_react3.useEffect)(() => {
    const provider = config.googleMapsAPIKey ? new import_leaflet_geosearch.GoogleProvider({ apiKey: config.googleMapsAPIKey }) : new import_leaflet_geosearch.OpenStreetMapProvider();
    const searchControl = (0, import_leaflet_geosearch.GeoSearchControl)({
      provider,
      showPopUp: false,
      showMarker: false
    });
    map.addControl(searchControl);
    map.on("geosearch/showlocation", (params) => {
      const elem = document.querySelector(".leaflet-container");
      if (elem)
        elem.click();
    });
    map.removeControl(searchControl);
  }, []);
  return null;
};
var PropertyGroupContainer = ({ group, subject, onGroupOpen, shape, GISatoms, config }) => {
  const [uiLang] = (0, import_recoil5.useRecoilState)(uiLangState);
  const label = ValueByLangToStrPrefLang(group.prefLabels, uiLang);
  const [force, setForce] = (0, import_react3.useState)(false);
  const { t } = (0, import_react_i18next3.useTranslation)();
  const withDisplayPriority = [], withoutDisplayPriority = [];
  const errorKeys = Object.keys(errors[subject.qname] ? errors[subject.qname] : {});
  let hasError = false;
  group.properties.map((property) => {
    if (!hasError && errorKeys.some((k) => k.includes(property.qname)) || property.targetShape?.properties.some((p) => errorKeys.some((k) => k.includes(p.qname)))) {
      hasError = true;
    }
    if (property.displayPriority && property.displayPriority >= 1) {
      withDisplayPriority.push(property);
    } else {
      withoutDisplayPriority.push(property);
    }
  });
  const hasExtra = withDisplayPriority.length > 0;
  const toggleExtra = () => {
    setForce(!force);
  };
  const [edit, setEdit] = (0, import_recoil5.useRecoilState)(uiEditState);
  const [groupEd, setGroupEd] = (0, import_recoil5.useRecoilState)(uiGroupState);
  const [lat, setLat] = (0, import_recoil5.useRecoilState)(config.latProp ? subject.getAtomForProperty(config.latProp.value) : initListAtom);
  const [lng, setLng] = (0, import_recoil5.useRecoilState)(config.lngProp ? subject.getAtomForProperty(config.lngProp.value) : initListAtom);
  const [redraw, setRedraw] = (0, import_react3.useState)(false);
  let coords, zoom = 5, unset = false;
  if (lat.length && lng.length && lat[0].value != "" && lng[0].value != "" && !isNaN(Number(lat[0].value)) && !isNaN(Number(lng[0].value)))
    coords = new import_leaflet.default.LatLng(Number(lat[0].value), Number(lng[0].value));
  else {
    unset = true;
    coords = new import_leaflet.default.LatLng(30, 0);
    zoom = 2;
  }
  (0, import_react3.useEffect)(() => {
    setRedraw(true);
  }, [lng, lat]);
  const setCoords = (val) => {
    setRedraw(false);
    if (!isNaN(val.lat)) {
      if (lat.length > 0 && lat[0] instanceof LiteralWithId)
        setLat([lat[0].copyWithUpdatedValue("" + val.lat.toFixed(6))]);
      if (lat.length == 0)
        setLat([new LiteralWithId("" + val.lat.toFixed(6))]);
    }
    if (!isNaN(val.lng)) {
      if (lng.length > 0 && lng[0] instanceof LiteralWithId)
        setLng([lng[0].copyWithUpdatedValue("" + val.lng.toFixed(6))]);
      if (lng.length == 0)
        setLng([new LiteralWithId("" + val.lat.toFixed(6))]);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      role: "main",
      className: "group " + (hasError ? "hasError" : ""),
      id: group.qname,
      style: { scrollMargin: "90px" },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "album", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "container col-lg-6 col-md-6 col-sm-12", style: { border: "dashed 1px none" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: "row card my-2 pb-3" + (edit === group.qname ? " group-edit" : "") + " show-displayPriority-" + force,
          onClick: (e) => {
            if (onGroupOpen && groupEd !== group.qname)
              onGroupOpen(e, groupEd);
            setEdit(group.qname);
            setGroupEd(group.qname);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "", children: [
              label,
              hasError && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons_material2.Error, {})
            ] }),
            //groupEd === group.qname && ( // WIP, good idea but breaks undo initialization
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: group.properties.length <= 1 ? "hidePropLabel" : "", style: { fontSize: 0 }, children: [
              withoutDisplayPriority.map((property, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                PropertyContainer,
                {
                  property,
                  subject,
                  editable: property.readOnly !== true,
                  shape,
                  config
                },
                index
              )),
              withDisplayPriority.map((property, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                PropertyContainer,
                {
                  property,
                  subject,
                  force,
                  editable: property.readOnly !== true,
                  shape,
                  config
                },
                index
              )),
              config.gisPropertyGroup && group.uri === config.gisPropertyGroup.value && groupEd === group.qname && // to force updating map when switching between two place entities
              coords && // TODO: add a property in shape to enable this instead
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { position: "relative", overflow: "hidden", marginTop: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_leaflet.MapContainer, { style: { width: "100%", height: "400px" }, zoom, center: coords, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_leaflet.LayersControl, { position: "topright", children: [
                  config.googleMapsAPIKey && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.LayersControl.BaseLayer, { checked: true, name: "Satellite+Roadmap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet_google_layer.default, { apiKey: config.googleMapsAPIKey, type: "hybrid" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.LayersControl.BaseLayer, { name: "Satellite", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet_google_layer.default, { apiKey: config.googleMapsAPIKey, type: "satellite" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.LayersControl.BaseLayer, { name: "Roadmap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet_google_layer.default, { apiKey: config.googleMapsAPIKey, type: "roadmap" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.LayersControl.BaseLayer, { name: "Terrain", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet_google_layer.default, { apiKey: config.googleMapsAPIKey, type: "terrain" }) })
                  ] }),
                  !config.googleMapsAPIKey && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.LayersControl.BaseLayer, { checked: true, name: "OpenStreetMap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_leaflet.TileLayer, { url: "https://{s}.tile.iosb.fraunhofer.de/tiles/osmde/{z}/{x}/{y}.png" }) })
                ] }),
                !unset && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DraggableMarker, { pos: coords, icon: redIcon, setCoords }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MapEventHandler, { coords, redraw, setCoords, config })
              ] }) }),
              hasExtra && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "toggle-btn  btn btn-rouge my-4", onClick: toggleExtra, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: t("general.toggle", { show: force ? t("general.hide") : t("general.show") }) }) })
            ] }) })
          ]
        }
      ) }) })
    }
  );
};
var PropertyGroupContainer_default = PropertyGroupContainer;

// src/containers/EntityEditContainer.tsx
var import_recoil6 = require("recoil");
var rdf6 = __toESM(require("rdflib"));
var import_react_router_dom = require("react-router-dom");
var import_react_router_dom2 = require("react-router-dom");
var import_query_string = __toESM(require("query-string"));
var import_react_router = require("react-router");
var import_debug9 = require("debug");
var import_react_i18next4 = require("react-i18next");
var import_jsx_runtime3 = require("react/jsx-runtime");
var debug9 = (0, import_debug9.debug)("rde:entity:edit");
function replaceItemAtIndex2(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function EntityEditContainerMayUpdate(props) {
  const params = (0, import_react_router.useParams)();
  const location = (0, import_react_router.useLocation)();
  const shapeQname = params.shapeQname;
  const entityQname = params.entityQname;
  const subjectQname = params.subjectQname;
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const [entities, setEntities] = (0, import_recoil6.useRecoilState)(entitiesAtom);
  const snapshot = (0, import_recoil6.useRecoilSnapshot)();
  const [subject, setSubject] = (0, import_react4.useState)(null);
  const { copy } = import_query_string.default.parse(location.search, { decode: false });
  (0, import_react4.useEffect)(() => {
    const i = entities.findIndex((e) => e.subjectQname === subjectQname);
    let subj;
    if (i === -1)
      return;
    if (subnodeQname) {
      const pp = getParentPath(
        props.config.prefixMap.uriFromQname(subjectQname),
        props.config.prefixMap.uriFromQname(subnodeQname)
      );
      if (pp.length > 1 && i >= 0) {
        const atom3 = entities[i].subject?.getAtomForProperty(pp[1]);
        if (!atom3) {
          setSubject(null);
          return;
        }
        subj = snapshot.getLoadable(atom3).contents;
        if (Array.isArray(subj)) {
          subj = subj.filter((s) => s.qname === subnodeQname);
          if (subj.length)
            subj = subj[0];
          else
            throw new Error("subnode not found: " + subnodeQname);
        }
        setSubject(subj);
      }
    } else {
      subj = entities[i].subject;
      setSubject(subj);
    }
  }, []);
  if (subject && propertyQname && entityQname && index) {
    const propsForCall = { ...props, copy };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      EntityEditContainerDoUpdate,
      {
        subject,
        propertyQname,
        objectQname: entityQname,
        index: Number(index),
        copy,
        ...props
      }
    );
  } else if (subject != null)
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Navigate, { to: "/edit/" + entityQname + "/" + shapeQname });
  else
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {});
}
function EntityEditContainerDoUpdate(props) {
  const config = props.config;
  const params = (0, import_react_router.useParams)();
  const shapeQname = params.shapeQname;
  const atom3 = props.subject.getAtomForProperty(props.config.prefixMap.uriFromQname(props.propertyQname));
  const [list, setList] = (0, import_recoil6.useRecoilState)(atom3);
  const [entities, setEntities] = (0, import_recoil6.useRecoilState)(entitiesAtom);
  const i = entities.findIndex((e) => e.subjectQname === props.objectQname);
  const subject = entities[i]?.subject;
  let copy = null;
  if (props.copy && typeof props.copy === "string") {
    copy = props.copy.split(";").reduce((acc, p) => {
      const q = p.split(",");
      const literals = q.slice(1).map((v) => {
        const lit = decodeURIComponent(v).split("@");
        return new LiteralWithId(lit[0].replace(/(^")|("$)/g, ""), lit[1], rdfLangString);
      });
      return { ...acc, [q[0]]: literals };
    }, {});
  }
  const [getProp, setProp] = (0, import_recoil6.useRecoilState)(
    toCopySelector({
      list: subject && copy ? Object.keys(copy).map((p) => ({
        property: p,
        atom: subject.getAtomForProperty(config.prefixMap.uriFromQname(p))
      })) : void 0
    })
  );
  debug9("LIST:", list, atom3, props.copy, copy);
  (0, import_react4.useEffect)(() => {
    if (copy) {
      setTimeout(() => {
        if (copy) {
          const p = [];
          for (const k of Object.keys(copy)) {
            p.push({ k, val: copy[k] });
          }
          setProp(p);
        }
      }, 1150);
    }
    const newObject = new ExtRDFResourceWithLabel(props.config.prefixMap.uriFromQname(props.objectQname), {}, {}, null, props.config.prefixMap);
    const newList = replaceItemAtIndex2(list, props.index, newObject);
    setList(newList);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Navigate, { to: "/edit/" + props.objectQname + "/" + shapeQname });
}
function EntityEditContainer(props) {
  const config = props.config;
  const params = (0, import_react_router.useParams)();
  const { t } = (0, import_react_i18next4.useTranslation)();
  const shapeQname = props.shapeQname || params.shapeQname || "";
  const entityQname = props.entityQname || params.entityQname || "";
  const [entities, setEntities] = (0, import_recoil6.useRecoilState)(entitiesAtom);
  const [uiLang] = (0, import_recoil6.useRecoilState)(uiLangState);
  const [edit, setEdit] = (0, import_recoil6.useRecoilState)(uiEditState);
  const [groupEd, setGroupEd] = (0, import_recoil6.useRecoilState)(uiGroupState);
  const [undos, setUndos] = (0, import_recoil6.useRecoilState)(uiUndosState);
  const [tab, setTab] = (0, import_recoil6.useRecoilState)(uiTabState);
  const entityObj = entities.filter(
    (e) => e.subjectQname === entityQname
  );
  const icon = config.iconFromEntity(entityObj.length ? entityObj[0] : null);
  const { loadingState, shape } = ShapeFetcher(shapeQname, entityQname, config);
  const canPushPrefLabelGroups = shape?.groups.reduce(
    (acc, group) => {
      const _props = group.properties.filter((p) => p.allowPushToTopLevelLabel).map((p) => {
        if (entityObj && entityObj[0] && entityObj[0].subject && p.path)
          return entityObj[0].subject.getAtomForProperty(p.path.sparqlString);
      }).filter((a) => a != void 0);
      const subprops = group.properties.reduce(
        (accG, p) => {
          const allowPush = p.targetShape?.properties.filter((s) => s.allowPushToTopLevelLabel).map((s) => s.path?.sparqlString);
          if (allowPush?.length && entityObj && entityObj[0] && entityObj[0].subject && p.path)
            return {
              ...accG,
              [p.qname]: { atom: entityObj[0].subject.getAtomForProperty(p.path.sparqlString), allowPush }
            };
          return accG;
        },
        {}
      );
      if (_props?.length || Object.keys(subprops).length)
        return { ...acc, [group.qname]: { props: _props, subprops } };
      return { ...acc };
    },
    {}
  );
  const possiblePrefLabels = (0, import_recoil6.useRecoilValue)(
    canPushPrefLabelGroups ? possiblePrefLabelsSelector({ canPushPrefLabelGroups }) : initMapAtom
  );
  let prefLabelAtom = entityObj[0]?.subject?.getAtomForProperty(SKOS("prefLabel").value);
  if (!prefLabelAtom)
    prefLabelAtom = initListAtom;
  const [prefLabels, setPrefLabels] = (0, import_recoil6.useRecoilState)(prefLabelAtom);
  let altLabelAtom = entityObj[0]?.subject?.getAtomForProperty(SKOS("altLabel").value);
  if (!altLabelAtom)
    altLabelAtom = initListAtom;
  const altLabels = (0, import_recoil6.useRecoilValue)(altLabelAtom);
  (0, import_react4.useEffect)(() => {
    entities.map((e, i) => {
      if (e.subjectQname === entityQname) {
        if (tab != i) {
          setTab(i);
          return;
        }
      }
    });
  }, [entities]);
  let init = 0;
  (0, import_react4.useEffect)(() => {
    const delay = 350;
    let n = -1;
    const entityUri = props.config.prefixMap.uriFromQname(entityQname);
    if (init)
      clearInterval(init);
    init = window.setInterval(() => {
      if (history[entityUri]) {
        if (history[entityUri].some((h) => h["tmp:allValuesLoaded"])) {
          clearInterval(init);
        } else if (n === history[entityUri].length) {
          clearInterval(init);
          history[entityUri].push({ "tmp:allValuesLoaded": true });
          setUndos({ ...undos, [entityUri]: noUndoRedo });
        } else {
          n = history[entityUri].length;
        }
      }
    }, delay);
  }, [entities, tab, entityQname]);
  const save = (0, import_react4.useCallback)(
    (obj) => {
      return new Promise(async (resolve) => {
        if ([2 /* NeedsSaving */, 0 /* Error */].includes(obj[0]?.state)) {
          const defaultRef = new rdf6.NamedNode(rdf6.Store.defaultGraphURI);
          const store = new rdf6.Store();
          props.config.prefixMap.setDefaultPrefixes(store);
          obj[0]?.subject?.graph.addNewValuestoStore(store);
          rdf6.serialize(defaultRef, store, void 0, "text/turtle", async function(err, str) {
            if (err || !str) {
              debug9(err, store);
              throw "error when serializing";
            }
            const shape2 = obj[0]?.shapeQname;
            config.setUserLocalEntity(
              obj[0].subjectQname,
              shape2,
              str,
              false,
              obj[0].etag,
              obj[0].state === 2 /* NeedsSaving */
            );
            resolve(true);
          });
        }
      });
    },
    [entityQname, shapeQname, entityObj]
  );
  const entityObjRef = (0, import_react4.useRef)(entityObj);
  (0, import_react4.useEffect)(() => {
    if (entityObjRef.current?.length && entityObj?.length) {
      if (entityObjRef.current[0]?.subjectQname != entityObj[0]?.subjectQname) {
        save(entityObjRef.current);
      }
    }
  });
  (0, import_react4.useEffect)(() => {
    return () => {
      const fun = async () => {
        if (entityObjRef.current) {
          debug9("unmounting /edit", entityObjRef.current);
          await save(entityObjRef.current);
        }
      };
      fun();
    };
  }, []);
  const [warning, setWarning] = (0, import_react4.useState)(() => (event) => {
  });
  (0, import_react4.useEffect)(() => {
    const willSave = [];
    for (const e of entities) {
      if (e.state !== 1 /* Saved */ && e.state !== 4 /* NotLoaded */) {
        willSave.push(e);
      }
    }
    if (willSave.length) {
      window.removeEventListener("beforeunload", warning, true);
      setWarning(() => async (event) => {
        for (const w of willSave) {
          await save([w]);
        }
        event.preventDefault();
        event.returnValue = "";
      });
    } else {
      window.removeEventListener("beforeunload", warning, true);
      setWarning(() => (event) => {
      });
    }
  }, [entities]);
  (0, import_react4.useEffect)(() => {
    window.addEventListener("beforeunload", warning, true);
  }, [warning]);
  const { entityLoadingState, entity } = EntityFetcher(
    entityQname,
    shapeQname,
    config,
    void 0,
    loadingState.status === "fetched" ? true : false
  );
  if (loadingState.status === "error" || entityLoadingState.status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-center text-muted", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material3.BrokenImage, { className: "icon mr-2" }),
      loadingState.error,
      entityLoadingState.error
    ] });
  }
  if (loadingState.status === "fetching" || entityLoadingState.status === "fetching" || !entity || entity.isEmpty()) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: t("types.loading") }) }) }) });
  }
  if (!shape || !entity)
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: t("types.loading") }) }) }) });
  const shapeLabel = ValueByLangToStrPrefLang(shape.targetClassPrefLabels, uiLang);
  const checkPushNameAsPrefLabel = (e, currentGroupName) => {
    if (possiblePrefLabels && possiblePrefLabels[currentGroupName]?.length) {
      const newLabels = [...prefLabels];
      for (const n of possiblePrefLabels[currentGroupName]) {
        if (n instanceof LiteralWithId && !newLabels.some((l) => l instanceof LiteralWithId && sameLanguage(l.language, n.language)) && !altLabels.some((l) => l instanceof LiteralWithId && sameLanguage(l.language, n.language)))
          newLabels.push(n);
      }
      if (newLabels.length != prefLabels.length)
        setPrefLabels(newLabels);
    }
    setEdit("");
    setGroupEd("");
    e.stopPropagation();
  };
  const previewLink = config.getPreviewLink(entity.node);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react4.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { role: "main", className: "pt-4", style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "header " + icon?.toLowerCase().replace(/(.*?[/])?([^/]+)\.[^.]+/, "$2"), ...!icon ? { "data-shape": shape.qname } : {}, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "shape-icon" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { children: shapeLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: entity.qname }),
        previewLink && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "buda-link", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "a",
          {
            className: "btn-rouge" + (!entityObj[0]?.etag ? " disabled" : ""),
            target: "_blank",
            rel: "noreferrer",
            ...!entityObj[0]?.etag ? { title: t("error.preview") } : { href: previewLink },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: t("general.preview") })
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { role: "navigation", className: "innerNav", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-uppercase small my-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: t("home.nav") }) }),
      shape.groups.map((group, index) => {
        const label = ValueByLangToStrPrefLang(group.prefLabels, uiLang);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_react_router_dom2.Link,
          {
            to: "#" + group.qname,
            onClick: () => {
              setGroupEd(group.qname);
              setEdit(group.qname);
            },
            className: groupEd === group.qname ? "on" : "",
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: label })
          },
          "lk" + group.qname
        );
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: shape.groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react4.default.Fragment, { children: [
      groupEd === group.qname && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: "group-edit-BG",
          onClick: (e) => checkPushNameAsPrefLabel(e, group.qname)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        PropertyGroupContainer_default,
        {
          group,
          subject: entity,
          onGroupOpen: checkPushNameAsPrefLabel,
          shape,
          config
        },
        "pg" + group.qname
      )
    ] }, "rf" + group.qname)) })
  ] });
}
var EntityEditContainer_default = EntityEditContainer;

// src/containers/NewEntityContainer.tsx
var import_react5 = require("react");
var import_recoil7 = require("recoil");
var import_react_router_dom3 = require("react-router-dom");
var import_react_i18next5 = require("react-i18next");
var import_material2 = require("@mui/material");
var import_debug10 = __toESM(require("debug"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var debug10 = (0, import_debug10.default)("rde:rdf:new");
function NewEntityContainer(props) {
  const config = props.config || {};
  const [uiLang] = (0, import_recoil7.useRecoilState)(uiLangState);
  const [RID, setRID] = (0, import_react5.useState)("");
  const navigate = (0, import_react_router_dom3.useNavigate)();
  const { t } = (0, import_react_i18next5.useTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "new-fix", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: "New entity:" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_material2.TextField,
        {
          variant: "standard",
          select: true,
          helperText: "List of all possible shapes",
          id: "shapeSelec",
          className: "shapeSelector",
          value: config.possibleShapeRefs[0].qname,
          style: { marginTop: "3px", marginLeft: "10px" },
          children: config.possibleShapeRefs.map((shape, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_material2.MenuItem, { value: shape.qname, style: { padding: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_router_dom3.Link, { to: "/new/" + shape.qname, className: "popLink", children: ValueByLangToStrPrefLang(shape.prefLabels, uiLang) }) }, shape.qname))
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "baseline" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { marginRight: "10px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: "Load entity:" }),
        " "
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_material2.TextField,
        {
          variant: "standard",
          style: { width: "100%" },
          value: RID,
          InputLabelProps: { shrink: true },
          onChange: (e) => setRID(e.target.value),
          helperText: "select an entity to load here by its RID",
          onKeyDown: (event) => {
            if (event.key === "Enter")
              navigate("/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase());
          }
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_react_router_dom3.Link,
        {
          to: "/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase(),
          className: "btn btn-sm btn-outline-primary py-3 ml-2 lookup btn-rouge " + (!RID ? "disabled" : ""),
          style: { boxShadow: "none", alignSelf: "center", marginBottom: "15px" },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: t("search.open") })
        }
      ) })
    ] })
  ] });
}
var NewEntityContainer_default = NewEntityContainer;

// src/containers/EntityCreationContainer.tsx
var import_recoil8 = require("recoil");

// src/containers/Dialog.tsx
var import_react6 = __toESM(require("react"));
var import_react_router_dom4 = require("react-router-dom");
var import_material3 = require("@mui/material");
var import_debug11 = require("debug");
var import_jsx_runtime5 = require("react/jsx-runtime");
var debug11 = (0, import_debug11.debug)("rde:entity:dialog");
function Dialog422(props) {
  const [open, setOpen] = import_react6.default.useState(props.open);
  const shape = props.shaped.split(":")[1]?.replace(/Shape$/, "");
  const [createNew, setCreateNew] = (0, import_react6.useState)(false);
  const [loadNamed, setLoadNamed] = (0, import_react6.useState)(false);
  debug11("422:", props);
  const handleLoad = () => {
    setLoadNamed(true);
    setOpen(false);
  };
  const handleNew = () => {
    setCreateNew(true);
    setOpen(false);
  };
  if (createNew)
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_router_dom4.Navigate, { to: props.newUrl });
  else if (loadNamed)
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_router_dom4.Navigate, { to: props.editUrl });
  else
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.Dialog, { open, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.DialogTitle, { children: [
        shape,
        " ",
        props.named,
        " has already been created"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_material3.DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.DialogContentText, { children: [
        "Do you want to use it, or to create a new ",
        shape,
        " with another RID instead?"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.DialogActions, { style: { justifyContent: "space-around" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.Button, { className: "btn-rouge", onClick: handleLoad, color: "primary", children: [
          "Use\xA0",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { textTransform: "none" }, children: props.named })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_material3.Button, { className: "btn-rouge", onClick: handleNew, color: "primary", children: [
          "Create\xA0",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { textTransform: "none" }, children: shape }),
          "\xA0with another RID"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {})
    ] }) });
}

// src/containers/EntityCreationContainer.tsx
var import_react_router_dom5 = require("react-router-dom");
var import_react7 = require("react");
var import_icons_material4 = require("@mui/icons-material");
var import_i18next2 = __toESM(require("i18next"));
var import_query_string2 = __toESM(require("query-string"));
var rdf7 = __toESM(require("rdflib"));
var import_debug12 = require("debug");
var import_react_i18next6 = require("react-i18next");
var import_jsx_runtime6 = require("react/jsx-runtime");
var debug12 = (0, import_debug12.debug)("rde:entity:entitycreation");
function EntityCreationContainer(props) {
  const config = props.config;
  const params = (0, import_react_router_dom5.useParams)();
  const subjectQname = params.subjectQname;
  const shapeQname = params.shapeQname || "";
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const entityQname = params.entityQname || "";
  const location = (0, import_react_router_dom5.useLocation)();
  const { t } = (0, import_react_i18next6.useTranslation)();
  const unmounting = { val: false };
  (0, import_react7.useEffect)(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  const shapeNode = rdf7.sym(config.prefixMap.uriFromQname(shapeQname));
  const entityNode = entityQname ? rdf7.sym(config.prefixMap.uriFromQname(entityQname)) : null;
  const { entityLoadingState, entity } = unmounting.val ? { entityLoadingState: { status: "idle", error: void 0 }, entity: null } : config.entityCreator(shapeNode, entityNode, unmounting);
  if (entityLoadingState.error === "422" && entity) {
    const editUrl = subjectQname && propertyQname && index != void 0 ? "/edit/" + entityQname + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "") : "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname;
    const newUrl = location.pathname.replace(/\/named\/.*/, "") + location.search;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Dialog422, { open: true, shaped: shapeQname, named: entityQname, editUrl, newUrl });
  } else if (entity) {
    if (subjectQname && propertyQname && index != void 0)
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_react_router_dom5.Navigate,
        {
          to: "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "")
        }
      );
    else
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_router_dom5.Navigate, { to: "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname });
  }
  if (entityLoadingState.status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-center text-muted", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_icons_material4.BrokenImage, { className: "icon mr-2" }),
      entityLoadingState.error
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: t("types.creating") }) }) }) });
}
function EntityCreationContainerAlreadyOpen(props) {
  const params = (0, import_react_router_dom5.useParams)();
  const subjectQname = params.subjectQname;
  const shapeQname = params.shapeQname;
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const entityQname = params.entityQname;
  const unmounting = { val: false };
  (0, import_react7.useEffect)(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  if (subjectQname && propertyQname && index != void 0)
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_react_router_dom5.Navigate,
      {
        to: "/edit/" + entityQname + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "")
      }
    );
  else
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react_router_dom5.Navigate, { to: "/edit/" + entityQname + "/" + shapeQname });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: import_i18next2.default.t("types.loading") }) }) }) });
}
function EntityCreationContainerRoute(props) {
  const params = (0, import_react_router_dom5.useParams)();
  const [entities, setEntities] = (0, import_recoil8.useRecoilState)(entitiesAtom);
  const i = entities.findIndex((e) => e.subjectQname === params.entityQname);
  const theEntity = entities[i];
  const location = (0, import_react_router_dom5.useLocation)();
  const { copy } = import_query_string2.default.parse(location.search, { decode: false });
  if (theEntity)
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EntityCreationContainerAlreadyOpen, { ...props, copy });
  else
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EntityCreationContainer, { ...props, copy });
}
var EntityCreationContainer_default = EntityCreationContainer;

// src/containers/EntityShapeChooserContainer.tsx
var import_react8 = require("react");
var import_i18next3 = __toESM(require("i18next"));
var import_recoil9 = require("recoil");
var import_react_router_dom6 = require("react-router-dom");
var import_material4 = require("@mui/material");
var import_debug13 = require("debug");
var import_react_i18next7 = require("react-i18next");
var import_jsx_runtime7 = require("react/jsx-runtime");
var debug13 = (0, import_debug13.debug)("rde:entity:shape");
function EntityShapeChooserContainer(props) {
  const config = props.config;
  const params = (0, import_react_router_dom6.useParams)();
  const navigate = (0, import_react_router_dom6.useNavigate)();
  const [entityQname, setEntityQname] = (0, import_react8.useState)(params.entityQname || "");
  const [uiLang] = (0, import_recoil9.useRecoilState)(uiLangState);
  const [entities, setEntities] = (0, import_recoil9.useRecoilState)(entitiesAtom);
  const { t } = (0, import_react_i18next7.useTranslation)();
  const unmounting = { val: false };
  (0, import_react8.useEffect)(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  (0, import_react8.useEffect)(() => {
    if (unmounting.val)
      return;
    else if (params.entityQname)
      setEntityQname(params.entityQname);
  }, [params]);
  const entityFromList = entities.find((e) => e.subjectQname === entityQname);
  if (entityFromList && entityFromList.shapeQname) {
    const shapeQname = entityFromList.shapeQname;
    navigate("/edit/" + entityQname + "/" + shapeQname, { replace: true });
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("types.redirect") }) }) });
  }
  const { entityLoadingState, entity } = EntityFetcher(entityQname, "", config, unmounting, true);
  if (entity) {
    const possibleShapes = config.possibleShapeRefsForEntity(entity.node);
    if (entityLoadingState.status === "fetching") {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("types.loading") }) }) });
    } else if (entityLoadingState.error === "not found") {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "error", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("error.exist", { id: entityQname }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_router_dom6.Link, { style: { fontWeight: 700 }, to: "/new", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("error.redirect") }) })
      ] }) });
    } else if (!possibleShapes) {
      debug13("cannot find", entity, entityLoadingState);
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "error", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("error.shape", { id: entityQname }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_router_dom6.Link, { style: { fontWeight: 700 }, to: "/new", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: import_i18next3.default.t("error.redirect") }) })
      ] }) });
    }
    if (possibleShapes.length > 1) {
      const handleClick = (event, shape) => {
        const newEntities = [...entities];
        for (const i in newEntities) {
          const e = newEntities[i];
          if (e.subjectQname === entityQname) {
            newEntities[i] = { ...e, shapeQname: shape.qname };
            setEntities(newEntities);
            break;
          }
        }
      };
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "centered-ctn", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("b", { children: "Choose a shape:" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          import_material4.TextField,
          {
            variant: "standard",
            select: true,
            helperText: "List of all possible shapes",
            id: "shapeSelec",
            className: "shapeSelector",
            value: config.possibleShapeRefs[0]?.qname,
            style: { marginTop: "3px", marginLeft: "10px" },
            children: config.possibleShapeRefs.map((shape, index) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_material4.MenuItem, { value: shape.qname, style: { padding: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              import_react_router_dom6.Link,
              {
                to: "/edit/" + entityQname + "/" + shape?.qname,
                className: "popLink",
                onClick: (ev) => handleClick(ev, shape),
                children: ValueByLangToStrPrefLang(shape.prefLabels, uiLang)
              }
            ) }, shape.qname))
          }
        )
      ] }) });
    } else if (possibleShapes[0]?.qname) {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_router_dom6.Navigate, { to: "/edit/" + entityQname + "/" + possibleShapes[0]?.qname });
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: t("types.loading") }) }) }) });
}
var EntityShapeChooserContainer_default = EntityShapeChooserContainer;

// src/containers/EntitySelectorContainer.tsx
var import_react9 = require("react");
var import_icons_material6 = require("@mui/icons-material");
var import_recoil11 = require("recoil");
var import_react_router_dom8 = require("react-router-dom");
var import_material6 = require("@mui/material");

// src/containers/EntityInEntitySelectorContainer.tsx
var import_recoil10 = require("recoil");
var import_react_router_dom7 = require("react-router-dom");
var import_material5 = require("@mui/material");
var import_icons_material5 = require("@mui/icons-material");
var import_debug14 = require("debug");
var import_jsx_runtime8 = require("react/jsx-runtime");
var debug14 = (0, import_debug14.debug)("rde:entity:selector");
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
var EntityInEntitySelectorContainer = ({
  entity,
  index,
  config
}) => {
  const [uiLitLang] = (0, import_recoil10.useRecoilState)(uiLitLangState);
  const [labelValues] = (0, import_recoil10.useRecoilState)(!entity.preloadedLabel ? entity.subjectLabelState : defaultEntityLabelAtom);
  const [tab, setTab] = (0, import_recoil10.useRecoilState)(uiTabState);
  const [entities, setEntities] = (0, import_recoil10.useRecoilState)(entitiesAtom);
  const [disabled, setDisabled] = (0, import_recoil10.useRecoilState)(uiDisabledTabsState);
  const [popupOn, setPopupOn] = (0, import_recoil10.useRecoilState)(savePopupState);
  const navigate = (0, import_react_router_dom7.useNavigate)();
  const prefLabels = labelValues ? RDFResource.valuesByLang(labelValues) : null;
  const label = !entity.preloadedLabel ? ValueByLangToStrPrefLang(prefLabels, uiLitLang) : entity.preloadedLabel;
  const icon = config.iconFromEntity(entity);
  const shapeQname = entity.shapeQname ? entity.shapeQname : entities[index] && entities[index].shapeQname ? entities[index].shapeQname : null;
  const link = "/edit/" + entity.subjectQname + (shapeQname ? "/" + shapeQname : "");
  const allLoaded = entities.reduce((acc, e) => acc && e.state !== 3 /* Loading */, true);
  const handleClick = (event, newTab) => {
    if (newTab !== tab) {
      setDisabled(true);
      setTab(newTab);
      setPopupOn(false);
    }
  };
  const closeEntity = async (ev) => {
    ev.persist();
    if (entity.state === 2 /* NeedsSaving */ || entity.state === 0 /* Error */) {
      const go = window.confirm("unsaved data will be lost");
      if (!go)
        return;
    }
    config.setUserMenuState(
      entity.subjectQname,
      shapeQname,
      !entity.preloadedLabel ? label && entity.subject?.lname ? entity.subject?.lname : label : entity.preloadedLabel,
      true,
      null
    );
    await config.setUserLocalEntity(entity.subjectQname, shapeQname, "", true, entity.etag, false);
    if (history) {
      const uri = config.prefixMap.uriFromQname(entity.subjectQname);
      if (history[uri])
        delete history[uri];
    }
    ev.preventDefault();
    ev.stopPropagation();
    const newList = [...entities.filter((e, i) => i !== index)];
    setEntities(newList);
    if (index === tab) {
      setTab(-1);
      navigate("/");
    } else if (tab <= newList.length && tab !== -1) {
      const newIndex = newList.findIndex((e) => e.subjectQname === entities[index].subjectQname);
      setTab(newIndex);
    } else {
      setTab(-1);
    }
    return false;
  };
  config.setUserMenuState(
    entity.subjectQname,
    shapeQname,
    !entity.preloadedLabel ? entity.subject?.lname ? entity.subject?.lname : label : entity.preloadedLabel,
    false,
    entity.etag
  );
  debug14("state:", entity.state, entity.subjectQname);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_material5.Tab,
    {
      ...a11yProps(index),
      className: index === tab ? "Mui-selected" : "",
      onClick: (e) => handleClick(e, index),
      ...disabled ? { disabled: true } : {},
      label: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_react_router_dom7.Link, { to: link, children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "img",
            {
              className: "entity-type",
              src: icon
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { style: { marginLeft: 30, marginRight: "auto", textAlign: "left" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: label && label != "..." ? label : entity.subject?.lname ? entity.subject.lname : label }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "RID", children: entity.subjectQname })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "state state-" + entity.state }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_icons_material5.Close, { className: "close-facet-btn", onClick: closeEntity })
      ] })
    },
    entity.subjectQname
  ) });
};

// src/containers/EntitySelectorContainer.tsx
var import_debug15 = require("debug");
var import_react_i18next8 = require("react-i18next");
var import_jsx_runtime9 = require("react/jsx-runtime");
var debug15 = (0, import_debug15.debug)("rde:entity:selector");
function a11yProps2(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
function EntitySelector(props) {
  const config = props.config;
  const [entities, setEntities] = (0, import_recoil11.useRecoilState)(entitiesAtom);
  const [sessionLoaded, setSessionLoaded] = (0, import_recoil11.useRecoilState)(sessionLoadedState);
  const [uiLang] = (0, import_recoil11.useRecoilState)(uiLangState);
  const [tab, setTab] = (0, import_recoil11.useRecoilState)(uiTabState);
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  const [edit, setEdit] = (0, import_recoil11.useRecoilState)(uiEditState);
  const [groupEd, setGroupEd] = (0, import_recoil11.useRecoilState)(uiGroupState);
  const [disabled, setDisabled] = (0, import_recoil11.useRecoilState)(uiDisabledTabsState);
  const navigate = (0, import_react_router_dom8.useNavigate)();
  const location = (0, import_react_router_dom8.useLocation)();
  const { t } = (0, import_react_i18next8.useTranslation)();
  (0, import_react9.useEffect)(() => {
    const session = config.getUserMenuState();
    session.then((entities2) => {
      if (!entities2)
        return;
      const newEntities = [];
      for (const k of Object.keys(entities2)) {
        newEntities.push({
          subjectQname: k,
          subject: null,
          shapeQname: entities2[k].shapeQname,
          subjectLabelState: defaultEntityLabelAtom,
          state: 4 /* NotLoaded */,
          preloadedLabel: entities2[k].preloadedLabel,
          etag: entities2[k].etag,
          loadedUnsavedFromLocalStorage: true
        });
      }
      if (newEntities.length) {
        setEntities(newEntities);
      }
      if (!sessionLoaded)
        setSessionLoaded(true);
      if (location?.pathname == "/new")
        setTab(newEntities.length);
      if (location?.pathname.startsWith("/edit/")) {
        const id = location.pathname.split("/")[2];
        let found = false;
        newEntities.map((e, i) => {
          if (e.subjectQname === id) {
            found = true;
            setTab(i);
          }
        });
        if (!found)
          setTab(newEntities.length);
      }
    });
  }, []);
  const closeEntities = async (ev) => {
    let warn = false;
    for (const entity of entities) {
      if (entity.state === 2 /* NeedsSaving */ || entity.state === 0 /* Error */) {
        warn = true;
        break;
      }
    }
    if (warn) {
      const go = window.confirm("unsaved data will be lost");
      if (!go)
        return;
    }
    for (const entity of entities) {
      const shapeQname = entity.shapeQname;
      await config.setUserMenuState(entity.subjectQname, shapeQname, "", true, null);
      await config.setUserLocalEntity(entity.subjectQname, shapeQname, "", true, entity.etag, false);
      if (history) {
        const uri = config.prefixMap.uriFromQname(entity.subjectQname);
        if (history[uri])
          delete history[uri];
      }
    }
    setEntities([]);
    setTab(-1);
    navigate("/");
    return false;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: "tabs-select",
      onClick: () => {
        setEdit("");
        setGroupEd("");
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "Edition" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("h4", { children: [
          "Open entities",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { title: t("general.close"), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_icons_material6.Close, { className: "close-facet-btn", onClick: closeEntities }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_material6.Tabs, { value: tab === -1 ? false : tab, onChange: handleChange, "aria-label": "entities", children: [
          entities.map((entity, index) => {
            return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(EntityInEntitySelectorContainer, { entity, index, config }, index);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            import_material6.Tab,
            {
              ...a11yProps2(entities.length),
              id: "new-load",
              label: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_router_dom8.Link, { to: "/new", className: "btn-rouge", onClick: () => setDisabled(false), children: "NEW / LOAD" })
            },
            "new"
          )
        ] })
      ]
    }
  );
}
var EntitySelectorContainer_default = EntitySelector;

// src/containers/BottomBarContainer.tsx
var import_react11 = __toESM(require("react"));
var import_material7 = require("@mui/material");
var import_recoil13 = require("recoil");
var rdf8 = __toESM(require("rdflib"));
var import_debug17 = require("debug");
var import_icons_material7 = require("@mui/icons-material");
var import_react_i18next9 = require("react-i18next");

// src/helpers/observer.tsx
var import_react10 = require("react");
var import_recoil12 = require("recoil");
var import_debug16 = __toESM(require("debug"));
var import_jsx_runtime10 = require("react/jsx-runtime");
var debug16 = (0, import_debug16.default)("rde:obs");
var undoRef = null;
var redoRef = null;
var ctrlDown = false;
document.onkeydown = (e) => {
  ctrlDown = e.metaKey || e.ctrlKey;
  const key = e.key?.toLowerCase();
  if (ctrlDown && (key === "z" || key === "y")) {
    debug16("UNDO/REDO", undoRef?.current, redoRef?.current);
    if (!e.shiftKey) {
      if (key === "z")
        document.querySelector(".bottom.navbar > div:first-child > button:first-child")?.click();
      else if (key === "y")
        document.querySelector(".bottom.navbar > div:first-child > button:last-child")?.click();
    } else if (key === "z")
      document.querySelector(".bottom.navbar > div:first-child > button:last-child")?.click();
    const elem = document.activeElement;
    if (elem)
      elem.blur();
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
};
var GotoButton = ({ label, subject, undo, setUndo, propFromParentPath }) => {
  const entityUri = subject.uri;
  const which = label === "UNDO" ? "prev" : "next";
  const [list, setList] = (0, import_recoil12.useRecoilState)(
    subject.getAtomForProperty(
      propFromParentPath ? propFromParentPath : undo[which].parentPath.length && undo[which].parentPath[0] === entityUri ? undo[which].parentPath[1] : undo[which].propertyPath
    )
  );
  const disabled = !undo[which].enabled;
  const previousValues = (entityUri2, subjectUri, pathString, idx) => {
    const histo = history[entityUri2], prevUndo = {
      ...noUndoRedo,
      next: { enabled: true, subjectUri, propertyPath: pathString, parentPath: undo[which].parentPath }
    };
    let vals = [];
    if (histo && histo.length > idx) {
      const first = histo.findIndex((h) => h["tmp:allValuesLoaded"]);
      histo[idx]["tmp:undone"] = true;
      for (let j = idx - 1; j >= 0; j--) {
        if (histo[j] && histo[j][subjectUri] && histo[j][subjectUri][pathString]) {
          vals = histo[j][subjectUri][pathString];
          break;
        }
      }
      if (first >= 0 && idx > first) {
        const parentPath = histo[idx - 1]["tmp:parentPath"] || [];
        for (const subj of Object.keys(histo[idx - 1])) {
          for (const prop of Object.keys(histo[idx - 1][subj])) {
            if (["tmp:parentPath", "tmp:undone"].includes(prop))
              continue;
            prevUndo.prev = { enabled: true, subjectUri: subj, propertyPath: prop, parentPath };
            break;
          }
          if (prevUndo.prev.enabled)
            break;
        }
      }
    }
    return { vals, prevUndo };
  };
  const nextValues = (entityUri2, subjectUri, pathString, idx) => {
    const histo = history[entityUri2], nextUndo = {
      ...noUndoRedo,
      prev: { enabled: true, subjectUri, propertyPath: pathString, parentPath: undo[which].parentPath }
    };
    let vals = [];
    if (histo && histo.length > idx) {
      for (let j = idx; j < histo.length; j++) {
        if (histo[j] && histo[j][subjectUri] && histo[j][subjectUri][pathString]) {
          vals = histo[j][subjectUri][pathString];
          delete histo[j]["tmp:undone"];
          break;
        }
      }
      if (idx < histo.length - 1) {
        const parentPath = histo[idx + 1]["tmp:parentPath"] || [];
        for (const subj of Object.keys(histo[idx + 1])) {
          for (const prop of Object.keys(histo[idx + 1][subj])) {
            if (["tmp:parentPath", "tmp:undone"].includes(prop))
              continue;
            nextUndo.next = { enabled: true, subjectUri: subj, propertyPath: prop, parentPath };
            break;
          }
          if (nextUndo.next.enabled)
            break;
        }
      }
    }
    return { vals, nextUndo };
  };
  const clickHandler = () => {
    if (disabled)
      return;
    const entityUri2 = undo[which].parentPath.length ? undo[which].parentPath[0] : subject.uri;
    if (entityUri2) {
      let idx = history[entityUri2].findIndex((h) => h["tmp:undone"]) - 1 + (label === "REDO" ? 1 : 0);
      if (idx < 0)
        idx = history[entityUri2].length - 1;
      if (history[entityUri2][idx]) {
        if (label === "UNDO") {
          const { vals, prevUndo } = previousValues(entityUri2, undo[which].subjectUri, undo[which].propertyPath, idx);
          subject.noHisto(true);
          setList(vals);
          setUndo(prevUndo);
        } else if (label === "REDO") {
          const { vals, nextUndo } = nextValues(entityUri2, undo[which].subjectUri, undo[which].propertyPath, idx);
          subject.noHisto(true);
          setList(vals);
          setUndo(nextUndo);
        }
      }
    }
  };
  if (undo[which].parentPath.length && entityUri !== undo[which].subjectUri) {
    const subnode = list.filter((l) => l instanceof Subject && l.uri === undo[which].subjectUri);
    if (subnode.length) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(GotoButton, { label, undo, setUndo, subject: subnode[0] });
    } else {
      const midnode = list.filter((l) => l instanceof Subject && undo[which].parentPath.includes(l.uri));
      if (midnode.length) {
        const s = midnode[0];
        const p = undo[which].parentPath.findIndex((h) => h === s.uri);
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          GotoButton,
          {
            label,
            undo,
            setUndo,
            subject: s,
            propFromParentPath: undo[which].parentPath[p + 1]
          }
        );
      } else {
        return null;
      }
    }
  }
  const ref = (0, import_react10.createRef)();
  if (label === "UNDO")
    undoRef = ref;
  else if (label === "REDO")
    redoRef = ref;
  debug16(label + " button:", entityUri, undo[which], undoRef?.current, redoRef?.current);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "button",
    {
      ref,
      disabled,
      className: "btn btn-sm btn-danger mx-1 icon undo-btn btn-blanc",
      onClick: clickHandler,
      children: label
    },
    label
  );
};
var undoTimer = 0;
var HistoryHandler = ({ entityUri }) => {
  const [entities, setEntities] = (0, import_recoil12.useRecoilState)(entitiesAtom);
  const [uiTab] = (0, import_recoil12.useRecoilState)(uiTabState);
  const [undos, setUndos] = (0, import_recoil12.useRecoilState)(uiUndosState);
  const undo = undos[entityUri];
  const setUndo = (s) => setUndos({ ...undos, [entityUri]: s });
  const entity = entities.findIndex((e, i) => i === uiTab);
  const [disabled, setDisabled] = (0, import_recoil12.useRecoilState)(uiDisabledTabsState);
  (0, import_react10.useEffect)(() => {
    clearInterval(undoTimer);
    const delay = 150;
    undoTimer = window.setInterval(() => {
      if (!history[entityUri])
        return;
      const { top, first, current } = getHistoryStatus(entityUri);
      if (first === -1)
        return;
      if (disabled)
        setDisabled(false);
      if (history[entityUri][history[entityUri].length - 1]["tmp:allValuesLoaded"]) {
        if (!sameUndo(undo, noUndoRedo)) {
          setUndo(noUndoRedo);
        }
      } else {
        if (first !== -1) {
          if (current < 0 && first < top) {
            if (history[entityUri][top][entityUri]) {
              const prop = Object.keys(history[entityUri][top][entityUri]);
              if (prop && prop.length && entities[entity].subject !== null) {
                const newUndo = {
                  prev: { enabled: true, subjectUri: entityUri, propertyPath: prop[0], parentPath: [] },
                  next: noUndo
                };
                if (!sameUndo(undo, newUndo)) {
                  setUndo(newUndo);
                }
              }
            } else {
              const parentPath = history[entityUri][top]["tmp:parentPath"];
              if (parentPath && parentPath[0] === entityUri) {
                const sub = Object.keys(history[entityUri][top]).filter(
                  (k) => !["tmp:parentPath", "tmp:undone"].includes(k)
                );
                if (sub && sub.length) {
                  const prop = Object.keys(history[entityUri][top][sub[0]]);
                  if (prop && prop.length && entities[entity].subject !== null) {
                    const newUndo = {
                      next: noUndo,
                      prev: { enabled: true, subjectUri: sub[0], propertyPath: prop[0], parentPath }
                    };
                    if (!sameUndo(undo, newUndo)) {
                      setUndo(newUndo);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, delay);
    return () => {
      clearInterval(undoTimer);
    };
  }, [disabled, entities, undos, uiTab]);
  if (!entities[uiTab])
    return null;
  const subject = entities[uiTab].subject;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "small text-muted", children: [
    subject && undo && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(GotoButton, { label: "UNDO", subject, undo, setUndo }),
    subject && undo && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(GotoButton, { label: "REDO", subject, undo, setUndo })
  ] });
};

// src/containers/BottomBarContainer.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var debug17 = (0, import_debug17.debug)("rde:BottomBarContainer");
function BottomBarContainer(props) {
  const [entities, setEntities] = (0, import_recoil13.useRecoilState)(entitiesAtom);
  const [uiTab] = (0, import_recoil13.useRecoilState)(uiTabState);
  const entity = entities.findIndex((e, i) => i === uiTab);
  const entitySubj = entities[entity]?.subject;
  const entityUri = entities[entity]?.subject?.uri || "tmp:uri";
  const [message, setMessage] = (0, import_react11.useState)(null);
  const [uiLang, setUiLang] = (0, import_recoil13.useRecoilState)(uiLangState);
  const [lang, setLang] = (0, import_react11.useState)(uiLang);
  const [saving, setSaving] = (0, import_react11.useState)(false);
  const [gen, setGen] = (0, import_react11.useState)(false);
  const [popupOn, setPopupOn] = (0, import_recoil13.useRecoilState)(savePopupState);
  const [reloadEntity, setReloadEntity] = (0, import_recoil13.useRecoilState)(reloadEntityState);
  const shapeQname = entities[entity]?.shapeQname;
  const [error, setError] = (0, import_react11.useState)(null);
  const [errorCode, setErrorCode] = (0, import_react11.useState)(void 0);
  const [spinner, setSpinner] = (0, import_react11.useState)(false);
  const { t } = (0, import_react_i18next9.useTranslation)();
  const delay = 300;
  const closePopup = (delay1 = delay, delay2 = delay) => {
    setTimeout(() => {
      setPopupOn(false);
      setTimeout(() => {
        setSaving(false);
        setMessage(null);
        setGen(false);
        setError(null);
        setErrorCode(void 0);
        setSpinner(false);
      }, delay2);
    }, delay1);
  };
  const closePopupHandler = (event) => {
    closePopup();
  };
  const save = async (event) => {
    if (entities[entity].state === 0 /* Error */ && !saving) {
      if (!window.confirm(t("error.force")))
        return;
    }
    if (!saving) {
      setPopupOn(true);
      setSaving(true);
      return;
    }
    const store = new rdf8.Store();
    props.config.prefixMap.setDefaultPrefixes(store);
    entitySubj?.graph.addNewValuestoStore(store);
    rdf8.serialize(defaultGraphNode, store, void 0, "text/turtle", async function(err, str) {
      if (err) {
        debug17(err, store);
        throw "error when serializing";
      }
      props.config.setUserLocalEntity(
        entities[entity].subjectQname,
        shapeQname,
        str,
        false,
        entities[entity].etag,
        entities[entity].state === 2 /* NeedsSaving */
      );
    });
    let etag = null;
    if (entitySubj) {
      try {
        setSpinner(true);
        etag = await props.config.putDocument(
          entitySubj.node,
          store,
          entities[entity]?.etag,
          '"' + message + '"@' + lang
        );
        setSpinner(false);
        const defaultRef = new rdf8.NamedNode(rdf8.Store.defaultGraphURI);
        rdf8.serialize(defaultRef, store, void 0, "text/turtle", async function(err, str) {
          props.config.setUserLocalEntity(entities[entity].subjectQname, shapeQname, str, false, etag, false);
        });
      } catch (error2) {
        debug17("error:", error2);
        if (error2.status === 412) {
          setErrorCode(error2.status);
          setError(
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_react11.default.Fragment, { children: [
              t("error.newer"),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
              t("error.lost")
            ] })
          );
        } else {
          setError(error2.status ? error2.status : error2.message ? error2.message : error2);
        }
        setSpinner(false);
        return;
      }
    }
    const newEntities = [...entities];
    newEntities[entity] = {
      ...newEntities[entity],
      state: 1 /* Saved */,
      etag,
      loadedUnsavedFromLocalStorage: false
    };
    setEntities(newEntities);
    history[entityUri] = history[entityUri].filter((h) => !h["tmp:allValuesLoaded"]);
    history[entityUri].push({ "tmp:allValuesLoaded": true });
    newEntities[entity].subject?.resetNoHisto();
    closePopup();
  };
  const onLangChangeHandler = (event) => {
    setLang(event.target.value);
  };
  const onMessageChangeHandler = (event) => {
    setMessage(event.target.value);
  };
  const saved = entities[entity] && [1 /* Saved */, 4 /* NotLoaded */, 3 /* Loading */].includes(entities[entity].state);
  const handleReload = () => {
    if (history && history[entityUri])
      delete history[entityUri];
    const newEntities = [...entities];
    newEntities[entity] = { ...newEntities[entity], subject: null };
    setEntities(newEntities);
    if (entitySubj)
      setReloadEntity(entitySubj.qname);
    closePopup();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("nav", { className: "bottom navbar navbar-dark navbar-expand-md", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    props.extraElement,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(HistoryHandler, { entityUri }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", {}),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "popup " + (popupOn ? "on " : "") + (error ? "error " : ""), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children: saving && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_material7.TextField,
        {
          label: "commit message",
          value: message,
          variant: "standard",
          onChange: onMessageChangeHandler,
          InputLabelProps: { shrink: true },
          style: { minWidth: 300 },
          ...error ? {
            helperText: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { style: { display: "flex", alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons_material7.Error, { style: { fontSize: "20px" } }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("i", { style: { paddingLeft: "5px", lineHeight: "14px", display: "inline-block" }, children: error }),
              "\xA0\xA0",
              errorCode === 412 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_material7.Button, { className: "btn-blanc", onClick: handleReload, children: t("general.reload") })
            ] }),
            error: true
          } : {}
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_material7.TextField,
        {
          select: true,
          variant: "standard",
          value: lang,
          onChange: onLangChangeHandler,
          InputLabelProps: { shrink: true },
          style: { minWidth: 100, marginTop: "16px", marginLeft: "15px", marginRight: "15px" },
          children: props.config.possibleLiteralLangs.map((option) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_material7.MenuItem, { value: option.value, children: option.value }, option.value))
        }
      )
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "buttons", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_material7.Button,
        {
          variant: "outlined",
          onClick: save,
          className: "btn-rouge",
          ...spinner || message === "" && saving || saved || errorCode ? { disabled: true } : {},
          children: spinner ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_material7.CircularProgress, { size: "14px", color: "primary" }) : saving ? t("general.ok") : t("general.save")
        }
      ),
      saving && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_material7.Button,
        {
          variant: "outlined",
          onClick: closePopupHandler,
          className: "btn-blanc ml-2",
          children: t("general.cancel")
        }
      )
    ] })
  ] }) });
}

// src/containers/BUDAResourceSelector.tsx
var import_react12 = __toESM(require("react"));
var import_recoil14 = require("recoil");
var import_material8 = require("@mui/material");
var import_react_router_dom9 = require("react-router-dom");
var rdf9 = __toESM(require("rdflib"));
var import_icons_material8 = require("@mui/icons-material");
var import_debug18 = require("debug");
var import_react_i18next10 = require("react-i18next");
var import_jsx_runtime12 = require("react/jsx-runtime");
var import_react13 = require("react");
var debug18 = (0, import_debug18.debug)("rde:atom:event:RS");
var BDR_uri = "http://purl.bdrc.io/resource/";
var BUDAResourceSelector = ({
  value,
  onChange,
  property,
  idx,
  exists,
  subject,
  editable,
  owner,
  title,
  globalError,
  updateEntityState,
  shape,
  config
}) => {
  const [keyword, setKeyword] = (0, import_react12.useState)("");
  const [language, setLanguage] = (0, import_react12.useState)("bo-x-ewts");
  const [type, setType] = (0, import_react12.useState)(property.expectedObjectTypes ? property.expectedObjectTypes[0].qname : "");
  const [libraryURL, setLibraryURL] = (0, import_react12.useState)("");
  const [uiLang, setUiLang] = (0, import_recoil14.useRecoilState)(uiLangState);
  const [uiLitLang, setUiLitLang] = (0, import_recoil14.useRecoilState)(uiLitLangState);
  const [error, setError] = (0, import_react12.useState)();
  const [entities, setEntities] = (0, import_recoil14.useRecoilState)(entitiesAtom);
  const navigate = (0, import_react_router_dom9.useNavigate)();
  const msgId = subject.qname + property.qname + idx;
  const [popupNew, setPopupNew] = (0, import_react12.useState)(false);
  const iframeRef = (0, import_react12.useRef)(null);
  const [canCopy, setCanCopy] = (0, import_react12.useState)([]);
  const isRid = keyword.startsWith("bdr:") || keyword.match(/^([cpgwrti]|mw|wa|was|ut|ie|pr)(\d|eap)[^ ]*$/i) ? true : false;
  const [toCopy, setProp] = (0, import_recoil14.useRecoilState)(
    toCopySelector({
      list: property.copyObjectsOfProperty?.map((p) => ({
        property: config.prefixMap.qnameFromUri(p.value),
        atom: (owner ? owner : subject).getAtomForProperty(p.uri)
      }))
    })
  );
  (0, import_react12.useEffect)(() => {
    if (property.copyObjectsOfProperty?.length) {
      const copy = [];
      for (const prop of property.copyObjectsOfProperty) {
        const propQname = config.prefixMap.qnameFromUri(prop.value);
        if (value.otherData[propQname]?.length)
          copy.push({
            k: propQname,
            val: value.otherData[propQname].map(
              (v) => new LiteralWithId(v["@value"], v["@language"], rdfLangString)
            )
          });
      }
      setCanCopy(copy);
    }
  }, []);
  (0, import_react12.useEffect)(() => {
    if (globalError && !error)
      setError(globalError);
  }, [globalError]);
  if (!property.expectedObjectTypes) {
    debug18(property);
    throw "can't get the types for property " + property.qname;
  }
  const closeFrame = () => {
    debug18("close?", value, isRid, libraryURL);
    if (iframeRef.current && isRid) {
      debug18("if:", iframeRef.current);
      iframeRef.current.click();
      const wn = iframeRef.current.contentWindow;
      if (wn)
        wn.postMessage("click", "*");
    } else {
      if (libraryURL)
        setLibraryURL("");
    }
  };
  const { t } = (0, import_react_i18next10.useTranslation)();
  const updateRes = (0, import_react12.useCallback)((data) => {
    let isTypeOk = false;
    let actual;
    if (property.expectedObjectTypes) {
      const allow = property.expectedObjectTypes.map((t2) => t2.qname);
      actual = data["tmp:otherData"]["tmp:type"];
      if (!Array.isArray(actual))
        actual = [actual];
      actual = actual.map((a) => a.replace(/Product/, "Collection"));
      if (actual.filter((t2) => allow.includes(t2)).length)
        isTypeOk = true;
      const displayTypes = (t2) => t2.filter((a) => a).map((a) => a.replace(/^bdo:/, "")).join(", ");
      if (!isTypeOk) {
        setError("" + t("error.type", { allow: displayTypes(allow), actual: displayTypes(actual), id: data["@id"] }));
        if (libraryURL)
          setLibraryURL("");
      }
    }
    if (isTypeOk) {
      if (data["@id"] && !exists(data["@id"])) {
        const newRes = new ExtRDFResourceWithLabel(
          data["@id"].replace(/bdr:/, BDR_uri),
          {
            ...data["skos:prefLabel"] ? {
              ...data["skos:prefLabel"].reduce(
                (acc, l) => ({ ...acc, [l["@language"]]: l["@value"] }),
                {}
              )
            } : {}
          },
          {
            "tmp:keyword": { ...data["tmp:keyword"] },
            ...data["tmp:otherData"],
            ...data["skos:prefLabel"] ? { "skos:prefLabel": data["skos:prefLabel"] } : {},
            ...data["skos:altLabel"] ? { "skos:altLabel": data["skos:altLabel"] } : {}
          },
          null,
          config.prefixMap
        );
        onChange(newRes, idx, false);
      } else if (isTypeOk) {
        if (data["@id"])
          setError(data["@id"] + " already selected");
        else
          throw "no '@id' field in data";
        setLibraryURL("");
      } else {
        setLibraryURL("");
      }
    }
  }, [exists, idx, libraryURL, onChange, property.expectedObjectTypes]);
  let msgHandler = null;
  (0, import_react12.useEffect)(() => {
    if (msgHandler)
      window.removeEventListener("message", msgHandler, true);
    msgHandler = (ev) => {
      try {
        if (!window.location.href.includes(ev.origin)) {
          const data = JSON.parse(ev.data);
          if (data["tmp:propid"] === msgId && data["@id"] && data["tmp:notFound"]) {
            debug18("notfound msg: %o %o", msgId, data, ev, property.qname, libraryURL);
            setLibraryURL("");
            setError("" + t("error.notF", { RID: data["@id"] }));
          } else if (data["tmp:propid"] === msgId && data["@id"]) {
            debug18("received msg: %o %o", msgId, data, ev, property.qname, libraryURL);
            updateRes(data);
          } else {
            setLibraryURL("");
          }
        }
      } catch (err) {
        debug18("error: %o", err);
      }
    };
    window.addEventListener("message", msgHandler, true);
    return () => {
      if (msgHandler)
        window.removeEventListener("message", msgHandler, true);
    };
  }, [libraryURL]);
  (0, import_react12.useEffect)(() => {
    if (value.otherData["tmp:keyword"]) {
      setKeyword(value.otherData["tmp:keyword"]["@value"]);
      setLanguage(value.otherData["tmp:keyword"]["@language"]);
    }
  }, []);
  const updateLibrary = (ev, newlang, newtype) => {
    debug18("updLib: %o", msgId);
    if (ev && libraryURL) {
      setLibraryURL("");
    } else if (msgId) {
      if (isRid) {
        setLibraryURL(
          config.libraryUrl + "/simple/" + (!keyword.startsWith("bdr:") ? "bdr:" : "") + keyword + "?for=" + msgId
        );
      } else {
        let lang = language;
        if (newlang)
          lang = newlang;
        else if (!lang)
          lang = "bo-x-ewts";
        if (lang === "sa-x-iast")
          lang = "inc-x-ndia";
        let key = encodeURIComponent(keyword);
        key = '"' + key + '"';
        if (lang.startsWith("bo"))
          key = key + "~1";
        lang = encodeURIComponent(lang);
        let t2 = type;
        if (newtype)
          t2 = newtype;
        if (!t2)
          throw "there should be a type here";
        t2 = t2.replace(/^bdo:/, "");
        if (t2.includes("ImageInstance"))
          t2 = "Scan";
        else if (t2.includes("EtextInstance"))
          t2 = "Etext";
        else if (t2.includes("Collection"))
          t2 = "Product";
        setLibraryURL(
          config.libraryUrl + "/simplesearch?q=" + key + "&lg=" + lang + "&t=" + t2 + "&for=" + msgId + "&f=provider,inc,bda:CP021"
        );
      }
    }
  };
  let dates;
  if (value.uri && value.uri !== "tmp:uri" && value.otherData) {
    dates = "";
    const getDate = (d) => {
      const onY = d.filter((i) => i.onYear != void 0);
      const nB = d.filter((i) => i.notBefore != void 0);
      const nA = d.filter((i) => i.notAfter != void 0);
      if (nB.length || nA.length) {
        let date = "";
        if (nB[0].notBefore)
          date = nB[0].notBefore;
        date += "~";
        if (nA[0].notAfter)
          date += nA[0].notAfter;
        return date;
      } else if (onY.length)
        return onY[0].onYear;
      return "";
    };
    if (value.otherData.PersonBirth)
      dates += getDate(value.otherData.PersonBirth) + " \u2013 ";
    if (value.otherData.PersonDeath) {
      if (!dates)
        dates = "\u2013 ";
      dates += getDate(value.otherData.PersonDeath);
    }
    if (dates)
      dates = "(" + dates + ")";
  }
  const createAndUpdate = (0, import_react12.useCallback)(
    async (type2, named = "") => {
      let url = "";
      url = "/new/" + // TODO: perhaps users might want to choose between different shapes?
      config.possibleShapeRefsForType(type2.node)[0].qname + "/" + (owner?.qname && owner.qname !== subject.qname ? owner.qname : subject.qname) + "/" + config.prefixMap.qnameFromUri(property?.path?.sparqlString) + "/" + idx + (owner?.qname && owner.qname !== subject.qname ? "/" + subject.qname : "");
      if (property.connectIDs) {
        const newNode = await config.generateConnectedID(subject, shape, type2);
        const newQname = config.prefixMap.qnameFromUri(newNode.uri);
        if (!exists(newQname))
          url += "/named/" + (named ? named : newQname);
      }
      let urlParams = "";
      if (property.copyObjectsOfProperty?.length) {
        for (const kv of toCopy) {
          if (urlParams)
            urlParams += ";";
          let val = "";
          for (const l of kv.val) {
            if (l instanceof LiteralWithId) {
              val += "," + encodeURIComponent('"' + l.value + (l.language ? '"@' + l.language : ""));
            }
          }
          if (val)
            urlParams += kv.k + val;
        }
        if (urlParams) {
          url += "?copy=" + urlParams;
        }
      }
      return url;
    },
    [exists, entities, owner, subject, property, toCopy]
  );
  const chooseEntity = (ent, prefLabels) => () => {
    togglePopup();
    const newRes = new ExtRDFResourceWithLabel(ent.subjectQname, prefLabels, {}, null, config.prefixMap);
    onChange(newRes, idx, false);
  };
  const togglePopup = () => {
    setPopupNew(!popupNew);
  };
  const label = ValueByLangToStrPrefLang(property.prefLabels, uiLitLang);
  const textOnChange = (e) => {
    const newValue = e.currentTarget.value;
    setKeyword(newValue);
    if (libraryURL)
      updateLibrary(e);
  };
  const textOnChangeType = (e) => {
    const newValue = e.target.value;
    setType(newValue);
    if (libraryURL)
      updateLibrary(void 0, void 0, newValue);
  };
  const onClick = (e) => {
    updateLibrary(e);
  };
  const onClickKB = (e) => {
    updateLibrary(e);
  };
  let name = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: {
    fontSize: "16px"
    /*, borderBottom:"1px solid #ccc"*/
  }, children: ValueByLangToStrPrefLang(value.prefLabels, uiLitLang) + " " + dates });
  const entity = entities.filter((e) => e.subjectQname === value.qname);
  if (entity.length) {
    name = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LabelWithRID, { entity: entity[0] });
  }
  (0, import_react12.useEffect)(() => {
    if (error) {
      debug18("error:", error);
    }
  }, [error]);
  const inputRef = (0, import_react12.useRef)();
  const [preview, setPreview] = (0, import_react12.useState)(null);
  (0, import_react12.useLayoutEffect)(() => {
    if (document.activeElement === inputRef.current && !isRid && keyword) {
      const previewVal = config.previewLiteral(new rdf9.Literal(keyword, language), uiLang);
      setPreview(previewVal.value);
    } else {
      setPreview(null);
    }
  }, [config, isRid, keyword, language, uiLang]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react12.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        className: "resSelect " + (error ? "error" : ""),
        style: { position: "relative", ...value.uri === "tmp:uri" ? { width: "100%" } : {} },
        children: [
          value.uri === "tmp:uri" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              className: preview ? "withPreview" : "",
              style: { display: "flex", justifyContent: "space-between", alignItems: "end" },
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react12.default.Fragment, { children: [
                preview && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "preview-ewts", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_material8.TextField, { disabled: true, value: preview, variant: "standard" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_material8.TextField,
                  {
                    variant: "standard",
                    onKeyPress: (e) => {
                      if (e.key === "Enter")
                        onClickKB(e);
                    },
                    onFocus: () => {
                      if (!keyword || isRid)
                        setPreview(null);
                      const { value: value2, error: error2 } = config.previewLiteral(new rdf9.Literal(keyword, language), uiLang);
                      setPreview(value2);
                    },
                    onBlur: () => setPreview(null),
                    inputRef,
                    InputLabelProps: { shrink: true },
                    style: { width: "90%" },
                    value: keyword,
                    onChange: textOnChange,
                    placeholder: "Search name or RID for " + title,
                    ...error ? {
                      helperText: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_react12.default.Fragment, { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Error, { style: { fontSize: "20px", verticalAlign: "-7px" } }),
                        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("i", { children: error })
                      ] }),
                      error: true
                    } : {},
                    ...!editable ? { disabled: true } : {}
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  LangSelect,
                  {
                    value: language,
                    onChange: (lang) => {
                      setLanguage(lang);
                      debug18(lang);
                      if (libraryURL)
                        updateLibrary(void 0, lang);
                    },
                    ...isRid ? { disabled: true } : { disabled: false },
                    editable,
                    error: !!error,
                    config
                  }
                ),
                property.expectedObjectTypes?.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_material8.TextField,
                  {
                    variant: "standard",
                    select: true,
                    style: { width: 100, flexShrink: 0 },
                    value: type,
                    className: "mx-2",
                    onChange: textOnChangeType,
                    label: "Type",
                    ...isRid ? { disabled: true } : {},
                    ...!editable ? { disabled: true } : {},
                    ...error ? {
                      helperText: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("br", {}),
                      error: true
                    } : {},
                    children: property.expectedObjectTypes?.map((r) => {
                      const label2 = ValueByLangToStrPrefLang(r.prefLabels, uiLang);
                      return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_material8.MenuItem, { value: r.qname, children: label2 }, r.qname);
                    })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "button",
                  {
                    ...!keyword || !isRid && (!language || !type) ? { disabled: true } : {},
                    className: "btn btn-sm btn-outline-primary ml-2 lookup btn-rouge",
                    style: { boxShadow: "none", alignSelf: "center", padding: "5px 4px 4px 4px" },
                    onClick,
                    ...!editable ? { disabled: true } : {},
                    children: libraryURL ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Close, {}) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Search, {})
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "button",
                  {
                    className: "btn btn-sm btn-outline-primary py-3 ml-2 dots btn-rouge",
                    style: { boxShadow: "none", alignSelf: "center" },
                    onClick: togglePopup,
                    ...!editable ? { disabled: true } : {},
                    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_jsx_runtime12.Fragment, { children: t("search.create") })
                  }
                )
              ] })
            }
          ),
          value.uri !== "tmp:uri" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react12.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "selected", children: [
            name,
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { fontSize: "12px", opacity: "0.5", display: "flex", alignItems: "center" }, children: [
              value.qname,
              "\xA0",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
                "a",
                {
                  title: t("search.help.preview"),
                  onClick: () => {
                    if (libraryURL)
                      setLibraryURL("");
                    else if (value.otherData["tmp:externalUrl"])
                      setLibraryURL(value.otherData["tmp:externalUrl"]);
                    else
                      setLibraryURL(config.libraryUrl + "/simple/" + value.qname + "?view=true");
                  },
                  children: [
                    !libraryURL && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.InfoOutlined, { style: { width: "18px", cursor: "pointer" } }),
                    libraryURL && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Info, { style: { width: "18px", cursor: "pointer" } })
                  ]
                }
              ),
              "\xA0",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "a",
                {
                  title: t("search.help.open"),
                  href: config.libraryUrl + "/show/" + value.qname,
                  rel: "noopener noreferrer",
                  target: "_blank",
                  children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Launch, { style: { width: "16px" } })
                }
              ),
              "\xA0",
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react_router_dom9.Link, { title: t("search.help.edit"), to: "/edit/" + value.qname, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_icons_material8.Edit, { style: { width: "16px" } }) }),
              "\xA0",
              canCopy.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { title: t("general.import"), children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_icons_material8.ContentPaste,
                {
                  style: { width: "17px", cursor: "pointer" },
                  onClick: () => {
                    setProp(canCopy);
                    setCanCopy([]);
                  }
                }
              ) })
            ] })
          ] }) })
        ]
      }
    ),
    libraryURL && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        className: "row card px-3 py-3 iframe",
        style: {
          position: "absolute",
          zIndex: 10,
          maxWidth: "800px",
          minWidth: "670px",
          ...value.uri === "tmp:uri" ? {
            right: "calc(52px)",
            width: "calc(100% - 100px)",
            bottom: "calc(100%)"
          } : {},
          ...value.uri !== "tmp:uri" ? { left: "calc(1rem)", width: "calc(100%)", bottom: "calc(100% - 0.5rem)" } : {}
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("iframe", { style: { border: "none" }, height: "400", src: libraryURL, ref: iframeRef }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "iframe-BG", onClick: closeFrame })
        ]
      }
    ),
    popupNew && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "card popup-new", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "front", children: [
        entities.map((e, i) => {
          if (!exists(e?.subjectQname) && e?.subjectQname != subject.qname && e?.subjectQname != owner?.qname && property.expectedObjectTypes?.some(
            (t2) => (
              // DONE shapeRef is updated upon shape selection
              e.shapeQname?.startsWith(t2.qname.replace(/^bdo:/, "bds:"))
            )
          )) {
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_material8.MenuItem, { className: "px-0 py-0", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LabelWithRID, { choose: chooseEntity, entity: e }) }, i + 1);
          }
        }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("hr", { className: "my-1" }),
        property.expectedObjectTypes?.map((r) => {
          const label2 = ValueByLangToStrPrefLang(r.prefLabels, uiLang);
          return /* @__PURE__ */ (0, import_react13.createElement)(
            import_material8.MenuItem,
            {
              ...r.qname === "bdo:EtextInstance" ? { disabled: true } : {},
              key: r.qname,
              value: r.qname,
              onClick: async () => {
                const url = await createAndUpdate(r);
                navigate(url);
              }
            },
            t("search.new", { type: label2 })
          );
        })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "popup-new-BG", onClick: togglePopup })
    ] })
  ] });
};
var LabelWithRID = ({
  entity,
  choose
}) => {
  const [uiLitLang] = (0, import_recoil14.useRecoilState)(uiLitLangState);
  const [labelValues] = (0, import_recoil14.useRecoilState)(entity.subjectLabelState);
  const prefLabels = RDFResource.valuesByLang(labelValues);
  const label = ValueByLangToStrPrefLang(prefLabels, uiLitLang);
  let name = label && label != "..." ? label : entity.subject?.lname ? entity.subject.lname : entity.subjectQname.split(":")[1];
  if (!name)
    name = label;
  if (!choose)
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: { fontSize: "16px" }, children: name });
  else
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "px-3 py-1", style: { width: "100%" }, onClick: choose(entity, prefLabels), children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "label", children: name }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "RID", children: entity.subjectQname })
    ] });
};
var BUDAResourceSelector_default = BUDAResourceSelector;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BUDAResourceSelector,
  BottomBarContainer,
  EntityCreationContainer,
  EntityCreationContainerRoute,
  EntityEditContainer,
  EntityEditContainerMayUpdate,
  EntityGraph,
  EntitySelectorContainer,
  EntityShapeChooserContainer,
  ExtRDFResourceWithLabel,
  HttpError,
  LangSelect,
  LiteralWithId,
  NewEntityContainer,
  NodeShape,
  RDFResource,
  RDFResourceWithLabel,
  Subject,
  ValueByLangToStrPrefLang,
  atoms,
  enTranslations,
  fetchTtl,
  generateSubnodes,
  getHistoryStatus,
  history,
  ns,
  rdf,
  shapes,
  updateHistory
});
