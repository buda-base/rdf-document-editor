import * as rdf from 'rdflib';
import { Memoize } from 'typescript-memoize';
import { DefaultValue, atom, selectorFamily, useRecoilState, useRecoilValue, useRecoilSnapshot } from 'recoil';
import { nanoid, customAlphabet } from 'nanoid';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect, createElement } from 'react';
import i18n from 'i18next';
import _ from 'lodash';
import NotFoundIcon from '@material-ui/icons/BrokenImage.js'
import { makeStyles } from '@material-ui/core/styles/index.js'
import { TextField, MenuItem, Tooltip } from '@material-ui/core/index.js'
import { Img } from 'react-image';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline.js'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline.js'
import ErrorIcon from '@material-ui/icons/Error.js'
import CloseIcon from '@material-ui/icons/Close.js'
import '@material-ui/icons/FindReplace.js'
import LookupIcon from '@material-ui/icons/Search.js'
import LaunchIcon from '@material-ui/icons/Launch.js'
import InfoIcon from '@material-ui/icons/Info.js'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined.js'
import '@material-ui/icons/Settings.js'
import VisibilityIcon from '@material-ui/icons/Visibility.js'
import '@material-ui/icons/VisibilityOff.js'
import EditIcon from '@material-ui/icons/Edit.js'
import KeyboardIcon from '@material-ui/icons/Keyboard.js'
import HelpIcon from '@material-ui/icons/Help.js'
import ContentPasteIcon from '@material-ui/icons/AssignmentReturned.js'
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useAuth0 } from '@auth0/auth0-react';
import { MapContainer, LayersControl, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { GoogleProvider, OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Navigate, useNavigate, Link, useParams as useParams$1, useLocation as useLocation$1 } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router';
import { Trans } from 'react-i18next';
import Button from '@material-ui/core/Button/index.js'
import Dialog from '@material-ui/core/Dialog/index.js'
import DialogActions from '@material-ui/core/DialogActions/index.js'
import DialogContent from '@material-ui/core/DialogContent/index.js'
import DialogContentText from '@material-ui/core/DialogContentText/index.js'
import DialogTitle from '@material-ui/core/DialogTitle/index.js'

const DASH_uri = "http://datashapes.org/dash#";
const DASH = rdf.Namespace(DASH_uri);
const OWL_uri = "http://www.w3.org/2002/07/owl#";
const OWL = rdf.Namespace(OWL_uri);
const RDFS_uri = "http://www.w3.org/2000/01/rdf-schema#";
const RDFS = rdf.Namespace(RDFS_uri);
const SH_uri = "http://www.w3.org/ns/shacl#";
const SH = rdf.Namespace(SH_uri);
const RDF_uri = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const RDF = rdf.Namespace(RDF_uri);
const SKOS_uri = "http://www.w3.org/2004/02/skos/core#";
const SKOS = rdf.Namespace(SKOS_uri);
const XSD_uri = "http://www.w3.org/2001/XMLSchema#";
const XSD = rdf.Namespace(XSD_uri);
const FOAF_uri = "http://xmlcom/foaf/0.1/";
const FOAF = rdf.Namespace(FOAF_uri);
const RDE_uri = "https://github.com/buda-base/rdf-document-editor/";
const RDE = rdf.Namespace(RDE_uri);
require("debug")("rde:rdf:ns");
const defaultPrefixToURI = {
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
class PrefixMap {
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
    if (j < 0)
      throw new Error("Cannot make qname out of <" + uri + ">");
    const localid = uri.slice(j + 1);
    const namesp = uri.slice(0, j + 1);
    const prefix = this.URItoPrefix[namesp];
    if (!prefix)
      throw new Error("Cannot make qname out of <" + uri + ">");
    return prefix + ":" + localid;
  };
  lnameFromUri = (uri) => {
    let j = uri.indexOf("#");
    if (j < 0)
      j = uri.lastIndexOf("/");
    if (j < 0)
      throw new Error("Cannot make qname out of <" + uri + ">");
    return uri.slice(j + 1);
  };
  namespaceFromUri = (uri) => {
    let j = uri.indexOf("#");
    if (j < 0)
      j = uri.lastIndexOf("/");
    if (j < 0)
      throw new Error("Cannot make namespace out of <" + uri + ">");
    return uri.slice(0, j + 1);
  };
  uriFromQname = (qname = "") => {
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
}
const rdfType = RDF("type");
const shProperty = SH("property");
const shGroup = SH("group");
const shOrder = SH("order");
const rdfsLabel = RDFS("label");
const prefLabel = SKOS("prefLabel");
const shName = SH("name");
const shPath = SH("path");
const dashEditor = DASH("editor");
const shNode = SH("node");
const dashListShape = DASH("ListShape");
const dashEnumSelectEditor = DASH("EnumSelectEditor");
const shMessage = SH("message");
const rdeDisplayPriority = RDE("displayPriority");
const shMinCount = SH("minCount");
const shMinInclusive = SH("minInclusive");
const shMinExclusive = SH("minExclusive");
const shClass = SH("class");
const shMaxCount = SH("maxCount");
const shMaxInclusive = SH("maxInclusive");
const shMaxExclusive = SH("maxExclusive");
const shDatatype = SH("datatype");
const dashSingleLine = DASH("singleLine");
const shTargetClass = SH("targetClass");
const shTargetObjectsOf = SH("targetObjectsOf");
const shTargetSubjectsOf = SH("targetSubjectsOf");
const rdePropertyShapeType = RDE("propertyShapeType");
const rdeInternalShape = RDE("InternalShape");
const rdeExternalShape = RDE("ExternalShape");
const rdeIgnoreShape = RDE("IgnoreShape");
const rdeClassIn = RDE("classIn");
const shIn = SH("in");
const shInversePath = SH("inversePath");
const shUniqueLang = SH("uniqueLang");
const rdeReadOnly = RDE("readOnly");
const rdeIdentifierPrefix = RDE("identifierPrefix");
const rdeAllowMarkDown = RDE("allowMarkDown");
const shNamespace = SH("namespace");
const rdeDefaultLanguage = RDE("defaultLanguage");
const rdeDefaultValue = RDE("defaultValue");
const shLanguageIn = SH("languageIn");
const shPattern = SH("pattern");
const rdeSortOnProperty = RDE("sortOnProperty");
const rdeAllowPushToTopLevelLabel = RDE("allowPushToTopLevelLabel");
const rdeIndependentIdentifiers = RDE("independentIdentifiers");
const rdeSpecialPattern = RDE("specialPattern");
const rdeConnectIDs = RDE("connectIDs");
const rdeAllowBatchManagement = RDE("allowBatchManagement");
const rdeCopyObjectsOfProperty = RDE("copyObjectsOfProperty");
const rdeUniqueValueAmongSiblings = RDE("uniqueValueAmongSiblings");
const rdfLangString = RDF("langString");
const skosDefinition = SKOS("definition");
const rdfsComment = RDFS("comment");
const shDescription = SH("description");
const defaultLabelProperties = [prefLabel, rdfsLabel, shName];
const defaultDescriptionProperties = [skosDefinition, rdfsComment, shDescription];
const defaultPrefixMap = new PrefixMap({});

var ns = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DASH_uri: DASH_uri,
  DASH: DASH,
  OWL_uri: OWL_uri,
  OWL: OWL,
  RDFS_uri: RDFS_uri,
  RDFS: RDFS,
  SH_uri: SH_uri,
  SH: SH,
  RDF_uri: RDF_uri,
  RDF: RDF,
  SKOS_uri: SKOS_uri,
  SKOS: SKOS,
  XSD_uri: XSD_uri,
  XSD: XSD,
  FOAF_uri: FOAF_uri,
  FOAF: FOAF,
  RDE_uri: RDE_uri,
  RDE: RDE,
  PrefixMap: PrefixMap,
  rdfType: rdfType,
  shProperty: shProperty,
  shGroup: shGroup,
  shOrder: shOrder,
  rdfsLabel: rdfsLabel,
  prefLabel: prefLabel,
  shName: shName,
  shPath: shPath,
  dashEditor: dashEditor,
  shNode: shNode,
  dashListShape: dashListShape,
  dashEnumSelectEditor: dashEnumSelectEditor,
  shMessage: shMessage,
  rdeDisplayPriority: rdeDisplayPriority,
  shMinCount: shMinCount,
  shMinInclusive: shMinInclusive,
  shMinExclusive: shMinExclusive,
  shClass: shClass,
  shMaxCount: shMaxCount,
  shMaxInclusive: shMaxInclusive,
  shMaxExclusive: shMaxExclusive,
  shDatatype: shDatatype,
  dashSingleLine: dashSingleLine,
  shTargetClass: shTargetClass,
  shTargetObjectsOf: shTargetObjectsOf,
  shTargetSubjectsOf: shTargetSubjectsOf,
  rdePropertyShapeType: rdePropertyShapeType,
  rdeInternalShape: rdeInternalShape,
  rdeExternalShape: rdeExternalShape,
  rdeIgnoreShape: rdeIgnoreShape,
  rdeClassIn: rdeClassIn,
  shIn: shIn,
  shInversePath: shInversePath,
  shUniqueLang: shUniqueLang,
  rdeReadOnly: rdeReadOnly,
  rdeIdentifierPrefix: rdeIdentifierPrefix,
  rdeAllowMarkDown: rdeAllowMarkDown,
  shNamespace: shNamespace,
  rdeDefaultLanguage: rdeDefaultLanguage,
  rdeDefaultValue: rdeDefaultValue,
  shLanguageIn: shLanguageIn,
  shPattern: shPattern,
  rdeSortOnProperty: rdeSortOnProperty,
  rdeAllowPushToTopLevelLabel: rdeAllowPushToTopLevelLabel,
  rdeIndependentIdentifiers: rdeIndependentIdentifiers,
  rdeSpecialPattern: rdeSpecialPattern,
  rdeConnectIDs: rdeConnectIDs,
  rdeAllowBatchManagement: rdeAllowBatchManagement,
  rdeCopyObjectsOfProperty: rdeCopyObjectsOfProperty,
  rdeUniqueValueAmongSiblings: rdeUniqueValueAmongSiblings,
  rdfLangString: rdfLangString,
  skosDefinition: skosDefinition,
  rdfsComment: rdfsComment,
  shDescription: shDescription,
  defaultLabelProperties: defaultLabelProperties,
  defaultDescriptionProperties: defaultDescriptionProperties,
  defaultPrefixMap: defaultPrefixMap
});

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
require("debug")("rde:rdf:types");
const defaultGraphNode = new rdf.NamedNode(rdf.Store.defaultGraphURI);
const errors = {};
const history = {};
const updateHistory = (entity, qname, prop, val, noHisto = true) => {
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
  if (val.length === 1 && !(val[0] instanceof LiteralWithId) && val[0].uri === "tmp:uri" || val[0].value === "")
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
const getHistoryStatus = (entityUri) => {
  if (!history[entityUri])
    return {};
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
const rdfLitAsNumber = (lit) => {
  const n = Number(lit.value);
  if (!isNaN(n)) {
    return +n;
  }
  return null;
};
class EntityGraphValues {
  oldSubjectProps = {};
  newSubjectProps = {};
  subjectUri = "";
  idHash = Date.now();
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
    const subject = new rdf.NamedNode(subjectUri);
    for (const pathString in this.newSubjectProps[subjectUri]) {
      if (pathString.startsWith("^")) {
        const property = new rdf.NamedNode(pathString.substring(1));
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
        const property = new rdf.NamedNode(listMode ? pathString.substring(0, pathString.length - 2) : pathString);
        const values = this.newSubjectProps[subjectUri][pathString];
        const collection = new rdf.Collection();
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
              } else if (val instanceof rdf.Literal) {
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
      if (!(newValues instanceof DefaultValue)) {
        this.onUpdateValues(subjectUri, pathString, newValues);
      }
    });
  };
  getAtomForSubjectProperty(pathString, subjectUri) {
    return atom({
      key: this.idHash + subjectUri + pathString,
      default: [],
      effects_UNSTABLE: [this.propsUpdateEffect(subjectUri, pathString)],
      dangerouslyAllowMutability: true
    });
  }
  hasSubject(subjectUri) {
    return subjectUri in this.newSubjectProps;
  }
}
__decorateClass$1([
  Memoize((pathString, subjectUri) => {
    return subjectUri + pathString;
  })
], EntityGraphValues.prototype, "getAtomForSubjectProperty", 1);
class EntityGraph {
  onGetInitialValues;
  getAtomForSubjectProperty;
  getValues;
  get values() {
    return this.getValues();
  }
  topSubjectUri;
  store;
  connexGraph;
  prefixMap;
  labelProperties;
  descriptionProperties;
  constructor(store, topSubjectUri, prefixMap = defaultPrefixMap, connexGraph = rdf.graph(), labelProperties = defaultLabelProperties, descriptionProperties = defaultDescriptionProperties) {
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
  static addLabelsFromGraph = (resList, graph) => {
    return resList.map((res) => {
      return new RDFResourceWithLabel(res, graph);
    });
  };
  static addExtDataFromGraph = (resList, graph) => {
    return resList.map((res) => {
      if (!graph.connexGraph) {
        throw "trying to access inexistant associatedStore";
      }
      const perLang = {};
      for (const p of graph.labelProperties) {
        const lits = graph.connexGraph.each(res, p, null);
        for (const lit of lits) {
          if (lit.language in perLang)
            continue;
          perLang[lit.language] = lit.value;
        }
      }
      return new ExtRDFResourceWithLabel(res.uri, perLang);
    });
  };
  hasSubject(subjectUri) {
    if (this.values.hasSubject(subjectUri))
      return true;
    return this.store.any(new rdf.NamedNode(subjectUri), null, null) != null;
  }
  static subjectify = (resList, graph) => {
    return resList.map((res) => {
      return new Subject(res, graph);
    });
  };
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
      case ObjectType.ResExt:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri;
        }
        const fromRDFResExt = s.getPropResValuesFromPath(p.path);
        const fromRDFResExtwData = EntityGraph.addExtDataFromGraph(fromRDFResExt, s.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFResExtwData);
        return fromRDFResExtwData;
      case ObjectType.Internal:
        const fromRDFSubNode = s.getPropResValuesFromPath(p.path);
        const fromRDFSubs = EntityGraph.subjectify(fromRDFSubNode, s.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFSubs);
        return fromRDFSubs;
      case ObjectType.ResInList:
        if (!p.path.directPathNode) {
          throw "can't have non-direct path for property " + p.uri;
        }
        const fromRDFResList = s.getPropResValues(p.path.directPathNode);
        const fromRDFReswLabels = EntityGraph.addLabelsFromGraph(fromRDFResList, p.graph);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFReswLabels);
        return fromRDFReswLabels;
      case ObjectType.Literal:
      case ObjectType.LitInList:
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
        const fromRDFLitIDs = EntityGraph.addIdToLitList(fromRDFLits);
        this.onGetInitialValues(s.uri, p.path.sparqlString, fromRDFLitIDs);
        return fromRDFLitIDs;
    }
  }
}
class RDFResource {
  node;
  graph;
  isCollection;
  constructor(node, graph) {
    this.node = node;
    this.graph = graph;
    this.isCollection = node instanceof rdf.Collection;
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
    if (this.node instanceof rdf.Collection)
      return {};
    const lits = this.graph.store.each(this.node, p, null);
    const res = {};
    for (const lit of lits) {
      res[lit.language] = lit.value;
    }
    return res;
  }
  getPropValueOrNullByLang(p) {
    if (this.node instanceof rdf.Collection)
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
    if (this.node instanceof rdf.Collection)
      return [];
    return this.graph.store.each(this.node, p, null);
  }
  getPropResValues(p) {
    if (this.node instanceof rdf.Collection)
      return [];
    return this.graph.store.each(this.node, p, null);
  }
  getPropResValuesFromList(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    const colls = this.graph.store.each(this.node, p, null);
    for (const coll of colls) {
      return coll.elements;
    }
    return null;
  }
  getPropLitValuesFromList(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    const colls = this.graph.store.each(this.node, p, null);
    for (const coll of colls) {
      return coll.elements;
    }
    return null;
  }
  getPropIntValue(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    const lit = this.graph.store.any(this.node, p, null);
    if (lit === null)
      return null;
    return rdfLitAsNumber(lit);
  }
  getPropStringValue(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    const lit = this.graph.store.any(this.node, p, null);
    if (lit === null)
      return null;
    return lit.value;
  }
  getPropResValue(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    const res = this.graph.store.any(this.node, p, null);
    return res;
  }
  getPropResValuesFromPath(p) {
    if (this.node instanceof rdf.Collection)
      return [];
    if (p.directPathNode) {
      return this.graph.store.each(this.node, p.directPathNode, null);
    }
    return this.graph.store.each(null, p.inversePathNode, this.node);
  }
  getPropResValueFromPath(p) {
    if (this.node instanceof rdf.Collection)
      return null;
    if (p.directPathNode) {
      return this.graph.store.any(this.node, p.directPathNode, null);
    }
    return this.graph.store.any(this.node, p.inversePathNode, null);
  }
  getPropBooleanValue(p, dflt = false) {
    if (this.node instanceof rdf.Collection)
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
}
class RDFResourceWithLabel extends RDFResource {
  node;
  constructor(node, graph, labelProp) {
    super(node, graph);
    this.node = node;
  }
  get prefLabels() {
    for (const p of this.graph.labelProperties) {
      const res = this.getPropValueOrNullByLang(p);
      if (res != null)
        return res;
    }
    return { en: this.node.uri };
  }
  get description() {
    for (const p of this.graph.descriptionProperties) {
      const res = this.getPropValueOrNullByLang(p);
      if (res != null)
        return res;
    }
    return null;
  }
}
__decorateClass$1([
  Memoize()
], RDFResourceWithLabel.prototype, "prefLabels", 1);
__decorateClass$1([
  Memoize()
], RDFResourceWithLabel.prototype, "description", 1);
class ExtRDFResourceWithLabel extends RDFResourceWithLabel {
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
  constructor(uri, prefLabels, data = {}, description = null) {
    super(new rdf.NamedNode(uri), new EntityGraph(new rdf.Store(), uri));
    this._prefLabels = prefLabels;
    this._description = description;
    this._otherData = data;
  }
  addOtherData(key, value) {
    return new ExtRDFResourceWithLabel(this.uri, this._prefLabels, { ...this._otherData, [key]: value });
  }
}
var ObjectType = /* @__PURE__ */ ((ObjectType2) => {
  ObjectType2[ObjectType2["Literal"] = 0] = "Literal";
  ObjectType2[ObjectType2["Internal"] = 1] = "Internal";
  ObjectType2[ObjectType2["ResInList"] = 2] = "ResInList";
  ObjectType2[ObjectType2["ResExt"] = 3] = "ResExt";
  ObjectType2[ObjectType2["ResIgnore"] = 4] = "ResIgnore";
  ObjectType2[ObjectType2["LitInList"] = 5] = "LitInList";
  return ObjectType2;
})(ObjectType || {});
class LiteralWithId extends rdf.Literal {
  id;
  constructor(value, language, datatype, id) {
    super(value, language, datatype);
    if (id) {
      this.id = id;
    } else {
      this.id = nanoid();
    }
  }
  copy() {
    return new LiteralWithId(this.value, this.language, this.datatype, this.id);
  }
  copyWithUpdatedValue(value) {
    return new LiteralWithId(value, this.language, this.datatype, this.id);
  }
  copyWithUpdatedLanguage(language) {
    return new LiteralWithId(this.value, language, this.datatype, this.id);
  }
}
class Subject extends RDFResource {
  node;
  constructor(node, graph) {
    super(node, graph);
    this.node = node;
  }
  getUnitializedValues(property) {
    return this.graph.getUnitializedValues(this, property);
  }
  getAtomForProperty(pathString) {
    return this.graph.getAtomForSubjectProperty(pathString, this.uri);
  }
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
    return new Subject(new rdf.NamedNode("tmp:uri"), new EntityGraph(new rdf.Store(), "tmp:uri"));
  }
  isEmpty() {
    return this.node.uri == "tmp:uri";
  }
}
const noneSelected = new ExtRDFResourceWithLabel("tmp:none", { en: "\u2013" }, {}, { en: "none provided" });
new LiteralWithId("");
const sameLanguage = (lang1, lang2) => {
  return lang1 == lang2;
};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const debug$9 = require("debug")("rde:rdf:shapes");
const sortByPropValue = (nodelist, property, store) => {
  const nodeUriToPropValue = {};
  for (const node of nodelist) {
    const ordern = store.any(node, property, null);
    if (!ordern)
      nodeUriToPropValue[node.uri] = 0;
    const asnum = rdfLitAsNumber(ordern);
    nodeUriToPropValue[node.uri] = asnum == null ? 0 : asnum;
  }
  return [...nodelist].sort((a, b) => {
    return nodeUriToPropValue[a.uri] - nodeUriToPropValue[b.uri];
  });
};
class Path {
  sparqlString;
  directPathNode = null;
  inversePathNode = null;
  constructor(node, graph, listMode) {
    const invpaths = graph.store.each(node, shInversePath, null);
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
}
const _PropertyShape = class extends RDFResourceWithLabel {
  constructor(node, graph) {
    super(node, graph, rdfsLabel);
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
  static resourcizeWithInit(nodes, graph) {
    const res = [];
    for (const node of nodes)
      if (node instanceof rdf.NamedNode) {
        const r = new RDFResourceWithLabel(node, graph);
        r.description;
        r.prefLabels;
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
        return ObjectType.Literal;
      if (editor.value == dashEnumSelectEditor.value) {
        if (this.datatype)
          return ObjectType.LitInList;
        return ObjectType.ResInList;
      }
      return ObjectType.Literal;
    }
    if (propertyShapeType.value == rdeInternalShape.value)
      return ObjectType.Internal;
    else if (propertyShapeType.value == rdeExternalShape.value)
      return ObjectType.ResExt;
    else if (propertyShapeType.value == rdeIgnoreShape.value)
      return ObjectType.ResIgnore;
    throw "can't handle property shape type " + propertyShapeType.value + " for property shape " + this.qname;
  }
  get targetShape() {
    const path = this.path;
    if (!path) {
      debug$9("can't find path for " + this.uri);
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
let PropertyShape = _PropertyShape;
__decorateClass([
  Memoize()
], PropertyShape.prototype, "prefLabels", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "helpMessage", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "errorMessage", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "defaultValue", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "singleLine", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "connectIDs", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "displayPriority", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "minCount", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "maxCount", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "minInclusive", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "maxInclusive", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "minExclusive", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "maxExclusive", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "allowMarkDown", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "allowBatchManagement", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "uniqueValueAmongSiblings", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "uniqueLang", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "readOnly", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "defaultLanguage", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "editorLname", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "group", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "copyObjectsOfProperty", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "datatype", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "pattern", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "sortOnProperty", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "allowPushToTopLevelLabel", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "specialPattern", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "hasListAsObject", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "in", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "expectedObjectTypes", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "path", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "objectType", 1);
__decorateClass([
  Memoize()
], PropertyShape.prototype, "targetShape", 1);
class PropertyGroup extends RDFResourceWithLabel {
  constructor(node, graph) {
    super(node, graph, rdfsLabel);
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
}
__decorateClass([
  Memoize()
], PropertyGroup.prototype, "properties", 1);
__decorateClass([
  Memoize()
], PropertyGroup.prototype, "prefLabels", 1);
class NodeShape extends RDFResourceWithLabel {
  constructor(node, graph) {
    super(node, graph, rdfsLabel);
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
}
__decorateClass([
  Memoize()
], NodeShape.prototype, "targetClassPrefLabels", 1);
__decorateClass([
  Memoize()
], NodeShape.prototype, "properties", 1);
__decorateClass([
  Memoize()
], NodeShape.prototype, "independentIdentifiers", 1);
__decorateClass([
  Memoize()
], NodeShape.prototype, "groups", 1);
const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
const generateSubnode = async (subshape, parent) => {
  const prefix = subshape.getPropStringValue(rdeIdentifierPrefix);
  if (prefix == null)
    throw "cannot find entity prefix for " + subshape.qname;
  let namespace = subshape.getPropStringValue(shNamespace);
  if (namespace == null)
    namespace = parent.namespace;
  let uri = namespace + prefix + parent.lname + nanoidCustom();
  while (parent.graph.hasSubject(uri)) {
    uri = namespace + prefix + nanoidCustom();
  }
  const res = new Subject(new rdf.NamedNode(uri), parent.graph);
  return Promise.resolve(res);
};

var shapes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sortByPropValue: sortByPropValue,
  Path: Path,
  PropertyShape: PropertyShape,
  PropertyGroup: PropertyGroup,
  NodeShape: NodeShape,
  generateSubnode: generateSubnode
});

require("debug")("rde:common");
var EditedEntityState = /* @__PURE__ */ ((EditedEntityState2) => {
  EditedEntityState2[EditedEntityState2["Error"] = 0] = "Error";
  EditedEntityState2[EditedEntityState2["Saved"] = 1] = "Saved";
  EditedEntityState2[EditedEntityState2["NeedsSaving"] = 2] = "NeedsSaving";
  EditedEntityState2[EditedEntityState2["Loading"] = 3] = "Loading";
  EditedEntityState2[EditedEntityState2["NotLoaded"] = 4] = "NotLoaded";
  return EditedEntityState2;
})(EditedEntityState || {});
const entitiesAtom = atom({
  key: "entities",
  default: []
});
const defaultEntityLabelAtom = atom({
  key: "defaultEntityLabelAtom",
  default: [new LiteralWithId("...", "en")]
});
const uiLangState = atom({
  key: "uiLangState",
  default: ["en"]
});
const uiLitLangState = atom({
  key: "uiLitLangState",
  default: ["en"]
});
const uiReadyState = atom({
  key: "uiReadyState",
  default: false
});
const uiTabState = atom({
  key: "uiTabState",
  default: -1
});
atom({
  key: "uiRIDState",
  default: []
});
const uiEditState = atom({
  key: "uiEditState",
  default: ""
});
const uiGroupState = atom({
  key: "uiGroupState",
  default: ""
});
atom({
  key: "uiHistoryState",
  default: {}
});
const noUndo = { enabled: false, subjectUri: "", propertyPath: "", parentPath: [] };
const noUndoRedo = { prev: noUndo, next: noUndo };
const uiUndosState = atom({
  key: "uiUndosState",
  default: {}
});
atom({
  key: "uiNavState",
  default: ""
});
const sessionLoadedState = atom({
  key: "sessionLoadedState",
  default: false
});
const profileIdState = atom({
  key: "profileIdState",
  default: ""
});
const uiDisabledTabsState = atom({
  key: "uiDisabledTabsState",
  default: false
});
const userIdState = atom({
  key: "userIdState",
  default: ""
});
atom({
  key: "reloadProfileState",
  default: true
});
const reloadEntityState = atom({
  key: "reloadEntityState",
  default: ""
});
const RIDprefixState = atom({
  key: "RIDprefixState",
  default: null
});
const orderedByPropSelector = selectorFamily({
  key: "orderedByPropSelector",
  get: (args) => ({ get }) => {
    let { atom: atom2, propertyPath, order } = args;
    if (propertyPath) {
      if (!order)
        order = "asc";
      const unorderedList = get(atom2);
      const orderedList = _.orderBy(
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
selectorFamily({
  key: "personNamesLabelsSelector",
  get: (args) => ({ get }) => {
    const { atom: atom2 } = args;
    if (atom2) {
      const names = get(atom2);
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
const initListAtom = atom({ key: "initListAtom", default: [] });
const initStringAtom = atom({ key: "initStringAtom", default: "" });
const initMapAtom = atom({ key: "initMapAtom", default: {} });
atom({
  key: "initkvAtom",
  default: {}
});
const possiblePrefLabelsSelector = selectorFamily({
  key: "possiblePrefLabelsSelector",
  get: (args) => ({ get }) => {
    const res = {};
    for (const g of Object.keys(args.canPushPrefLabelGroups)) {
      const labels = [];
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
const orderedNewValSelector = selectorFamily({
  key: "orderedNewValSelector",
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
const toCopySelector = selectorFamily({
  key: "toCopySelector",
  get: (args) => ({ get }) => {
    const res = [];
    args.list?.map(({ property, atom: atom2 }) => {
      const val = get(atom2);
      res.push({ k: property, val });
    });
    return res;
  },
  set: (args) => ({ get, set }, [{ k, val }]) => {
    args.list?.map(({ property, atom: atom2 }) => {
      if (k == property)
        set(atom2, [...get(atom2).filter((lit) => lit.value), ...val]);
    });
  }
});
atom({
  key: "savePopupState",
  default: false
});
const ESfromRecoilSelector = selectorFamily({
  key: "ESfromRecoilSelector",
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
const isUniqueTestSelector = selectorFamily({
  key: "isUniqueTestSelector",
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

const debug$8 = require("debug")("rde:rdf:io");
const defaultFetchTtlHeaders = new Headers();
defaultFetchTtlHeaders.set("Accept", "text/turtle");
const fetchTtl = async (url, allow404 = false, headers = defaultFetchTtlHeaders, allowEmptyEtag = true) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, { headers });
    if (allow404 && response.status == 404) {
      resolve({ store: rdf.graph(), etag: null });
      return;
    }
    if (response.status != 200) {
      reject(new Error("cannot fetch " + url));
      return;
    }
    const etag = response.headers.get("etag");
    if (!allowEmptyEtag && !etag) {
      reject(new Error("no etag returned from " + url));
      return;
    }
    const body = await response.text();
    const store = rdf.graph();
    try {
      rdf.parse(body, store, rdf.Store.defaultGraphURI, "text/turtle");
    } catch {
      reject(new Error("cannot parse result of " + url + " in ttl"));
      return;
    }
    resolve({ store, etag });
  });
};
const defaultPutTtlHeaders = new Headers();
defaultPutTtlHeaders.set("Content-Type", "text/turtle");
const shapesMap = {};
function ShapeFetcher(shapeQname, entityQname, config) {
  const [loadingState, setLoadingState] = useState({ status: "idle", error: void 0 });
  const [shape, setShape] = useState();
  const [current, setCurrent] = useState(shapeQname);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  useEffect(() => {
    if (current != shapeQname) {
      reset();
    }
  });
  const reset = () => {
    setCurrent(shapeQname);
    setShape(void 0);
    setLoadingState({ status: "idle", error: void 0 });
  };
  useEffect(() => {
    if (shape && shapeQname === current && loadingState.status === "fetched") {
      return;
    }
    if (shapeQname in shapesMap) {
      setLoadingState({ status: "fetched", error: void 0 });
      setShape(shapesMap[shapeQname]);
      return;
    }
    async function fetchResource(shapeQname2) {
      setLoadingState({ status: "fetching", error: void 0 });
      const shapeNode = rdf.sym(config.prefixMap.uriFromQname(shapeQname2));
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
        debug$8("shape error:", e);
        setLoadingState({ status: "error", error: "error fetching shape or ontology" });
      }
    }
    if (current === shapeQname)
      fetchResource(shapeQname);
  }, [current, entities]);
  const retVal = shapeQname === current && shape && shapeQname == shape.qname ? { loadingState, shape, reset } : { loadingState: { status: "loading", error: void 0 }, shape: void 0, reset };
  return retVal;
}
function EntityFetcher(entityQname, shapeQname, config, unmounting = { val: false }) {
  const [entityLoadingState, setEntityLoadingState] = useState({ status: "idle", error: void 0 });
  const [entity, setEntity] = useState(Subject.createEmpty());
  const [uiReady, setUiReady] = useRecoilState(uiReadyState);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [sessionLoaded, setSessionLoaded] = useRecoilState(sessionLoadedState);
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"));
  const [profileId, setProfileId] = useRecoilState(profileIdState);
  const [current, setCurrent] = useState(entityQname);
  const [reloadEntity, setReloadEntity] = useRecoilState(reloadEntityState);
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState);
  useEffect(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  useEffect(() => {
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
  useEffect(() => {
    if (unmounting.val)
      return;
    async function fetchResource(entityQname2) {
      setEntityLoadingState({ status: "fetching", error: void 0 });
      debug$8("fetching", entity, shapeQname, entityQname2, entities);
      let loadRes, useLocal, notFound, etag, res, needsSaving;
      const localEntities = await config.getUserLocalEntities();
      if (reloadEntity !== entityQname2 && shapeQname && localEntities[entityQname2] !== void 0) {
        useLocal = window.confirm("found previous local edits for this resource, load them?");
        const store = rdf.graph();
        if (useLocal) {
          try {
            rdf.parse(localEntities[entityQname2].ttl, store, rdf.Store.defaultGraphURI, "text/turtle");
            etag = localEntities[entityQname2].etag;
            needsSaving = localEntities[entityQname2].needsSaving;
            debug$8("nS:", needsSaving);
          } catch (e) {
            debug$8(e);
            debug$8(localEntities[entityQname2]);
            window.alert("could not load local data, fetching remote version");
            useLocal = false;
            delete localEntities[entityQname2];
          }
        } else {
          rdf.parse("", store, rdf.Store.defaultGraphURI, "text/turtle");
        }
        res = { store, etag };
      }
      const entityUri = config.prefixMap.uriFromQname(entityQname2);
      const entityNode = rdf.sym(entityUri);
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
              state: EditedEntityState.NotLoaded,
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
        if (!res)
          res = await loadRes;
        const actualQname = entityQname2, actualUri = entityUri;
        let index2 = _entities.findIndex((e) => e.subjectQname === actualQname);
        const newEntities = [..._entities];
        if (index2 === -1) {
          newEntities.push({
            subjectQname: actualQname,
            state: EditedEntityState.Loading,
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
            state: EditedEntityState.Saved,
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
        debug$8("e:", e.message, e);
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
      (e) => e.subjectQname === entityQname || entityQname == "tmp:user" && e.subjectQname === profileId
    );
    if (reloadEntity === entityQname && !entities[index].subject || current === entityQname && (index === -1 || entities[index] && !entities[index].subject)) {
      if (entityQname != "tmp:user" || idToken)
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
  }, [current, shapeQname, idToken, profileId, reloadEntity]);
  const retVal = entityQname === current ? { entityLoadingState, entity, reset } : { entityLoadingState: { status: "loading", error: void 0 }, entity: Subject.createEmpty(), reset };
  return retVal;
}

const MDIcon = (props) => /* @__PURE__ */ jsx(Img, {
  src: "/icons/Markdown-mark.svg",
  ...props
});
const AddIcon = AddCircleOutlineIcon;
const RemoveIcon = RemoveCircleOutlineIcon;

const debug$7 = require("debug")("rde:rdf:lang");
const ValueByLangToStrPrefLang = (vbl, prefLang) => {
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
const cache = {};
const langsWithDefault = (defaultLanguage, langs) => {
  if (defaultLanguage in cache)
    return cache[defaultLanguage];
  let res = langs.filter((l) => l.value === defaultLanguage);
  if (!res?.length) {
    debug$7("can't find defaultLanguage ", defaultLanguage, " in languages");
    return langs;
  }
  res = res.concat(langs.filter((l) => l.value !== defaultLanguage));
  cache[defaultLanguage] = res;
  return res;
};

const debug$6 = require("debug")("rde:entity:container:ValueList");
function replaceItemAtIndex$1(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
const PropertyContainer = ({ property, subject, embedded, force, editable, owner, topEntity, shape, siblingsPath, config }) => {
  property.objectType;
  const [css, setCss] = useState("");
  const setCssClass = (txt, add = true) => {
    if (add) {
      if (!css.includes(txt))
        setCss(css + txt + " ");
    } else {
      if (css.includes(txt))
        setCss(css.replace(new RegExp(txt), ""));
    }
  };
  return /* @__PURE__ */ jsx(React.Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      role: "main",
      ...css ? { className: css } : {},
      children: /* @__PURE__ */ jsx("section", {
        className: "album",
        children: /* @__PURE__ */ jsx("div", {
          className: "container" + (embedded ? " px-0" : "") + " editable-" + editable,
          style: { border: "dashed 1px none" },
          children: /* @__PURE__ */ jsx(ValueList, {
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
          })
        })
      })
    })
  });
};
const MinimalAddButton = ({ add, className, disable }) => {
  return /* @__PURE__ */ jsx("div", {
    className: "minimalAdd disable_" + disable + (className !== void 0 ? className : " text-right"),
    children: /* @__PURE__ */ jsx("button", {
      className: "btn btn-link ml-2 px-0",
      onClick: (ev) => add(ev, 1),
      ...disable ? { disabled: true } : {},
      children: /* @__PURE__ */ jsx(AddIcon, {})
    })
  });
};
const BlockAddButton = ({ add, label, count = 1 }) => {
  const [n, setN] = useState(1);
  const [disable, setDisable] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "blockAdd text-center pb-1 mt-3",
    style: { width: "100%", ...count > 1 ? { display: "flex" } : {} },
    children: [
      /* @__PURE__ */ jsx("button", {
        className: "btn btn-sm btn-block btn-outline-primary px-0",
        style: {
          boxShadow: "none",
          pointerEvents: disable ? "none" : "auto",
          ...disable ? { opacity: 0.5, pointerEvents: "none" } : {}
        },
        onClick: (e) => add(e, n),
        children: /* @__PURE__ */ jsxs(Fragment, {
          children: [
            i18n.t("general.add_another", { val: label, count }),
            "\xA0",
            /* @__PURE__ */ jsx(AddIcon, {})
          ]
        })
      }),
      count > 1 && /* @__PURE__ */ jsx(TextField, {
        label: /* @__PURE__ */ jsx(Fragment, {
          children: i18n.t("general.add_nb", { val: label })
        }),
        style: { width: 200 },
        value: n,
        className: "ml-2",
        type: "number",
        InputLabelProps: { shrink: true },
        onChange: (e) => setN(Number(e.target.value)),
        InputProps: { inputProps: { min: 1, max: 500 } }
      })
    ]
  });
};
const generateDefault = async (property, parent, RIDprefix, idToken, val = "", config) => {
  switch (property.objectType) {
    case ObjectType.ResExt:
      return new ExtRDFResourceWithLabel("tmp:uri", {}, {}, config);
    case ObjectType.Internal:
      if (property.targetShape == null)
        throw "no target shape for " + property.uri;
      return generateSubnode(property.targetShape, parent);
    case ObjectType.ResInList:
      if (property.defaultValue)
        return new ExtRDFResourceWithLabel(property.defaultValue.value, {}, {}, config);
      if (!property.minCount)
        return noneSelected;
      const propIn = property.in;
      if (!propIn)
        throw "can't find a list for " + property.uri;
      return propIn[0];
    case ObjectType.LitInList:
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
    case ObjectType.Literal:
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
  }
};
const ValueList = ({ subject, property, embedded, force, editable, owner, topEntity, shape, siblingsPath, setCssClass, config }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [unsortedList, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang] = useRecoilState(uiLangState);
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"));
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState);
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang);
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang);
  const [undos, setUndos] = useRecoilState(uiUndosState);
  useRecoilState(entitiesAtom);
  const sortOnPath = property?.sortOnProperty?.value;
  const orderedList = useRecoilValue(
    orderedByPropSelector({
      atom: subject.getAtomForProperty(property.path.sparqlString),
      propertyPath: sortOnPath || ""
    })
  );
  let list = unsortedList;
  if (orderedList.length)
    list = orderedList;
  const withOrder = shape.properties.filter((p) => p.sortOnProperty?.value === property.path?.sparqlString);
  let newVal = useRecoilValue(
    orderedNewValSelector({
      atom: withOrder.length && withOrder[0].path ? (topEntity ? topEntity : subject).getAtomForProperty(withOrder[0].path.sparqlString) : null,
      propertyPath: property.path.sparqlString
    })
  );
  if (newVal != "") {
    const newValNum = Number(newVal);
    if (property.minInclusive && newValNum < property.minInclusive)
      newVal = property.minInclusive.toString();
    if (property.maxInclusive && newValNum > property.maxInclusive)
      newVal = property.maxInclusive.toString();
  }
  const [getESfromRecoil, setESfromRecoil] = useRecoilState(ESfromRecoilSelector({}));
  const updateEntityState = (status, id, removingFacet = false, forceRemove = false) => {
    if (id === void 0)
      throw new Error("id undefined");
    const entityQname = topEntity ? topEntity.qname : subject.qname;
    const undo = undos[defaultPrefixMap.uriFromQname(entityQname)];
    const hStatus = getHistoryStatus(defaultPrefixMap.uriFromQname(entityQname));
    setESfromRecoil({ property, subject, entityQname, undo, hStatus, status, id, removingFacet, forceRemove });
  };
  const alreadyHasEmptyValue = () => {
    for (const val of list) {
      if (val instanceof LiteralWithId && val.value === "")
        return true;
      if (val instanceof RDFResourceWithLabel && val.node.value === "tmp:none")
        return true;
    }
    return false;
  };
  const canAdd = !editable || alreadyHasEmptyValue() || property.readOnly && property.readOnly === true || property.displayPriority && property.displayPriority > 1 ? false : property.objectType != ObjectType.ResExt && property.maxCount ? list.length < property.maxCount : true;
  const canDel = (!property.minCount || property.minCount < list.length) && !property.readOnly && editable;
  const onChange = (value, idx, removeFirst) => {
    const newList = replaceItemAtIndex$1(list, idx, value);
    setList(newList);
  };
  const exists = useCallback(
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
  useEffect(() => {
    if (list.length) {
      const first = list[0];
      if (first instanceof ExtRDFResourceWithLabel && first.uri !== "tmp:uri" && first.uri !== "tmp:none")
        firstValueIsEmptyField = false;
    }
    const vals = subject.getUnitializedValues(property);
    if (vals && vals.length) {
      if (property.minCount && vals.length < property.minCount) {
        const setListAsync = async () => {
          const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config);
          if (topEntity)
            topEntity.noHisto();
          else if (owner)
            owner.noHisto();
          else
            subject.noHisto();
          setList(vals.concat(Array.isArray(res) ? res : [res]));
        };
        setListAsync();
      } else {
        setList(vals);
      }
    } else if (property.objectType != ObjectType.ResInList && property.objectType != ObjectType.LitInList && property.objectType != ObjectType.Internal && (!property.displayPriority || property.displayPriority === 0 || property.displayPriority === 1 && (list.length || force)) && (property.minCount && list.length < property.minCount || !list.length || !firstValueIsEmptyField) && (!property.maxCount || property.maxCount >= list.length)) {
      if (!firstValueIsEmptyField) {
        const setListAsync = async () => {
          const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config);
          if (topEntity)
            topEntity.noHisto();
          else if (owner)
            owner.noHisto();
          else
            subject.noHisto();
          setList((oldList) => (Array.isArray(res) ? res : [res]).concat(oldList));
        };
        setListAsync();
      } else {
        const setListAsync = async () => {
          const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config);
          if (topEntity)
            topEntity.noHisto();
          else if (owner)
            owner.noHisto();
          else
            subject.noHisto();
          setList((oldList) => oldList.concat(Array.isArray(res) ? res : [res]));
        };
        setListAsync();
      }
    } else if (property.objectType == ObjectType.Internal && property.minCount && list.length < property.minCount) {
      const setListAsync = async () => {
        const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config);
        if (topEntity)
          topEntity.noHisto();
        else if (owner)
          owner.noHisto();
        else
          subject.noHisto();
        setList((oldList) => (Array.isArray(res) ? res : [res]).concat(oldList));
      };
      setListAsync();
    } else if (property.objectType != ObjectType.ResInList && property.objectType != ObjectType.LitInList && property.displayPriority && property.displayPriority === 1 && list.length === 1 && !force) ; else if (!list.length && (property.objectType == ObjectType.ResInList || property.objectType == ObjectType.LitInList)) {
      const setListAsync = async () => {
        const res = await generateDefault(property, subject, RIDprefix, idToken, newVal.toString(), config);
        if (topEntity)
          topEntity.noHisto();
        else if (owner)
          owner.noHisto();
        else
          subject.noHisto();
        setList(Array.isArray(res) ? res : [res]);
      };
      setListAsync();
    }
  }, [subject, list, force]);
  let addBtn = property.objectType === ObjectType.Internal;
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
  useEffect(() => {
    if (setCssClass) {
      if (!hasNonEmptyValue)
        setCssClass("unset", true);
      else
        setCssClass("unset", false);
    }
  }, [hasNonEmptyValue]);
  const showLabel = !property.displayPriority || property.displayPriority === 0 || property.displayPriority === 1 && (force || list.length > 1 || hasNonEmptyValue) || property.displayPriority === 2 && (list.length >= 1 || hasNonEmptyValue);
  const scrollElem = useRef(null);
  const [edit, setEdit] = useRecoilState(uiEditState);
  useEffect(() => {
    if (property?.group?.value !== edit && scrollElem?.current) {
      scrollElem.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [edit]);
  const hasEmptyExtEntityAsFirst = list.length > 0 && list[0] instanceof RDFResourceWithLabel && property.objectType == ObjectType.ResExt && list[0].uri === "tmp:uri";
  const titleCase = (s) => {
    if (!s)
      return s;
    return s[0].toUpperCase() + s.substring(1);
  };
  const canPush = property.allowPushToTopLevelLabel;
  const isUniqueValueAmongSiblings = useRecoilValue(
    isUniqueTestSelector({
      checkUnique: property.uniqueValueAmongSiblings,
      siblingsAtom: siblingsPath ? (owner ? owner : subject).getAtomForProperty(siblingsPath) : initListAtom,
      propertyPath: property.path.sparqlString
    })
  );
  const renderListElem = useMemo(
    () => (val, i, nbvalues) => {
      if (val instanceof RDFResourceWithLabel || property.objectType == ObjectType.ResInList || property.objectType == ObjectType.LitInList) {
        if (property.objectType == ObjectType.ResExt)
          return /* @__PURE__ */ jsx(ExtEntityComponent, {
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
          }, val.id + ":" + i);
        else if (val instanceof LiteralWithId || val instanceof RDFResourceWithLabel) {
          addBtn = false;
          const canSelectNone = i == 0 && !property.minCount || i > 0 && i == nbvalues - 1;
          return /* @__PURE__ */ jsx(SelectComponent, {
            canSelectNone,
            subject,
            property,
            res: val,
            selectIdx: i,
            canDel: canDel && val != noneSelected,
            editable,
            create: canAdd ? /* @__PURE__ */ jsx(Create, {
              subject,
              property,
              embedded,
              newVal: Number(newVal),
              shape,
              config
            }) : void 0,
            updateEntityState
          }, "select_" + val.id + "_" + i);
        }
      } else if (val instanceof Subject) {
        addBtn = true;
        return /* @__PURE__ */ jsx(FacetComponent, {
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
        }, val.id);
      } else if (val instanceof LiteralWithId) {
        addBtn = false;
        const isUniqueLang = list.filter((l) => l instanceof LiteralWithId && l.language === val.language).length === 1;
        return /* @__PURE__ */ jsx(LiteralComponent, {
          subject,
          property,
          lit: val,
          ...{ canDel, isUniqueLang, isUniqueValueAmongSiblings },
          create: /* @__PURE__ */ jsx(Create, {
            disable: !canAdd || !(val && val.value !== ""),
            subject,
            property,
            embedded,
            newVal: Number(newVal),
            shape,
            config
          }),
          editable,
          topEntity,
          updateEntityState,
          config
        }, val.id);
      }
    },
    void 0
  );
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "ValueList " + (property.maxCount && property.maxCount < list.length ? "maxCount" : "") + (hasNonEmptyValue ? "" : "empty") + (property.objectType === ObjectType.ResExt ? " ResExt" : "") + (embedded ? "" : " main") + (canPush ? " canPush" : ""),
        "data-priority": property.displayPriority ? property.displayPriority : 0,
        role: "main",
        style: {
          display: "flex",
          flexWrap: "wrap",
          ...list.length > 1 && firstValueIsEmptyField && property.path.sparqlString !== SKOS("prefLabel").value ? {} : {}
        },
        children: [
          showLabel && (!property.in || property.in.length > 1) && /* @__PURE__ */ jsxs("label", {
            className: "propLabel",
            "data-prop": property.qname,
            "data-type": property.objectType,
            "data-priority": property.displayPriority,
            children: [
              titleCase(propLabel),
              helpMessage && property.objectType === ObjectType.ResExt && /* @__PURE__ */ jsx(Tooltip, {
                title: helpMessage,
                children: /* @__PURE__ */ jsx(HelpIcon, {
                  className: "help label"
                })
              })
            ]
          }),
          hasEmptyExtEntityAsFirst && /* @__PURE__ */ jsx("div", {
            style: { width: "100%" },
            children: renderListElem(list[0], 0, list.length)
          }),
          /* @__PURE__ */ jsx("div", {
            ref: scrollElem,
            className: !embedded && property.objectType !== ObjectType.Internal ? "overFauto" : "",
            style: {
              width: "100%",
              ...property?.group?.value !== edit ? { paddingRight: "0.5rem" } : {}
            },
            children: list.map((val, i) => {
              if (!hasEmptyExtEntityAsFirst || i > 0)
                return renderListElem(val, i, list.length);
            })
          })
        ]
      }),
      canAdd && addBtn && /* @__PURE__ */ jsx(Create, {
        subject,
        property,
        embedded,
        newVal: Number(newVal),
        shape,
        config
      })
    ]
  });
};
const Create = ({ subject, property, embedded, disable, newVal, shape, config }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  let collecNode = null;
  if (list.length === 1 && list[0] instanceof RDFResource && list[0].node && list[0].node instanceof rdf.Collection) {
    collecNode = list[0].node;
  }
  const collec = collecNode?.termType === "Collection" ? collecNode?.elements : void 0;
  const listOrCollec = collec ? collec : list;
  const [uiLang] = useRecoilState(uiLangState);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [uiTab] = useRecoilState(uiTabState);
  entities.findIndex((e, i) => i === uiTab);
  const [edit, setEdit] = useRecoilState(uiEditState);
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"));
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState);
  useAuth0();
  useRecoilState(reloadEntityState);
  let nextVal = useRecoilValue(
    property.sortOnProperty ? orderedNewValSelector({
      atom: property.sortOnProperty ? subject.getAtomForProperty(property.path.sparqlString) : null,
      propertyPath: property.sortOnProperty.value
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
    if (waitForNoHisto)
      return;
    if (property.objectType === ObjectType.Internal) {
      waitForNoHisto = true;
      subject.noHisto(false, 1);
    }
    const item = await generateDefault(property, subject, RIDprefix, idToken, newVal?.toString(), config);
    setList([...listOrCollec, item]);
    if (property.objectType === ObjectType.Internal && item instanceof Subject) {
      setImmediate(() => {
        setEdit(subject.qname + " " + property.qname + " " + item.qname);
      });
      setTimeout(() => {
        subject.noHisto(false, false);
        waitForNoHisto = false;
      }, 350);
    }
  };
  if (property.objectType !== ObjectType.Internal && (embedded || property.objectType == ObjectType.Literal || property.objectType == ObjectType.ResInList || property.objectType == ObjectType.LitInList))
    return /* @__PURE__ */ jsx(MinimalAddButton, {
      disable,
      add: addItem,
      className: " "
    });
  else {
    const targetShapeLabels = property.targetShape?.targetClassPrefLabels;
    const labels = targetShapeLabels ? targetShapeLabels : property.prefLabels;
    const count = property.allowBatchManagement ? 2 : 1;
    return /* @__PURE__ */ jsx(BlockAddButton, {
      add: addItem,
      label: ValueByLangToStrPrefLang(labels, uiLang),
      count
    });
  }
};
const useStyles$1 = makeStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: theme.palette.secondary.main
    }
  }
}));
const EditLangString = ({ property, lit, onChange, label, globalError, editable, updateEntityState, entity, index, config }) => {
  useStyles$1();
  const [editMD, setEditMD] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const canPushPrefLabel = property.allowPushToTopLevelLabel;
  const getLangStringError = (val) => {
    let err = "";
    if (!val && property.minCount)
      err = i18n.t("error.empty");
    else if (globalError)
      err = globalError;
    return err;
  };
  const [error, setError] = useState(null);
  useEffect(() => {
    const newError = getLangStringError(lit.value);
    if (newError != error) {
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
      setError(newError);
    }
  });
  useEffect(() => {
    return () => {
      const inOtherEntity = !window.location.href.includes("/" + entity.qname + "/");
      if (!inOtherEntity)
        updateEntityState(EditedEntityState.Saved, lit.id, false, !inOtherEntity);
    };
  }, []);
  ({
    helperText: /* @__PURE__ */ jsxs(React.Fragment, {
      children: [
        /* @__PURE__ */ jsx(ErrorIcon, {
          style: { fontSize: "20px", verticalAlign: "-7px" }
        }),
        "\xA0",
        /* @__PURE__ */ jsx("i", {
          children: error
        })
      ]
    }),
    error: true
  });
  const [preview, setPreview] = useState(null);
  useLayoutEffect(() => {
    if (document.activeElement === inputRef.current) {
      const { value, error: error2 } = config.previewLiteral(lit, uiLang);
      setPreview(value);
      setError(error2);
    } else {
      setPreview(null);
    }
  });
  let padBot = "0px";
  if (preview) {
    padBot = "40px";
  } else if (property.singleLine && editMD) {
    padBot = "1px";
  }
  const codeEdit = { ...commands.codeEdit, icon: /* @__PURE__ */ jsx(EditIcon, {
    style: { width: "12px", height: "12px" }
  }) }, codePreview = { ...commands.codePreview, icon: /* @__PURE__ */ jsx(VisibilityIcon, {
    style: { width: "12px", height: "12px" }
  }) };
  const hasKB = config.possibleLiteralLangs.filter((l) => l.value === lit.language);
  const inputRef = useRef();
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
  const [prefLabels, setPrefLabels] = useRecoilState(prefLabelAtom);
  const [uiLang] = useRecoilState(uiLangState);
  const pushAsPrefLabel = () => {
    let newPrefLabels = [], found = false;
    for (const l in prefLabels) {
      if (prefLabels[l] instanceof LiteralWithId) {
        const litWi = prefLabels[l];
        if (litWi.language === lit.language) {
          found = true;
          newPrefLabels = replaceItemAtIndex$1(prefLabels, Number(l), lit);
          break;
        }
      }
    }
    if (!found)
      newPrefLabels = [...prefLabels, lit.copy()];
    if (newPrefLabels.length)
      setPrefLabels(newPrefLabels);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "mb-0" + (preview ? " withPreview" : ""),
    style: {
      display: "flex",
      width: "100%",
      alignItems: "flex-end",
      paddingBottom: padBot,
      position: "relative"
    },
    children: [
      canPushPrefLabel && !error && !globalError && /* @__PURE__ */ jsx("span", {
        className: "canPushPrefLabel",
        children: /* @__PURE__ */ jsx("span", {
          onClick: pushAsPrefLabel,
          children: /* @__PURE__ */ jsx(Tooltip, {
            title: /* @__PURE__ */ jsx(Fragment, {
              children: "Use as the main name or title for this language"
            }),
            children: /* @__PURE__ */ jsx("span", {
              className: "img"
            })
          }, lit.id)
        })
      }),
      (property.singleLine || !editMD) && /* @__PURE__ */ jsxs("div", {
        style: { width: "100%", position: "relative" },
        children: [
          /* @__PURE__ */ jsx(TextField, {
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
                updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
              onChange(lit.copyWithUpdatedValue(e.target.value));
            },
            ...error ? { error: true, helperText: error } : {},
            ...!editable ? { disabled: true } : {},
            onFocus: () => {
              const { value, error: error2 } = config.previewLiteral(lit, uiLang);
              setPreview(value);
              setError(error2);
            },
            onBlur: () => {
              setPreview(null);
              setTimeout(() => {
                if (inputRef.current && document.activeElement != inputRef.current)
                  setKeyboard(false);
              }, 350);
            }
          }),
          property.allowMarkDown && /* @__PURE__ */ jsxs("span", {
            className: "opaHover",
            style: { position: "absolute", right: 0, top: 0, fontSize: "0px" },
            onClick: () => setEditMD(!editMD),
            children: [
              !editMD && /* @__PURE__ */ jsx(MDIcon, {
                style: { height: "16px" }
              }),
              editMD && /* @__PURE__ */ jsx(MDIcon, {
                style: { height: "16px" }
              })
            ]
          }),
          hasKB.length > 0 && hasKB[0].keyboard && /* @__PURE__ */ jsx("span", {
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
            children: /* @__PURE__ */ jsx(KeyboardIcon, {})
          }),
          hasKB.length > 0 && hasKB[0].keyboard && keyboard && /* @__PURE__ */ jsx("div", {
            className: "card px-2 py-2 hasKB",
            style: { display: "block", width: "405px" },
            onClick: keepFocus,
            children: hasKB[0].keyboard.map((k, i) => /* @__PURE__ */ jsx("span", {
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
            }, i))
          })
        ]
      }),
      !property.singleLine && editMD && /* @__PURE__ */ jsxs("div", {
        style: { width: "100%", position: "relative", paddingBottom: "1px" },
        children: [
          /* @__PURE__ */ jsx(MDEditor, {
            textareaProps: { spellCheck: "true", lang: lit.language === "en" ? "en_US" : lit.language },
            value: lit.value,
            preview: "edit",
            onChange: (e) => {
              if (e)
                onChange(lit.copyWithUpdatedValue(e));
            },
            commands: [
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.title,
              commands.divider,
              commands.link,
              commands.quote,
              commands.code,
              commands.image,
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
              commands.divider,
              codeEdit,
              codePreview
            ],
            extraCommands: []
          }),
          /* @__PURE__ */ jsx("span", {
            className: "opaHover on",
            style: { position: "absolute", right: "5px", top: "7px", fontSize: "0px", cursor: "pointer" },
            onClick: () => setEditMD(!editMD),
            children: /* @__PURE__ */ jsx(MDIcon, {
              style: { height: "15px" },
              title: "Use rich text editor"
            })
          })
        ]
      }),
      /* @__PURE__ */ jsx(LangSelect, {
        onChange: (value) => {
          onChange(lit.copyWithUpdatedLanguage(value));
        },
        value: lit.language || "",
        property,
        ...error ? { error: true } : {},
        editable,
        config
      }),
      preview && /* @__PURE__ */ jsx("div", {
        className: "preview-ewts",
        children: /* @__PURE__ */ jsx(TextField, {
          disabled: true,
          value: preview
        })
      })
    ]
  });
};
const LangSelect = ({ onChange, value, property, disabled, error, editable, config }) => {
  const onChangeHandler = (event) => {
    onChange(event.target.value);
  };
  const languages = property?.defaultLanguage ? langsWithDefault(property.defaultLanguage, config.possibleLiteralLangs) : config.possibleLiteralLangs;
  return /* @__PURE__ */ jsx("div", {
    style: { position: "relative" },
    children: /* @__PURE__ */ jsxs(TextField, {
      select: true,
      InputLabelProps: { shrink: true },
      className: "ml-2",
      value,
      style: { minWidth: 100, flexShrink: 0, marginTop: "5px" },
      onChange: onChangeHandler,
      ...disabled ? { disabled: true } : {},
      ...error ? { error: true, helperText: /* @__PURE__ */ jsx("br", {}) } : {},
      ...!editable ? { disabled: true } : {},
      children: [
        languages.map((option) => /* @__PURE__ */ jsx(MenuItem, {
          value: option.value,
          children: option.value
        }, option.value)),
        !languages.some((l) => l.value === value) && /* @__PURE__ */ jsx(MenuItem, {
          value,
          children: value
        }, value)
      ]
    })
  });
};
const EditString = ({ property, lit, onChange, label, editable, updateEntityState, entity, index, config }) => {
  useStyles$1();
  const [uiLang] = useRecoilState(uiLangState);
  property.datatype;
  const pattern = property.pattern ? new RegExp(property.pattern) : void 0;
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const getPatternError = (val) => {
    let err = "";
    if (pattern !== void 0 && val !== "" && !val.match(pattern)) {
      err = ValueByLangToStrPrefLang(property.errorMessage, uiLang);
      debug$6("err:", property.errorMessage);
    }
    return err;
  };
  let timerPreview = 0;
  let changeCallback = (val) => {
    return;
  };
  useEffect(() => {
    changeCallback = (val) => {
      if (val === "") {
        setError(null);
        setPreview(null);
        updateEntityState(EditedEntityState.Saved, lit.id);
      } else {
        if (timerPreview)
          window.clearTimeout(timerPreview);
        const delay = 350;
        timerPreview = window.setTimeout(() => {
          const obj = config.previewLiteral(new rdf.Literal(val, lit.language, lit.datatype), uiLang);
          const { value } = obj;
          let { error: error2 } = obj;
          setPreview(value);
          if (!error2)
            error2 = getPatternError(val);
          setError(error2);
          updateEntityState(error2 ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
        }, delay);
      }
      onChange(lit.copyWithUpdatedValue(val));
    };
  });
  const getEmptyStringError = (val) => {
    if (!val && property.minCount)
      return;
    /* @__PURE__ */ jsxs(Fragment, {
      children: [
        /* @__PURE__ */ jsx(ErrorIcon, {
          style: { fontSize: "20px", verticalAlign: "-7px" }
        }),
        " ",
        /* @__PURE__ */ jsx("i", {
          children: /* @__PURE__ */ jsx(Fragment, {
            children: i18n.t("error.empty")
          })
        })
      ]
    });
    return null;
  };
  useEffect(() => {
    const newError = error || getEmptyStringError(lit.value);
    if (newError != error) {
      setError(newError);
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
    }
  });
  return /* @__PURE__ */ jsxs("div", {
    style: { display: "flex", flexDirection: "column", width: "100%" },
    children: [
      /* @__PURE__ */ jsx(TextField, {
        variant: "standard",
        label,
        style: { width: "100%" },
        value: lit.value,
        ...property.qname !== "bds:NoteShape-contentLocationStatement" ? { InputLabelProps: { shrink: true } } : {},
        onBlur: (e) => setPreview(null),
        onFocus: (e) => changeCallback(e.target.value),
        onChange: (e) => changeCallback(e.target.value),
        ...!editable ? { disabled: true } : {},
        ...error ? { error: true, helperText: error } : {}
      }),
      preview && /* @__PURE__ */ jsx("div", {
        className: "preview-EDTF",
        style: { width: "100%" },
        children: /* @__PURE__ */ jsx("pre", {
          children: preview
        })
      })
    ]
  });
};
const EditBool = ({ property, lit, onChange, label, editable }) => {
  useStyles$1();
  property.datatype;
  let val = !lit.value || lit.value == "false" || lit.value == "0" ? false : true;
  if (property.defaultValue === null && lit.value == "")
    val = "unset";
  const changeCallback = (val2) => {
    onChange(lit.copyWithUpdatedValue(val2 == "false" ? "0" : "1"));
  };
  return /* @__PURE__ */ jsx(TextField, {
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
    children: ["true", "false"].concat(val === "unset" ? [val] : []).map((v) => /* @__PURE__ */ jsx(MenuItem, {
      value: v,
      children: i18n.t("types." + v)
    }, v))
  });
};
const EditInt = ({ property, lit, onChange, label, editable, updateEntityState, hasNoOtherValue, index, globalError }) => {
  useStyles$1();
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
      err = i18n.t("error.empty");
    } else if (val !== void 0 && val !== "") {
      const valueInt = parseInt(val);
      if (minInclusive && minInclusive > valueInt) {
        err = i18n.t("error.superiorTo", { val: minInclusive });
      } else if (maxInclusive && maxInclusive < valueInt) {
        err = i18n.t("error.inferiorTo", { val: maxInclusive });
      } else if (minExclusive && minExclusive >= valueInt) {
        err = i18n.t("error.superiorToStrict", { val: minExclusive });
      } else if (maxExclusive && maxExclusive <= valueInt) {
        err = i18n.t("error.inferiorToStrict", { val: maxExclusive });
      }
    }
    return err;
  };
  const [error, setError] = useState("");
  useEffect(() => {
    if (!hasNoOtherValue && (lit.value === void 0 || lit.value === null || lit.value === ""))
      return;
    const newError = getIntError(lit.value);
    if (newError != error) {
      setError(newError);
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
    }
  });
  const changeCallback = (val) => {
    const newError = getIntError(val);
    if (newError != error)
      setError(newError);
    else
      updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, lit.id);
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
  return /* @__PURE__ */ jsx(TextField, {
    label,
    style: { width: 240 },
    value,
    ...error ? {
      helperText: /* @__PURE__ */ jsxs(React.Fragment, {
        children: [
          /* @__PURE__ */ jsx(ErrorIcon, {
            style: { fontSize: "20px", verticalAlign: "-7px" }
          }),
          /* @__PURE__ */ jsxs("i", {
            children: [
              " ",
              error
            ]
          })
        ]
      }),
      error: true
    } : {},
    type: "number",
    InputProps: { inputProps: { min: minInclusive, max: maxInclusive } },
    InputLabelProps: { shrink: true },
    onChange: (e) => changeCallback(e.target.value),
    ...!editable ? { disabled: true } : {}
  });
};
const xsdgYear = XSD("gYear").value;
const rdflangString = RDF("langString").value;
const xsdinteger = XSD("integer").value;
const xsddecimal = XSD("decimal").value;
const xsdint = XSD("int").value;
const xsdboolean = XSD("boolean").value;
const intishTypeList = [xsdinteger, xsddecimal, xsdint];
const LiteralComponent = ({
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
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  const index = list.findIndex((listItem) => listItem === lit);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [undos, setUndos] = useRecoilState(uiUndosState);
  const [uiLang] = useRecoilState(uiLangState);
  const propLabel = ValueByLangToStrPrefLang(property.prefLabels, uiLang);
  const helpMessage = ValueByLangToStrPrefLang(property.helpMessage, uiLang);
  const onChange = (value) => {
    const newList = replaceItemAtIndex$1(list, index, value);
    setList(newList);
  };
  const deleteItem = () => {
    const newList = removeItemAtIndex(list, index);
    setList(newList);
    updateEntityState(EditedEntityState.Saved, lit.id);
  };
  useEffect(() => {
    let error = false;
    const entityQname = topEntity ? topEntity.qname : subject.qname;
    const n = entities.findIndex((e) => e.subjectQname === entityQname);
    if (n > -1) {
      const ent = entities[n];
      if (ent.state === EditedEntityState.Error)
        error = true;
    }
    if (!error && (!errors[entityQname] || !Object.keys(errors[entityQname]).length)) {
      updateEntityState(EditedEntityState.Saved, lit.id);
    }
  }, [undos]);
  const t = property.datatype;
  let edit, classN;
  if (t?.value === rdflangString) {
    classN = "langString " + (lit.value ? "lang-" + lit.language : "");
    edit = /* @__PURE__ */ jsx(EditLangString, {
      property,
      lit,
      onChange,
      label: [
        propLabel,
        helpMessage ? /* @__PURE__ */ jsx(Tooltip, {
          title: helpMessage,
          children: /* @__PURE__ */ jsx(HelpIcon, {
            className: "help literal"
          })
        }, lit.id) : null
      ],
      ...property.uniqueLang && !isUniqueLang ? { globalError: i18n.t("error.unique") } : {},
      editable: editable && !property.readOnly,
      updateEntityState,
      entity: topEntity ? topEntity : subject,
      index,
      config
    });
  } else if (t?.value === xsdgYear || t && t?.value && intishTypeList.includes(t.value)) {
    classN = "gYear intish";
    edit = /* @__PURE__ */ jsx(EditInt, {
      property,
      lit,
      onChange,
      label: [
        propLabel,
        helpMessage ? /* @__PURE__ */ jsx(Tooltip, {
          title: helpMessage,
          children: /* @__PURE__ */ jsx(HelpIcon, {
            className: "help literal"
          })
        }, lit.id) : null
      ],
      editable: editable && !property.readOnly,
      updateEntityState,
      hasNoOtherValue: property.minCount === 1 && list.length === 1,
      index,
      ...property.uniqueValueAmongSiblings && !isUniqueValueAmongSiblings ? { globalError: i18n.t("error.uniqueV") } : {}
    });
  } else if (t?.value === xsdboolean) {
    edit = /* @__PURE__ */ jsx(EditBool, {
      property,
      lit,
      onChange,
      label: [
        propLabel,
        helpMessage ? /* @__PURE__ */ jsx(Tooltip, {
          title: helpMessage,
          children: /* @__PURE__ */ jsx(HelpIcon, {
            className: "help literal"
          })
        }, lit.id) : null
      ],
      editable: editable && !property.readOnly
    });
  } else {
    edit = /* @__PURE__ */ jsx(EditString, {
      property,
      lit,
      onChange,
      label: [
        propLabel,
        helpMessage ? /* @__PURE__ */ jsx(Tooltip, {
          title: helpMessage,
          children: /* @__PURE__ */ jsx(HelpIcon, {
            className: "help literal"
          })
        }, lit.id) : null
      ],
      editable: editable && !property.readOnly,
      updateEntityState,
      entity: subject,
      index,
      config
    });
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: classN,
      style: { display: "flex", alignItems: "flex-end" },
      children: [
        edit,
        /* @__PURE__ */ jsxs("div", {
          className: "hoverPart",
          children: [
            /* @__PURE__ */ jsx("button", {
              className: "btn btn-link ml-2 px-0 py-0 close-facet-btn",
              onClick: deleteItem,
              ...!canDel ? { disabled: true } : {},
              children: /* @__PURE__ */ jsx(RemoveIcon, {
                className: "my-0 close-facet-btn"
              })
            }),
            create
          ]
        })
      ]
    })
  });
};
const FacetComponent = ({ subNode, subject, property, canDel, editable, topEntity, updateEntityState, shape, config }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang] = useRecoilState(uiLangState);
  const index = list.findIndex((listItem) => listItem === subNode);
  useRecoilState(entitiesAtom);
  const deleteItem = () => {
    updateEntityState(EditedEntityState.Saved, subNode.qname, true);
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
  const [force, setForce] = useState(false);
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
  const [edit, setEdit] = useRecoilState(uiEditState);
  let editClass = "";
  if (edit === subject.qname + " " + property.qname + " " + subNode.qname || edit.startsWith(subNode.qname + " ") || edit.endsWith(" " + subject.qname)) {
    editClass = "edit";
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      className: "facet " + editClass + " editable-" + editable + " force-" + force,
      onClick: (ev) => {
        setEdit(subject.qname + " " + property.qname + " " + subNode.qname);
        const target = ev.target;
        if (editClass || target?.classList && !target?.classList?.contains("close-facet-btn")) {
          ev.stopPropagation();
        }
      },
      children: /* @__PURE__ */ jsxs("div", {
        className: "card pt-2 pb-3 pr-3 mt-4 pl-2 " + (hasExtra ? "hasDisplayPriority" : ""),
        children: [
          targetShape.independentIdentifiers && /* @__PURE__ */ jsx("div", {
            className: "internalId",
            children: subNode.lname
          }),
          withoutDisplayPriority.map((p, index2) => /* @__PURE__ */ jsx(PropertyContainer, {
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
          }, index2 + p.uri)),
          withDisplayPriority.map((p, index2) => /* @__PURE__ */ jsx(PropertyContainer, {
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
          }, index2 + p.uri)),
          hasExtra && /* @__PURE__ */ jsx("span", {
            className: "toggle-btn btn btn-rouge mt-4",
            onClick: toggleExtra,
            children: /* @__PURE__ */ jsx(Fragment, {
              children: i18n.t("general.toggle", { show: force ? i18n.t("general.hide") : i18n.t("general.show") })
            })
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "close-btn",
            children: [
              targetShape.description && /* @__PURE__ */ jsx(Tooltip, {
                title: ValueByLangToStrPrefLang(targetShape.description, uiLang),
                children: /* @__PURE__ */ jsx(HelpIcon, {
                  className: "help"
                })
              }),
              /* @__PURE__ */ jsx("button", {
                className: "btn btn-link ml-2 px-0 close-facet-btn py-0",
                onClick: deleteItem,
                ...!canDel ? { disabled: true } : {},
                children: /* @__PURE__ */ jsx(CloseIcon, {
                  className: "close-facet-btn my-1"
                })
              })
            ]
          })
        ]
      })
    })
  });
};
const ExtEntityComponent = ({
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
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  const index = list.findIndex((listItem) => listItem === extRes);
  useRecoilState(entitiesAtom);
  const deleteItem = () => {
    let newList = removeItemAtIndex(list, index);
    if (idx === 1 && newList.length === 1) {
      const first = newList[0];
      if (first instanceof ExtRDFResourceWithLabel && first.uri === "tmp:uri")
        newList = [];
    }
    setList(newList);
  };
  const [error, setError] = useState("");
  useEffect(() => {
    let newError;
    const nonEmptyList = list.filter((e) => e instanceof RDFResource && e.uri !== "tmp:uri");
    if (property.minCount && nonEmptyList.length < property.minCount) {
      newError = i18n.t("error.minC", { count: property.minCount });
    } else if (property.maxCount && nonEmptyList.length > property.maxCount) {
      newError = i18n.t("error.maxC", { count: property.maxCount });
    } else
      newError = "";
    setError(newError);
    updateEntityState(newError ? EditedEntityState.Error : EditedEntityState.Saved, property.qname);
  }, [list]);
  return /* @__PURE__ */ jsx("div", {
    className: "extEntity" + (extRes.uri === "tmp:uri" ? " new" : ""),
    style: { position: "relative" },
    children: /* @__PURE__ */ jsxs("div", {
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
        /* @__PURE__ */ jsx(config.resourceSelector, {
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
        }),
        extRes.uri !== "tmp:uri" && /* @__PURE__ */ jsx("button", {
          className: "btn btn-link ml-2 px-0",
          onClick: deleteItem,
          ...!canDel ? { disabled: true } : {},
          children: extRes.uri === "tmp:uri" ? /* @__PURE__ */ jsx(RemoveIcon, {}) : /* @__PURE__ */ jsx(CloseIcon, {})
        })
      ]
    })
  });
};
const SelectComponent = ({ res, subject, property, canDel, canSelectNone, selectIdx, editable, create, updateEntityState }) => {
  if (property.path == null)
    throw "can't find path of " + property.qname;
  const [list, setList] = useRecoilState(subject.getAtomForProperty(property.path.sparqlString));
  const [uiLang, setUiLang] = useRecoilState(uiLangState);
  const [uiLitLang, setUiLitLang] = useRecoilState(uiLitLangState);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [uiTab] = useRecoilState(uiTabState);
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
    debug$6("error cannot get element from value " + value);
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
      newList = replaceItemAtIndex$1(list, index, resForNewValue);
    }
    setList(newList);
  };
  useStyles$1();
  if (possibleValues.length == 1 && list.length == 0) {
    setList([possibleValues[0]]);
  }
  const [error, setError] = useState("");
  const valueNotInList = !possibleValues.some((pv) => pv.id === val?.id);
  useEffect(() => {
    if (valueNotInList) {
      setError(i18n.t("error.select", { val: val?.value }));
      updateEntityState(EditedEntityState.Error, property.path?.sparqlString + "_" + selectIdx);
    } else {
      updateEntityState(EditedEntityState.Saved, property.path?.sparqlString + "_" + selectIdx);
    }
  }, [valueNotInList]);
  useEffect(() => {
    return () => {
      const inOtherEntity = !window.location.href.includes("/" + entities[entity]?.subjectQname + "/");
      if (!inOtherEntity)
        updateEntityState(EditedEntityState.Saved, property.path?.sparqlString + "_" + selectIdx, false, !inOtherEntity);
    };
  }, []);
  if (possibleValues.length > 1 || error) {
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "resSelect",
        style: { display: "inline-flex", alignItems: "flex-end" },
        children: [
          /* @__PURE__ */ jsxs(TextField, {
            select: true,
            className: "selector mr-2",
            value: val?.id,
            style: { padding: "1px", minWidth: "250px" },
            onChange,
            label: [
              propLabel,
              helpMessage ? /* @__PURE__ */ jsx(Tooltip, {
                title: helpMessage,
                children: /* @__PURE__ */ jsx(HelpIcon, {
                  className: "help"
                })
              }, "tooltip_" + selectIdx + "_" + index) : null
            ],
            ...error ? {
              helperText: /* @__PURE__ */ jsxs(React.Fragment, {
                children: [
                  /* @__PURE__ */ jsx(ErrorIcon, {
                    style: { fontSize: "20px", verticalAlign: "-7px" }
                  }),
                  /* @__PURE__ */ jsxs("i", {
                    children: [
                      " ",
                      error
                    ]
                  })
                ]
              }),
              error: true
            } : {},
            ...!editable ? { disabled: true } : {},
            children: [
              possibleValues.map((v, k) => {
                if (v instanceof RDFResourceWithLabel) {
                  const r = v;
                  const label = ValueByLangToStrPrefLang(r.prefLabels, uiLitLang);
                  const span = /* @__PURE__ */ jsx("span", {
                    children: label ? label : r.lname
                  });
                  return /* @__PURE__ */ jsx(MenuItem, {
                    value: r.id,
                    className: "withDescription",
                    children: r.description ? /* @__PURE__ */ jsx(Tooltip, {
                      title: ValueByLangToStrPrefLang(r.description, uiLitLang),
                      children: span
                    }) : span
                  }, "menu-uri_" + selectIdx + r.id);
                } else {
                  const l = v;
                  return /* @__PURE__ */ jsx(MenuItem, {
                    value: l.id,
                    className: "withDescription",
                    children: l.value
                  }, "menu-lit_" + selectIdx + l.id + "_" + index + "_" + k);
                }
              }),
              valueNotInList && /* @__PURE__ */ jsx(MenuItem, {
                value: val?.id,
                className: "withDescription",
                style: { color: "red" },
                disabled: true,
                children: val?.value
              }, "extra-val-id")
            ]
          }, "textfield_" + selectIdx + "_" + index),
          /* @__PURE__ */ jsxs("div", {
            className: "hoverPart",
            children: [
              canDel && /* @__PURE__ */ jsx("button", {
                className: "btn btn-link mx-0 px-0 py-0",
                onClick: deleteItem,
                children: /* @__PURE__ */ jsx(RemoveIcon, {})
              }),
              create
            ]
          })
        ]
      })
    });
  }
  return /* @__PURE__ */ jsx(Fragment, {});
};

const debug$5 = require("debug")("rde:entity:propertygroup");
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
function DraggableMarker({
  pos,
  icon,
  setCoords
}) {
  const [position, setPosition] = useState(pos);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
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
  useEffect(() => {
    if (markerRef.current && (markerRef.current.lat != pos.lat || markerRef.current.lng != pos.lng)) {
      markerRef.current.setLatLng(pos);
    }
  });
  return /* @__PURE__ */ jsx(Marker, {
    draggable: true,
    eventHandlers,
    position,
    icon,
    ref: markerRef
  });
}
const MapEventHandler = ({
  coords,
  redraw,
  setCoords,
  config
}) => {
  const map = useMapEvents({
    click: (ev) => {
      debug$5("click:", ev);
      setCoords(ev.latlng);
    }
  });
  useEffect(() => {
    map.setView(coords, map.getZoom());
  });
  useEffect(() => {
    const provider = config.googleMapsAPIKey ? new GoogleProvider({ apiKey: config.googleMapsAPIKey }) : new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
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
const PropertyGroupContainer = ({ group, subject, onGroupOpen, shape, GISatoms, config }) => {
  const [uiLang] = useRecoilState(uiLangState);
  const label = ValueByLangToStrPrefLang(group.prefLabels, uiLang);
  const [force, setForce] = useState(false);
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
  const [edit, setEdit] = useRecoilState(uiEditState);
  const [groupEd, setGroupEd] = useRecoilState(uiGroupState);
  const [lat, setLat] = useRecoilState(config.latProp ? subject.getAtomForProperty(config.latProp.uri) : initListAtom);
  const [lng, setLng] = useRecoilState(config.lngProp ? subject.getAtomForProperty(config.lngProp.uri) : initListAtom);
  const [redraw, setRedraw] = useState(false);
  let coords, zoom = 5, unset = false;
  if (lat.length && lng.length && lat[0].value != "" && lat[0].value != "")
    coords = new L.LatLng(Number(lat[0].value), Number(lng[0].value));
  else {
    unset = true;
    coords = new L.LatLng(30, 0);
    zoom = 2;
  }
  useEffect(() => {
    setRedraw(true);
  }, [lng, lat]);
  const setCoords = (val) => {
    setRedraw(false);
    if (!isNaN(val.lat)) {
      if (lat.length > 0 && lat[0] instanceof LiteralWithId)
        setLat([lat[0].copyWithUpdatedValue("" + val.lat)]);
      if (lat.length == 0)
        setLat([new LiteralWithId("" + val.lat)]);
    }
    if (!isNaN(val.lng)) {
      if (lng.length > 0 && lng[0] instanceof LiteralWithId)
        setLng([lng[0].copyWithUpdatedValue("" + val.lng)]);
      if (lng.length == 0)
        setLng([new LiteralWithId("" + val.lat)]);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    role: "main",
    className: "group " + (hasError ? "hasError" : ""),
    id: group.qname,
    style: { scrollMargin: "90px" },
    children: /* @__PURE__ */ jsx("section", {
      className: "album",
      children: /* @__PURE__ */ jsx("div", {
        className: "container col-lg-6 col-md-6 col-sm-12",
        style: { border: "dashed 1px none" },
        children: /* @__PURE__ */ jsxs("div", {
          className: "row card my-2 pb-3" + (edit === group.qname ? " group-edit" : "") + " show-displayPriority-" + force,
          onClick: (e) => {
            if (onGroupOpen && groupEd !== group.qname)
              onGroupOpen(e, groupEd);
            setEdit(group.qname);
            setGroupEd(group.qname);
          },
          children: [
            /* @__PURE__ */ jsxs("p", {
              className: "",
              children: [
                label,
                hasError && /* @__PURE__ */ jsx(ErrorIcon, {})
              ]
            }),
            /* @__PURE__ */ jsx(Fragment, {
              children: /* @__PURE__ */ jsxs("div", {
                className: group.properties.length <= 1 ? "hidePropLabel" : "",
                style: { fontSize: 0 },
                children: [
                  withoutDisplayPriority.map((property, index) => /* @__PURE__ */ jsx(PropertyContainer, {
                    property,
                    subject,
                    editable: property.readOnly !== true,
                    shape,
                    config
                  }, index)),
                  withDisplayPriority.map((property, index) => /* @__PURE__ */ jsx(PropertyContainer, {
                    property,
                    subject,
                    force,
                    editable: property.readOnly !== true,
                    shape,
                    config
                  }, index)),
                  config.gisPropertyGroup && group.uri === config.gisPropertyGroup.uri && groupEd === group.qname && coords && /* @__PURE__ */ jsx("div", {
                    style: { position: "relative", overflow: "hidden", marginTop: "16px" },
                    children: /* @__PURE__ */ jsxs(MapContainer, {
                      style: { width: "100%", height: "400px" },
                      zoom,
                      center: coords,
                      children: [
                        /* @__PURE__ */ jsxs(LayersControl, {
                          position: "topright",
                          children: [
                            config.googleMapsAPIKey && /* @__PURE__ */ jsxs(Fragment, {
                              children: [
                                /* @__PURE__ */ jsx(LayersControl.BaseLayer, {
                                  checked: true,
                                  name: "Satellite+Roadmap",
                                  children: /* @__PURE__ */ jsx(ReactLeafletGoogleLayer, {
                                    apiKey: config.googleMapsAPIKey,
                                    type: "hybrid"
                                  })
                                }),
                                /* @__PURE__ */ jsx(LayersControl.BaseLayer, {
                                  name: "Satellite",
                                  children: /* @__PURE__ */ jsx(ReactLeafletGoogleLayer, {
                                    apiKey: config.googleMapsAPIKey,
                                    type: "satellite"
                                  })
                                }),
                                /* @__PURE__ */ jsx(LayersControl.BaseLayer, {
                                  name: "Roadmap",
                                  children: /* @__PURE__ */ jsx(ReactLeafletGoogleLayer, {
                                    apiKey: config.googleMapsAPIKey,
                                    type: "roadmap"
                                  })
                                }),
                                /* @__PURE__ */ jsx(LayersControl.BaseLayer, {
                                  name: "Terrain",
                                  children: /* @__PURE__ */ jsx(ReactLeafletGoogleLayer, {
                                    apiKey: config.googleMapsAPIKey,
                                    type: "terrain"
                                  })
                                })
                              ]
                            }),
                            !config.googleMapsAPIKey && /* @__PURE__ */ jsx(LayersControl.BaseLayer, {
                              checked: true,
                              name: "OpenStreetMap",
                              children: /* @__PURE__ */ jsx(TileLayer, {
                                url: "https://{s}.tile.iosb.fraunhofer.de/tiles/osmde/{z}/{x}/{y}.png"
                              })
                            })
                          ]
                        }),
                        !unset && /* @__PURE__ */ jsx(DraggableMarker, {
                          pos: coords,
                          icon: redIcon,
                          setCoords
                        }),
                        /* @__PURE__ */ jsx(MapEventHandler, {
                          coords,
                          redraw,
                          setCoords,
                          config
                        })
                      ]
                    })
                  }),
                  hasExtra && /* @__PURE__ */ jsx("span", {
                    className: "toggle-btn  btn btn-rouge my-4",
                    onClick: toggleExtra,
                    children: /* @__PURE__ */ jsx(Fragment, {
                      children: i18n.t("general.toggle", { show: force ? i18n.t("general.hide") : i18n.t("general.show") })
                    })
                  })
                ]
              })
            })
          ]
        })
      })
    })
  });
};

const debug$4 = require("debug")("rde:entity:edit");
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function EntityEditContainerMayUpdate(props) {
  const params = useParams();
  const location = useLocation();
  const shapeQname = params.shapeQname;
  const entityQname = params.entityQname;
  const subjectQname = params.subjectQname;
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const snapshot = useRecoilSnapshot();
  const [subject, setSubject] = useState(null);
  const { copy } = queryString.parse(location.search, { decode: false });
  useEffect(() => {
    const i = entities.findIndex((e) => e.subjectQname === subjectQname);
    let subj;
    if (i === -1)
      return;
    if (subnodeQname) {
      const pp = getParentPath(
        defaultPrefixMap.uriFromQname(subjectQname),
        defaultPrefixMap.uriFromQname(subnodeQname)
      );
      if (pp.length > 1 && i >= 0) {
        const atom2 = entities[i].subject?.getAtomForProperty(pp[1]);
        if (!atom2) {
          setSubject(null);
          return;
        }
        subj = snapshot.getLoadable(atom2).contents;
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
    ({ ...props, copy });
    return /* @__PURE__ */ jsx(EntityEditContainerDoUpdate, {
      subject,
      propertyQname,
      objectQname: entityQname,
      index: Number(index),
      copy,
      ...props
    });
  } else if (subject != null)
    return /* @__PURE__ */ jsx(Navigate, {
      to: "/edit/" + entityQname + "/" + shapeQname
    });
  else
    return /* @__PURE__ */ jsx("div", {});
}
function EntityEditContainerDoUpdate(props) {
  const config = props.config;
  const params = useParams();
  const shapeQname = params.shapeQname;
  const atom2 = props.subject.getAtomForProperty(defaultPrefixMap.uriFromQname(props.propertyQname));
  const [list, setList] = useRecoilState(atom2);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
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
  const [getProp, setProp] = useRecoilState(
    toCopySelector({
      list: subject && copy ? Object.keys(copy).map((p) => ({
        property: p,
        atom: subject.getAtomForProperty(config.prefixMap.uriFromQname(p))
      })) : void 0
    })
  );
  debug$4("LIST:", list, atom2, props.copy, copy);
  useEffect(() => {
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
    const newObject = new ExtRDFResourceWithLabel(defaultPrefixMap.uriFromQname(props.objectQname), {}, {});
    const newList = replaceItemAtIndex(list, props.index, newObject);
    setList(newList);
  }, []);
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/edit/" + props.objectQname + "/" + shapeQname
  });
}
function EntityEditContainer(props) {
  const config = props.config;
  const params = useParams();
  const shapeQname = params.shapeQname || "";
  const entityQname = params.entityQname || "";
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const [uiLang] = useRecoilState(uiLangState);
  const [edit, setEdit] = useRecoilState(uiEditState);
  const [groupEd, setGroupEd] = useRecoilState(uiGroupState);
  const [undos, setUndos] = useRecoilState(uiUndosState);
  const [profileId, setProfileId] = useRecoilState(profileIdState);
  const [tab, setTab] = useRecoilState(uiTabState);
  const entityObj = entities.filter(
    (e) => e.subjectQname === entityQname || e.subjectQname === profileId && entityQname === "tmp:user"
  );
  const icon = config.iconFromEntity(entityObj.length ? entityObj[0] : null);
  const { loadingState, shape } = ShapeFetcher(shapeQname, entityQname, config);
  const canPushPrefLabelGroups = shape?.groups.reduce(
    (acc, group) => {
      const props2 = group.properties.filter((p) => p.allowPushToTopLevelLabel).map((p) => {
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
      if (props2?.length || Object.keys(subprops).length)
        return { ...acc, [group.qname]: { props: props2, subprops } };
      return { ...acc };
    },
    {}
  );
  const possiblePrefLabels = useRecoilValue(
    canPushPrefLabelGroups ? possiblePrefLabelsSelector({ canPushPrefLabelGroups }) : initMapAtom
  );
  let prefLabelAtom = entityObj[0]?.subject?.getAtomForProperty(SKOS("prefLabel").value);
  if (!prefLabelAtom)
    prefLabelAtom = initListAtom;
  const [prefLabels, setPrefLabels] = useRecoilState(prefLabelAtom);
  let altLabelAtom = entityObj[0]?.subject?.getAtomForProperty(SKOS("altLabel").value);
  if (!altLabelAtom)
    altLabelAtom = initListAtom;
  const altLabels = useRecoilValue(altLabelAtom);
  useEffect(() => {
    entities.map((e, i) => {
      if (e.subjectQname === entityQname || e.subjectQname === profileId && entityQname === "tmp:user") {
        if (tab != i) {
          setTab(i);
          return;
        }
      }
    });
  }, [entities, profileId]);
  let init = 0;
  useEffect(() => {
    if (entityQname === "tmp:user" && !profileId)
      return;
    const delay = 350;
    let n = -1;
    const entityUri = defaultPrefixMap.uriFromQname(entityQname === "tmp:user" ? profileId : entityQname);
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
  }, [entities, tab, profileId, entityQname]);
  const [userId, setUserId] = useRecoilState(userIdState);
  const save = useCallback(
    (obj) => {
      return new Promise(async (resolve) => {
        if ([EditedEntityState.NeedsSaving, EditedEntityState.Error].includes(obj[0].state)) {
          const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI);
          const store = new rdf.Store();
          defaultPrefixMap.setDefaultPrefixes(store);
          obj[0]?.subject?.graph.addNewValuestoStore(store);
          rdf.serialize(defaultRef, store, void 0, "text/turtle", async function(err, str) {
            if (err || !str) {
              debug$4(err, store);
              throw "error when serializing";
            }
            const shape2 = obj[0]?.shapeQname;
            config.setUserLocalEntity(
              obj[0].subjectQname,
              shape2,
              str,
              false,
              userId,
              obj[0].etag,
              obj[0].state === EditedEntityState.NeedsSaving
            );
            resolve(true);
          });
        }
      });
    },
    [entityQname, shapeQname, entityObj]
  );
  const entityObjRef = useRef(entityObj);
  useEffect(() => {
    if (entityObjRef.current?.length && entityObj?.length) {
      if (entityObjRef.current[0]?.subjectQname != entityObj[0]?.subjectQname) {
        save(entityObjRef.current);
      }
    }
  });
  useEffect(() => {
    return () => {
      const fun = async () => {
        if (entityObjRef.current) {
          debug$4("unmounting /edit", entityObjRef.current);
          await save(entityObjRef.current);
        }
      };
      fun();
    };
  }, []);
  const [warning, setWarning] = useState(() => (event) => {
  });
  useEffect(() => {
    const willSave = [];
    for (const e of entities) {
      if (e.state !== EditedEntityState.Saved && e.state !== EditedEntityState.NotLoaded) {
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
  useEffect(() => {
    window.addEventListener("beforeunload", warning, true);
  }, [warning]);
  const { entityLoadingState, entity } = EntityFetcher(entityQname, shapeQname, config);
  if (loadingState.status === "error" || entityLoadingState.status === "error") {
    return /* @__PURE__ */ jsxs("p", {
      className: "text-center text-muted",
      children: [
        /* @__PURE__ */ jsx(NotFoundIcon, {
          className: "icon mr-2"
        }),
        loadingState.error,
        entityLoadingState.error
      ]
    });
  }
  if (loadingState.status === "fetching" || entityLoadingState.status === "fetching" || !entity || entity.isEmpty()) {
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Fragment, {
            children: i18n.t("types.loading")
          })
        })
      })
    });
  }
  if (!shape || !entity)
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Fragment, {
            children: i18n.t("types.loading")
          })
        })
      })
    });
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
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [
      /* @__PURE__ */ jsx("div", {
        role: "main",
        className: "pt-4",
        style: { textAlign: "center" },
        children: /* @__PURE__ */ jsxs("div", {
          className: "header " + icon?.toLowerCase(),
          ...!icon ? { "data-shape": shape.qname } : {},
          children: [
            /* @__PURE__ */ jsx("div", {
              className: "shape-icon"
            }),
            /* @__PURE__ */ jsxs("div", {
              children: [
                /* @__PURE__ */ jsx("h1", {
                  children: shapeLabel
                }),
                /* @__PURE__ */ jsx("span", {
                  children: entity.qname
                }),
                previewLink && /* @__PURE__ */ jsx("div", {
                  className: "buda-link",
                  children: /* @__PURE__ */ jsx("a", {
                    className: "btn-rouge" + (!entityObj[0]?.etag ? " disabled" : ""),
                    target: "_blank",
                    rel: "noreferrer",
                    ...!entityObj[0]?.etag ? { title: i18n.t("error.preview") } : { href: previewLink },
                    children: /* @__PURE__ */ jsx(Fragment, {
                      children: i18n.t("general.preview")
                    })
                  })
                })
              ]
            })
          ]
        })
      }),
      /* @__PURE__ */ jsxs("div", {
        role: "navigation",
        className: "innerNav",
        children: [
          /* @__PURE__ */ jsx("p", {
            className: "text-uppercase small my-2",
            children: /* @__PURE__ */ jsx(Fragment, {
              children: i18n.t("home.nav")
            })
          }),
          shape.groups.map((group, index) => {
            const label = ValueByLangToStrPrefLang(group.prefLabels, uiLang);
            return /* @__PURE__ */ jsx(HashLink, {
              to: "#" + group.qname,
              onClick: () => {
                setGroupEd(group.qname);
                setEdit(group.qname);
              },
              className: groupEd === group.qname ? "on" : "",
              children: /* @__PURE__ */ jsx("span", {
                children: label
              })
            }, group.qname);
          })
        ]
      }),
      /* @__PURE__ */ jsx("div", {
        children: shape.groups.map((group, index) => /* @__PURE__ */ jsxs(Fragment, {
          children: [
            groupEd === group.qname && /* @__PURE__ */ jsx("div", {
              className: "group-edit-BG",
              onClick: (e) => checkPushNameAsPrefLabel(e, group.qname)
            }),
            /* @__PURE__ */ jsx(PropertyGroupContainer, {
              group,
              subject: entity,
              onGroupOpen: checkPushNameAsPrefLabel,
              shape,
              config
            }, group.uri)
          ]
        }))
      })
    ]
  });
}

require("debug")("rde:entity:newentity");
function NewEntityContainer(props) {
  const config = props.config || {};
  const [uiLang] = useRecoilState(uiLangState);
  const [RID, setRID] = useState("");
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState);
  useRecoilState(userIdState);
  const navigate = useNavigate();
  const disabled = !RIDprefix;
  return /* @__PURE__ */ jsxs("div", {
    className: "new-fix",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("b", {
            children: "New entity:"
          }),
          /* @__PURE__ */ jsxs("span", {
            children: [
              /* @__PURE__ */ jsx(TextField, {
                ...disabled ? { disabled: true } : {},
                select: true,
                helperText: "List of all possible shapes",
                id: "shapeSelec",
                className: "shapeSelector",
                value: config.possibleShapeRefs[0].qname,
                style: { marginTop: "3px", marginLeft: "10px" },
                children: config.possibleShapeRefs.map((shape, index) => /* @__PURE__ */ jsx(MenuItem, {
                  value: shape.qname,
                  style: { padding: 0 },
                  children: /* @__PURE__ */ jsx(Link, {
                    to: "/new/" + shape.qname,
                    className: "popLink",
                    children: ValueByLangToStrPrefLang(shape.prefLabels, uiLang)
                  })
                }, shape.qname))
              }),
              disabled && RIDprefix === "" && /* @__PURE__ */ jsx("span", {
                className: "pl-2",
                style: { fontStyle: "italic", fontWeight: 500, color: "#d73449", fontSize: 14 },
                children: /* @__PURE__ */ jsx(Trans, {
                  i18nKey: "error.prefix",
                  components: { res: /* @__PURE__ */ jsx(Link, {
                    className: "profile-link",
                    to: "/profile"
                  }) }
                })
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        style: { display: "flex", alignItems: "baseline" },
        children: [
          /* @__PURE__ */ jsxs("div", {
            style: { marginRight: "10px" },
            children: [
              /* @__PURE__ */ jsx("b", {
                children: "Load entity:"
              }),
              " "
            ]
          }),
          /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(TextField, {
              style: { width: "100%" },
              value: RID,
              InputLabelProps: { shrink: true },
              onChange: (e) => setRID(e.target.value),
              helperText: "select an entity to load here by its RID",
              onKeyDown: (event) => {
                if (event.key === "Enter")
                  navigate("/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase());
              }
            })
          }),
          /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase(),
              className: "btn btn-sm btn-outline-primary py-3 ml-2 lookup btn-rouge " + (!RID ? "disabled" : ""),
              style: { boxShadow: "none", alignSelf: "center", marginBottom: "15px" },
              children: /* @__PURE__ */ jsx(Fragment, {
                children: i18n.t("search.open")
              })
            })
          })
        ]
      })
    ]
  });
}

const debug$3 = require("debug")("rde:entity:entitycreation");
function Dialog422(props) {
  const [open, setOpen] = React.useState(props.open);
  const shape = props.shaped.split(":")[1]?.replace(/Shape$/, "");
  const [createNew, setCreateNew] = useState(false);
  const [loadNamed, setLoadNamed] = useState(false);
  debug$3("422:", props);
  const handleLoad = () => {
    setLoadNamed(true);
    setOpen(false);
  };
  const handleNew = () => {
    setCreateNew(true);
    setOpen(false);
  };
  if (createNew)
    return /* @__PURE__ */ jsx(Navigate, {
      to: props.newUrl
    });
  else if (loadNamed)
    return /* @__PURE__ */ jsx(Navigate, {
      to: props.editUrl
    });
  else
    return /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs(Dialog, {
        open,
        children: [
          /* @__PURE__ */ jsxs(DialogTitle, {
            children: [
              shape,
              " ",
              props.named,
              " has already been created"
            ]
          }),
          /* @__PURE__ */ jsx(DialogContent, {
            children: /* @__PURE__ */ jsxs(DialogContentText, {
              children: [
                "Do you want to use it, or to create a new ",
                shape,
                " with another RID instead?"
              ]
            })
          }),
          /* @__PURE__ */ jsxs(DialogActions, {
            style: { justifyContent: "space-around" },
            children: [
              /* @__PURE__ */ jsxs(Button, {
                className: "btn-rouge",
                onClick: handleLoad,
                color: "primary",
                children: [
                  "Use\xA0",
                  /* @__PURE__ */ jsx("span", {
                    style: { textTransform: "none" },
                    children: props.named
                  })
                ]
              }),
              /* @__PURE__ */ jsxs(Button, {
                className: "btn-rouge",
                onClick: handleNew,
                color: "primary",
                children: [
                  "Create\xA0",
                  /* @__PURE__ */ jsx("span", {
                    style: { textTransform: "none" },
                    children: shape
                  }),
                  "\xA0with another RID"
                ]
              })
            ]
          }),
          /* @__PURE__ */ jsx("br", {})
        ]
      })
    });
}

const debug$2 = require("debug")("rde:entity:entitycreation");
function EntityCreationContainer(props) {
  const config = props.config;
  const params = useParams$1();
  const subjectQname = params.subjectQname;
  const shapeQname = params.shapeQname || "";
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const entityQname = params.entityQname || "";
  useRecoilState(userIdState);
  useRecoilState(entitiesAtom);
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState);
  useRecoilState(uiTabState);
  const location = useLocation$1();
  const unmounting = { val: false };
  useEffect(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  if (RIDprefix == "")
    return /* @__PURE__ */ jsx(Navigate, {
      to: "/new"
    });
  const shapeNode = rdf.sym(config.prefixMap.uriFromQname(shapeQname));
  const entityNode = rdf.sym(config.prefixMap.uriFromQname(entityQname));
  const { entityLoadingState, entity } = unmounting.val ? { entityLoadingState: { status: "idle", error: void 0 }, entity: null } : config.entityCreator(shapeNode, entityNode, unmounting);
  debug$2("new:", entityLoadingState, entity, entityQname, entity?.qname, shapeQname);
  if (entityLoadingState.error === "422" && entity) {
    const editUrl = subjectQname && propertyQname && index != void 0 ? "/edit/" + entityQname + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "") : "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname;
    const newUrl = location.pathname.replace(/\/named\/.*/, "") + location.search;
    return /* @__PURE__ */ jsx(Dialog422, {
      open: true,
      shaped: shapeQname,
      named: entityQname,
      editUrl,
      newUrl
    });
  } else if (entity) {
    if (subjectQname && propertyQname && index != void 0)
      return /* @__PURE__ */ jsx(Navigate, {
        to: "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "")
      });
    else
      return /* @__PURE__ */ jsx(Navigate, {
        to: "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname
      });
  }
  if (entityLoadingState.status === "error") {
    return /* @__PURE__ */ jsxs("p", {
      className: "text-center text-muted",
      children: [
        /* @__PURE__ */ jsx(NotFoundIcon, {
          className: "icon mr-2"
        }),
        entityLoadingState.error
      ]
    });
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx(Fragment, {
          children: i18n.t("types.creating")
        })
      })
    })
  });
}
function EntityCreationContainerAlreadyOpen(props) {
  const params = useParams$1();
  const subjectQname = params.subjectQname;
  const shapeQname = params.shapeQname;
  const propertyQname = params.propertyQname;
  const index = params.index;
  const subnodeQname = params.subnodeQname;
  const entityQname = params.entityQname;
  useRecoilState(userIdState);
  useRecoilState(entitiesAtom);
  useRecoilState(RIDprefixState);
  useRecoilState(uiTabState);
  useEffect(() => {
    return () => {
    };
  }, []);
  if (subjectQname && propertyQname && index != void 0)
    return /* @__PURE__ */ jsx(Navigate, {
      to: "/edit/" + entityQname + "/" + shapeQname + "/" + subjectQname + "/" + propertyQname + "/" + index + (subnodeQname ? "/" + subnodeQname : "") + (props.copy ? "?copy=" + props.copy : "")
    });
  else
    return /* @__PURE__ */ jsx(Navigate, {
      to: "/edit/" + entityQname + "/" + shapeQname
    });
}
function EntityCreationContainerRoute(props) {
  const params = useParams$1();
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const i = entities.findIndex((e) => e.subjectQname === params.entityQname);
  const theEntity = entities[i];
  const location = useLocation$1();
  const { copy } = queryString.parse(location.search, { decode: false });
  if (theEntity)
    return /* @__PURE__ */ jsx(EntityCreationContainerAlreadyOpen, {
      ...props,
      copy
    });
  else
    return /* @__PURE__ */ jsx(EntityCreationContainer, {
      ...props,
      copy
    });
}

const debug$1 = require("debug")("rde:entity:shape");
function EntityShapeChooserContainer(props) {
  const config = props.config;
  const params = useParams$1();
  const navigate = useNavigate();
  const [entityQname, setEntityQname] = useState(params.entityQname || "");
  const [uiLang] = useRecoilState(uiLangState);
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const unmounting = { val: false };
  useEffect(() => {
    return () => {
      unmounting.val = true;
    };
  }, []);
  useEffect(() => {
    if (unmounting.val)
      return;
    else if (params.entityQname)
      setEntityQname(params.entityQname);
  }, [params]);
  const entityFromList = entities.find((e) => e.subjectQname === entityQname);
  if (entityFromList && entityFromList.shapeQname) {
    const shapeQname = entityFromList.shapeQname;
    navigate("/edit/" + entityQname + "/" + shapeQname, { replace: true });
    return /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx(Fragment, {
          children: i18n.t("types.redirect")
        })
      })
    });
  }
  const { entityLoadingState, entity } = EntityFetcher(entityQname, "", config, unmounting);
  if (entity) {
    const possibleShapes = config.possibleShapeRefsForEntity(entity.node);
    if (entityLoadingState.status === "fetching") {
      return /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Fragment, {
            children: i18n.t("types.loading")
          })
        })
      });
    } else if (entityLoadingState.error === "not found") {
      return /* @__PURE__ */ jsx("div", {
        className: "error",
        children: /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("span", {
              children: /* @__PURE__ */ jsx(Fragment, {
                children: i18n.t("error.exist", { id: entityQname })
              })
            }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(Link, {
              style: { fontWeight: 700 },
              to: "/new",
              children: /* @__PURE__ */ jsx(Fragment, {
                children: i18n.t("error.redirect")
              })
            })
          ]
        })
      });
    } else if (!possibleShapes) {
      debug$1("cannot find", entity, entityLoadingState);
      return /* @__PURE__ */ jsx("div", {
        className: "error",
        children: /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("span", {
              children: /* @__PURE__ */ jsx(Fragment, {
                children: i18n.t("error.shape", { id: entityQname })
              })
            }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(Link, {
              style: { fontWeight: 700 },
              to: "/new",
              children: /* @__PURE__ */ jsx(Fragment, {
                children: i18n.t("error.redirect")
              })
            })
          ]
        })
      });
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
      return /* @__PURE__ */ jsx("div", {
        className: "centered-ctn",
        children: /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("b", {
              children: "Choose a shape:"
            }),
            /* @__PURE__ */ jsx(TextField, {
              select: true,
              helperText: "List of all possible shapes",
              id: "shapeSelec",
              className: "shapeSelector",
              value: config.possibleShapeRefs[0].qname,
              style: { marginTop: "3px", marginLeft: "10px" },
              children: config.possibleShapeRefs.map((shape, index) => /* @__PURE__ */ jsx(MenuItem, {
                value: shape.qname,
                style: { padding: 0 },
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/edit/" + entityQname + "/" + shape.qname,
                  className: "popLink",
                  onClick: (ev) => handleClick(ev, shape),
                  children: ValueByLangToStrPrefLang(shape.prefLabels, uiLang)
                })
              }, shape.qname))
            })
          ]
        })
      });
    } else {
      return /* @__PURE__ */ jsx(Navigate, {
        to: "/edit/" + entityQname + "/" + possibleShapes[0].qname
      });
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx(Fragment, {
          children: i18n.t("types.loading")
        })
      })
    })
  });
}

const debug = require("debug")("rde:atom:event:RS");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: theme.palette.secondary.main
    }
  }
}));
const BDR_uri = "http://purl.bdrc.io/resource/";
const BUDAResourceSelector = ({
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
  useStyles();
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("bo-x-ewts");
  const [type, setType] = useState(property.expectedObjectTypes ? property.expectedObjectTypes[0].qname : "");
  const [libraryURL, setLibraryURL] = useState("");
  const [uiLang, setUiLang] = useRecoilState(uiLangState);
  const [uiLitLang, setUiLitLang] = useRecoilState(uiLitLangState);
  const [error, setError] = useState();
  const [entities, setEntities] = useRecoilState(entitiesAtom);
  const navigate = useNavigate();
  const msgId = subject.qname + property.qname + idx;
  const [popupNew, setPopupNew] = useState(false);
  useRecoilState(uiTabState);
  const iframeRef = useRef(null);
  const [canCopy, setCanCopy] = useState([]);
  const isRid = keyword.startsWith("bdr:") || keyword.match(/^([cpgwrti]|mw|wa|was|ut|ie|pr)(\d|eap)[^ ]*$/i);
  const [toCopy, setProp] = useRecoilState(
    toCopySelector({
      list: property.copyObjectsOfProperty?.map((p) => ({
        property: defaultPrefixMap.qnameFromUri(p.value),
        atom: (owner ? owner : subject).getAtomForProperty(p.uri)
      }))
    })
  );
  useEffect(() => {
    if (property.copyObjectsOfProperty?.length) {
      const copy = [];
      for (const prop of property.copyObjectsOfProperty) {
        const propQname = defaultPrefixMap.qnameFromUri(prop.value);
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
  useEffect(() => {
    if (globalError && !error)
      setError(globalError);
  }, [globalError]);
  if (!property.expectedObjectTypes) {
    debug(property);
    throw "can't get the types for property " + property.qname;
  }
  const closeFrame = () => {
    debug("close?", value, isRid, libraryURL);
    if (iframeRef.current && isRid) {
      debug("if:", iframeRef.current);
      iframeRef.current.click();
      const wn = iframeRef.current.contentWindow;
      if (wn)
        wn.postMessage("click", "*");
    } else {
      if (libraryURL)
        setLibraryURL("");
    }
  };
  let msgHandler = null;
  useEffect(() => {
    const updateRes = (data) => {
      let isTypeOk = false;
      let actual;
      if (property.expectedObjectTypes) {
        const allow = property.expectedObjectTypes.map((t) => t.qname);
        actual = data["tmp:otherData"]["tmp:type"];
        if (!Array.isArray(actual))
          actual = [actual];
        actual = actual.map((a) => a.replace(/Product/, "Collection"));
        if (actual.filter((t) => allow.includes(t)).length)
          isTypeOk = true;
        const displayTypes = (t) => t.filter((a) => a).map((a) => a.replace(/^bdo:/, "")).join(", ");
        if (!isTypeOk) {
          setError(i18n.t("error.type", { allow: displayTypes(allow), actual: displayTypes(actual), id: data["@id"] }));
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
            }
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
    };
    if (msgHandler)
      window.removeEventListener("message", msgHandler, true);
    msgHandler = (ev) => {
      try {
        if (!window.location.href.includes(ev.origin)) {
          const data = JSON.parse(ev.data);
          if (data["tmp:propid"] === msgId && data["@id"] && data["tmp:notFound"]) {
            debug("notfound msg: %o %o", msgId, data, ev, property.qname, libraryURL);
            setLibraryURL("");
            setError(i18n.t("error.notF", { RID: data["@id"] }));
          } else if (data["tmp:propid"] === msgId && data["@id"]) {
            debug("received msg: %o %o", msgId, data, ev, property.qname, libraryURL);
            updateRes(data);
          } else {
            setLibraryURL("");
          }
        }
      } catch (err) {
        debug("error: %o", err);
      }
    };
    window.addEventListener("message", msgHandler, true);
    return () => {
      if (msgHandler)
        window.removeEventListener("message", msgHandler, true);
    };
  }, [libraryURL]);
  useEffect(() => {
    if (value.otherData["tmp:keyword"]) {
      setKeyword(value.otherData["tmp:keyword"]["@value"]);
      setLanguage(value.otherData["tmp:keyword"]["@language"]);
    }
  }, []);
  const updateLibrary = (ev, newlang, newtype) => {
    debug("updLib: %o", msgId);
    if (ev && libraryURL) {
      setLibraryURL("");
    } else if (msgId) {
      if (isRid) {
        setLibraryURL(
          config.libraryUrl + "/simple/" + (!keyword.startsWith("bdr:") ? "bdr:" : "") + keyword + "?for=" + msgId
        );
      } else {
        let lang2 = language;
        if (newlang)
          lang2 = newlang;
        else if (!lang2)
          lang2 = "bo-x-ewts";
        let key = encodeURIComponent(keyword);
        key = '"' + key + '"';
        if (lang2.startsWith("bo"))
          key = key + "~1";
        lang2 = encodeURIComponent(lang2);
        let t = type;
        if (newtype)
          t = newtype;
        if (!t)
          throw "there should be a type here";
        t = t.replace(/^bdo:/, "");
        if (t.includes("ImageInstance"))
          t = "Scan";
        else if (t.includes("EtextInstance"))
          t = "Etext";
        else if (t.includes("Collection"))
          t = "Product";
        setLibraryURL(
          config.libraryUrl + "/simplesearch?q=" + key + "&lg=" + lang2 + "&t=" + t + "&for=" + msgId + "&f=provider,inc,bda:CP021"
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
  const createAndUpdate = useCallback(
    async (type2, named = "") => {
      let url = "";
      url = "/new/" + config.possibleShapeRefsForType(type2.node)[0].qname + "/" + (owner?.qname && owner.qname !== subject.qname ? owner.qname : subject.qname) + "/" + config.prefixMap.qnameFromUri(property?.path?.sparqlString) + "/" + idx + (owner?.qname && owner.qname !== subject.qname ? "/" + subject.qname : "");
      if (property.connectIDs) {
        const newNode = await config.generateConnectedID(subject, shape, property.targetShape);
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
    const newRes = new ExtRDFResourceWithLabel(ent.subjectQname, prefLabels, {});
    onChange(newRes, idx, false);
  };
  const togglePopup = () => {
    setPopupNew(!popupNew);
  };
  ValueByLangToStrPrefLang(property.prefLabels, uiLitLang);
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
  let name = /* @__PURE__ */ jsx("div", {
    style: { fontSize: "16px" },
    children: ValueByLangToStrPrefLang(value.prefLabels, uiLitLang) + " " + dates
  });
  const entity = entities.filter((e) => e.subjectQname === value.qname);
  if (entity.length) {
    name = /* @__PURE__ */ jsx(LabelWithRID, {
      entity: entity[0]
    });
  }
  useEffect(() => {
    if (error) {
      debug("error:", error);
    }
  }, [error]);
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  useLayoutEffect(() => {
    if (document.activeElement === inputRef.current && !isRid && keyword) {
      const previewVal = config.previewLiteral(new rdf.Literal(keyword, language), uiLang);
      setPreview(previewVal.value);
      setPreview(previewVal.value);
    }
  });
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "resSelect " + (error ? "error" : ""),
        style: { position: "relative", ...value.uri === "tmp:uri" ? { width: "100%" } : {} },
        children: [
          value.uri === "tmp:uri" && /* @__PURE__ */ jsx("div", {
            className: preview ? "withPreview" : "",
            style: { display: "flex", justifyContent: "space-between", alignItems: "end" },
            children: /* @__PURE__ */ jsxs(React.Fragment, {
              children: [
                preview && /* @__PURE__ */ jsx("div", {
                  className: "preview-ewts",
                  children: /* @__PURE__ */ jsx(TextField, {
                    disabled: true,
                    value: preview
                  })
                }),
                /* @__PURE__ */ jsx(TextField, {
                  onKeyPress: (e) => {
                    if (e.key === "Enter")
                      onClickKB(e);
                  },
                  onFocus: () => {
                    if (!keyword || isRid)
                      setPreview(null);
                    const { value: value2, error: error2 } = config.previewLiteral(new rdf.Literal(keyword, language), uiLang);
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
                    helperText: /* @__PURE__ */ jsxs(React.Fragment, {
                      children: [
                        /* @__PURE__ */ jsx(ErrorIcon, {
                          style: { fontSize: "20px", verticalAlign: "-7px" }
                        }),
                        /* @__PURE__ */ jsx("i", {
                          children: error
                        })
                      ]
                    }),
                    error: true
                  } : {},
                  ...!editable ? { disabled: true } : {}
                }),
                /* @__PURE__ */ jsx(LangSelect, {
                  value: language,
                  onChange: (lang2) => {
                    setLanguage(lang2);
                    debug(lang2);
                    if (libraryURL)
                      updateLibrary(void 0, lang2);
                  },
                  ...isRid ? { disabled: true } : { disabled: false },
                  editable,
                  error: !!error,
                  config
                }),
                property.expectedObjectTypes?.length > 1 && /* @__PURE__ */ jsx(TextField, {
                  select: true,
                  style: { width: 100, flexShrink: 0 },
                  value: type,
                  className: "mx-2",
                  onChange: textOnChangeType,
                  label: "Type",
                  ...isRid ? { disabled: true } : {},
                  ...!editable ? { disabled: true } : {},
                  ...error ? {
                    helperText: /* @__PURE__ */ jsx("br", {}),
                    error: true
                  } : {},
                  children: property.expectedObjectTypes?.map((r) => {
                    const label2 = ValueByLangToStrPrefLang(r.prefLabels, uiLang);
                    return /* @__PURE__ */ jsx(MenuItem, {
                      value: r.qname,
                      children: label2
                    }, r.qname);
                  })
                }),
                /* @__PURE__ */ jsx("button", {
                  ...!keyword || !isRid && (!language || !type) ? { disabled: true } : {},
                  className: "btn btn-sm btn-outline-primary ml-2 lookup btn-rouge",
                  style: { boxShadow: "none", alignSelf: "center", padding: "5px 4px 4px 4px" },
                  onClick,
                  ...!editable ? { disabled: true } : {},
                  children: libraryURL ? /* @__PURE__ */ jsx(CloseIcon, {}) : /* @__PURE__ */ jsx(LookupIcon, {})
                }),
                /* @__PURE__ */ jsx("button", {
                  className: "btn btn-sm btn-outline-primary py-3 ml-2 dots btn-rouge",
                  style: { boxShadow: "none", alignSelf: "center" },
                  onClick: togglePopup,
                  ...!editable ? { disabled: true } : {},
                  children: /* @__PURE__ */ jsx(Fragment, {
                    children: i18n.t("search.create")
                  })
                })
              ]
            })
          }),
          value.uri !== "tmp:uri" && /* @__PURE__ */ jsx(React.Fragment, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "selected",
              children: [
                name,
                /* @__PURE__ */ jsxs("div", {
                  style: { fontSize: "12px", opacity: "0.5", display: "flex", alignItems: "center" },
                  children: [
                    value.qname,
                    "\xA0",
                    /* @__PURE__ */ jsxs("a", {
                      title: i18n.t("search.help.preview"),
                      onClick: () => {
                        if (libraryURL)
                          setLibraryURL("");
                        else if (value.otherData["tmp:externalUrl"])
                          setLibraryURL(value.otherData["tmp:externalUrl"]);
                        else
                          setLibraryURL(config.libraryUrl + "/simple/" + value.qname + "?view=true");
                      },
                      children: [
                        !libraryURL && /* @__PURE__ */ jsx(InfoOutlinedIcon, {
                          style: { width: "18px", cursor: "pointer" }
                        }),
                        libraryURL && /* @__PURE__ */ jsx(InfoIcon, {
                          style: { width: "18px", cursor: "pointer" }
                        })
                      ]
                    }),
                    "\xA0",
                    /* @__PURE__ */ jsx("a", {
                      title: i18n.t("search.help.open"),
                      href: config.libraryUrl + "/show/" + value.qname,
                      rel: "noopener noreferrer",
                      target: "_blank",
                      children: /* @__PURE__ */ jsx(LaunchIcon, {
                        style: { width: "16px" }
                      })
                    }),
                    "\xA0",
                    /* @__PURE__ */ jsx(Link, {
                      title: i18n.t("search.help.edit"),
                      to: "/edit/" + value.qname,
                      children: /* @__PURE__ */ jsx(EditIcon, {
                        style: { width: "16px" }
                      })
                    }),
                    "\xA0",
                    canCopy.length > 0 && /* @__PURE__ */ jsx("span", {
                      title: i18n.t("general.import"),
                      children: /* @__PURE__ */ jsx(ContentPasteIcon, {
                        style: { width: "17px", cursor: "pointer" },
                        onClick: () => {
                          setProp(canCopy);
                          setCanCopy([]);
                        }
                      })
                    })
                  ]
                })
              ]
            })
          })
        ]
      }),
      libraryURL && /* @__PURE__ */ jsxs("div", {
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
          /* @__PURE__ */ jsx("iframe", {
            style: { border: "none" },
            height: "400",
            src: libraryURL,
            ref: iframeRef
          }),
          /* @__PURE__ */ jsx("div", {
            className: "iframe-BG",
            onClick: closeFrame
          })
        ]
      }),
      popupNew && /* @__PURE__ */ jsxs("div", {
        className: "card popup-new",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "front",
            children: [
              entities.map((e, i) => {
                if (!exists(e?.subjectQname) && e?.subjectQname != subject.qname && e?.subjectQname != owner?.qname && property.expectedObjectTypes?.some(
                  (t) => e.shapeQname?.startsWith(t.qname.replace(/^bdo:/, "bds:"))
                )) {
                  return /* @__PURE__ */ jsx(MenuItem, {
                    className: "px-0 py-0",
                    children: /* @__PURE__ */ jsx(LabelWithRID, {
                      choose: chooseEntity,
                      entity: e
                    })
                  }, i + 1);
                }
              }),
              /* @__PURE__ */ jsx("hr", {
                className: "my-1"
              }),
              property.expectedObjectTypes?.map((r) => {
                const label2 = ValueByLangToStrPrefLang(r.prefLabels, uiLang);
                return /* @__PURE__ */ createElement(MenuItem, {
                  ...r.qname === "bdo:EtextInstance" ? { disabled: true } : {},
                  key: r.qname,
                  value: r.qname,
                  onClick: async () => {
                    const url = await createAndUpdate(r);
                    navigate(url);
                  }
                }, i18n.t("search.new", { type: label2 }));
              })
            ]
          }),
          /* @__PURE__ */ jsx("div", {
            className: "popup-new-BG",
            onClick: togglePopup
          })
        ]
      })
    ]
  });
};
const LabelWithRID = ({
  entity,
  choose
}) => {
  useRecoilState(uiLangState);
  const [uiLitLang] = useRecoilState(uiLitLangState);
  const [labelValues] = useRecoilState(entity.subjectLabelState);
  const prefLabels = RDFResource.valuesByLang(labelValues);
  const label = ValueByLangToStrPrefLang(prefLabels, uiLitLang);
  let name = label && label != "..." ? label : entity.subject?.lname ? entity.subject.lname : entity.subjectQname.split(":")[1];
  if (!name)
    name = label;
  if (!choose)
    return /* @__PURE__ */ jsx("span", {
      style: { fontSize: "16px" },
      children: name
    });
  else
    return /* @__PURE__ */ jsxs("div", {
      className: "px-3 py-1",
      style: { width: "100%" },
      onClick: choose(entity, prefLabels),
      children: [
        /* @__PURE__ */ jsx("div", {
          className: "label",
          children: name
        }),
        /* @__PURE__ */ jsx("div", {
          className: "RID",
          children: entity.subjectQname
        })
      ]
    });
};

export { BUDAResourceSelector, EntityCreationContainer, EntityCreationContainerRoute, EntityEditContainer, EntityEditContainerMayUpdate, EntityGraph, EntityShapeChooserContainer, ExtRDFResourceWithLabel, LiteralWithId, NewEntityContainer, NodeShape, RDFResource, Subject, ValueByLangToStrPrefLang, fetchTtl, generateSubnode, ns, shapes };
//# sourceMappingURL=index.mjs.map
