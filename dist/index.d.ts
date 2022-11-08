import * as rdflib_lib_tf_types from 'rdflib/lib/tf-types';
import * as rdf from 'rdflib';
import * as recoil from 'recoil';
import { RecoilState, AtomEffect, RecoilValue } from 'recoil';
import { FC } from 'react';
import { Theme } from '@mui/material/styles';

declare const DASH_uri = "http://datashapes.org/dash#";
declare const DASH: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const OWL_uri = "http://www.w3.org/2002/07/owl#";
declare const OWL: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const RDFS_uri = "http://www.w3.org/2000/01/rdf-schema#";
declare const RDFS: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const SH_uri = "http://www.w3.org/ns/shacl#";
declare const SH: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const RDF_uri = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
declare const RDF: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const SKOS_uri = "http://www.w3.org/2004/02/skos/core#";
declare const SKOS: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const XSD_uri = "http://www.w3.org/2001/XMLSchema#";
declare const XSD: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const FOAF_uri = "http://xmlns.com/foaf/0.1/";
declare const FOAF: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare const RDE_uri = "https://github.com/buda-base/rdf-document-editor/";
declare const RDE: (ln: string) => rdflib_lib_tf_types.NamedNode;
declare class PrefixMap {
    prefixToURI: {
        [key: string]: string;
    };
    URItoPrefix: {
        [key: string]: string;
    };
    constructor(prefixToURI: {
        [key: string]: string;
    });
    setDefaultPrefixes: (s: rdf.Store) => void;
    qnameFromUri: (uri?: string) => string;
    lnameFromUri: (uri: string) => string;
    namespaceFromUri: (uri: string) => string;
    uriFromQname: (qname?: string) => string;
    lnameFromQname: (qname?: string) => string;
}
declare const rdfType: rdf.NamedNode;
declare const shProperty: rdflib_lib_tf_types.NamedNode;
declare const shGroup: rdflib_lib_tf_types.NamedNode;
declare const shOrder: rdf.NamedNode;
declare const rdfsLabel: rdf.NamedNode;
declare const prefLabel: rdf.NamedNode;
declare const shName: rdf.NamedNode;
declare const shPath: rdf.NamedNode;
declare const dashEditor: rdf.NamedNode;
declare const shNode: rdf.NamedNode;
declare const dashListShape: rdf.NamedNode;
declare const dashEnumSelectEditor: rdf.NamedNode;
declare const shMessage: rdf.NamedNode;
declare const rdeDisplayPriority: rdf.NamedNode;
declare const shMinCount: rdf.NamedNode;
declare const shMinInclusive: rdf.NamedNode;
declare const shMinExclusive: rdf.NamedNode;
declare const shClass: rdf.NamedNode;
declare const shMaxCount: rdf.NamedNode;
declare const shMaxInclusive: rdf.NamedNode;
declare const shMaxExclusive: rdf.NamedNode;
declare const shDatatype: rdf.NamedNode;
declare const dashSingleLine: rdf.NamedNode;
declare const shTargetClass: rdf.NamedNode;
declare const shTargetObjectsOf: rdf.NamedNode;
declare const shTargetSubjectsOf: rdf.NamedNode;
declare const rdePropertyShapeType: rdf.NamedNode;
declare const rdeInternalShape: rdf.NamedNode;
declare const rdeExternalShape: rdf.NamedNode;
declare const rdeIgnoreShape: rdf.NamedNode;
declare const rdeClassIn: rdf.NamedNode;
declare const shIn: rdf.NamedNode;
declare const shInversePath: rdf.NamedNode;
declare const shUniqueLang: rdf.NamedNode;
declare const rdeReadOnly: rdf.NamedNode;
declare const rdeIdentifierPrefix: rdf.NamedNode;
declare const rdeAllowMarkDown: rdf.NamedNode;
declare const shNamespace: rdf.NamedNode;
declare const rdeDefaultLanguage: rdf.NamedNode;
declare const rdeDefaultValue: rdf.NamedNode;
declare const shLanguageIn: rdf.NamedNode;
declare const shPattern: rdf.NamedNode;
declare const rdeSortOnProperty: rdf.NamedNode;
declare const rdeAllowPushToTopLevelLabel: rdf.NamedNode;
declare const rdeIndependentIdentifiers: rdf.NamedNode;
declare const rdeSpecialPattern: rdf.NamedNode;
declare const rdeConnectIDs: rdf.NamedNode;
declare const rdeAllowBatchManagement: rdf.NamedNode;
declare const rdeCopyObjectsOfProperty: rdf.NamedNode;
declare const rdeUniqueValueAmongSiblings: rdf.NamedNode;
declare const rdfLangString: rdf.NamedNode;
declare const skosDefinition: rdf.NamedNode;
declare const rdfsComment: rdf.NamedNode;
declare const shDescription: rdf.NamedNode;
declare const rdfFirst: rdf.NamedNode;
declare const rdfRest: rdf.NamedNode;
declare const rdfNil: rdf.NamedNode;
declare const defaultLabelProperties: rdf.NamedNode[];
declare const defaultDescriptionProperties: rdf.NamedNode[];
declare const defaultPrefixMap: PrefixMap;

declare const ns_DASH_uri: typeof DASH_uri;
declare const ns_DASH: typeof DASH;
declare const ns_OWL_uri: typeof OWL_uri;
declare const ns_OWL: typeof OWL;
declare const ns_RDFS_uri: typeof RDFS_uri;
declare const ns_RDFS: typeof RDFS;
declare const ns_SH_uri: typeof SH_uri;
declare const ns_SH: typeof SH;
declare const ns_RDF_uri: typeof RDF_uri;
declare const ns_RDF: typeof RDF;
declare const ns_SKOS_uri: typeof SKOS_uri;
declare const ns_SKOS: typeof SKOS;
declare const ns_XSD_uri: typeof XSD_uri;
declare const ns_XSD: typeof XSD;
declare const ns_FOAF_uri: typeof FOAF_uri;
declare const ns_FOAF: typeof FOAF;
declare const ns_RDE_uri: typeof RDE_uri;
declare const ns_RDE: typeof RDE;
type ns_PrefixMap = PrefixMap;
declare const ns_PrefixMap: typeof PrefixMap;
declare const ns_rdfType: typeof rdfType;
declare const ns_shProperty: typeof shProperty;
declare const ns_shGroup: typeof shGroup;
declare const ns_shOrder: typeof shOrder;
declare const ns_rdfsLabel: typeof rdfsLabel;
declare const ns_prefLabel: typeof prefLabel;
declare const ns_shName: typeof shName;
declare const ns_shPath: typeof shPath;
declare const ns_dashEditor: typeof dashEditor;
declare const ns_shNode: typeof shNode;
declare const ns_dashListShape: typeof dashListShape;
declare const ns_dashEnumSelectEditor: typeof dashEnumSelectEditor;
declare const ns_shMessage: typeof shMessage;
declare const ns_rdeDisplayPriority: typeof rdeDisplayPriority;
declare const ns_shMinCount: typeof shMinCount;
declare const ns_shMinInclusive: typeof shMinInclusive;
declare const ns_shMinExclusive: typeof shMinExclusive;
declare const ns_shClass: typeof shClass;
declare const ns_shMaxCount: typeof shMaxCount;
declare const ns_shMaxInclusive: typeof shMaxInclusive;
declare const ns_shMaxExclusive: typeof shMaxExclusive;
declare const ns_shDatatype: typeof shDatatype;
declare const ns_dashSingleLine: typeof dashSingleLine;
declare const ns_shTargetClass: typeof shTargetClass;
declare const ns_shTargetObjectsOf: typeof shTargetObjectsOf;
declare const ns_shTargetSubjectsOf: typeof shTargetSubjectsOf;
declare const ns_rdePropertyShapeType: typeof rdePropertyShapeType;
declare const ns_rdeInternalShape: typeof rdeInternalShape;
declare const ns_rdeExternalShape: typeof rdeExternalShape;
declare const ns_rdeIgnoreShape: typeof rdeIgnoreShape;
declare const ns_rdeClassIn: typeof rdeClassIn;
declare const ns_shIn: typeof shIn;
declare const ns_shInversePath: typeof shInversePath;
declare const ns_shUniqueLang: typeof shUniqueLang;
declare const ns_rdeReadOnly: typeof rdeReadOnly;
declare const ns_rdeIdentifierPrefix: typeof rdeIdentifierPrefix;
declare const ns_rdeAllowMarkDown: typeof rdeAllowMarkDown;
declare const ns_shNamespace: typeof shNamespace;
declare const ns_rdeDefaultLanguage: typeof rdeDefaultLanguage;
declare const ns_rdeDefaultValue: typeof rdeDefaultValue;
declare const ns_shLanguageIn: typeof shLanguageIn;
declare const ns_shPattern: typeof shPattern;
declare const ns_rdeSortOnProperty: typeof rdeSortOnProperty;
declare const ns_rdeAllowPushToTopLevelLabel: typeof rdeAllowPushToTopLevelLabel;
declare const ns_rdeIndependentIdentifiers: typeof rdeIndependentIdentifiers;
declare const ns_rdeSpecialPattern: typeof rdeSpecialPattern;
declare const ns_rdeConnectIDs: typeof rdeConnectIDs;
declare const ns_rdeAllowBatchManagement: typeof rdeAllowBatchManagement;
declare const ns_rdeCopyObjectsOfProperty: typeof rdeCopyObjectsOfProperty;
declare const ns_rdeUniqueValueAmongSiblings: typeof rdeUniqueValueAmongSiblings;
declare const ns_rdfLangString: typeof rdfLangString;
declare const ns_skosDefinition: typeof skosDefinition;
declare const ns_rdfsComment: typeof rdfsComment;
declare const ns_shDescription: typeof shDescription;
declare const ns_rdfFirst: typeof rdfFirst;
declare const ns_rdfRest: typeof rdfRest;
declare const ns_rdfNil: typeof rdfNil;
declare const ns_defaultLabelProperties: typeof defaultLabelProperties;
declare const ns_defaultDescriptionProperties: typeof defaultDescriptionProperties;
declare const ns_defaultPrefixMap: typeof defaultPrefixMap;
declare namespace ns {
  export {
    ns_DASH_uri as DASH_uri,
    ns_DASH as DASH,
    ns_OWL_uri as OWL_uri,
    ns_OWL as OWL,
    ns_RDFS_uri as RDFS_uri,
    ns_RDFS as RDFS,
    ns_SH_uri as SH_uri,
    ns_SH as SH,
    ns_RDF_uri as RDF_uri,
    ns_RDF as RDF,
    ns_SKOS_uri as SKOS_uri,
    ns_SKOS as SKOS,
    ns_XSD_uri as XSD_uri,
    ns_XSD as XSD,
    ns_FOAF_uri as FOAF_uri,
    ns_FOAF as FOAF,
    ns_RDE_uri as RDE_uri,
    ns_RDE as RDE,
    ns_PrefixMap as PrefixMap,
    ns_rdfType as rdfType,
    ns_shProperty as shProperty,
    ns_shGroup as shGroup,
    ns_shOrder as shOrder,
    ns_rdfsLabel as rdfsLabel,
    ns_prefLabel as prefLabel,
    ns_shName as shName,
    ns_shPath as shPath,
    ns_dashEditor as dashEditor,
    ns_shNode as shNode,
    ns_dashListShape as dashListShape,
    ns_dashEnumSelectEditor as dashEnumSelectEditor,
    ns_shMessage as shMessage,
    ns_rdeDisplayPriority as rdeDisplayPriority,
    ns_shMinCount as shMinCount,
    ns_shMinInclusive as shMinInclusive,
    ns_shMinExclusive as shMinExclusive,
    ns_shClass as shClass,
    ns_shMaxCount as shMaxCount,
    ns_shMaxInclusive as shMaxInclusive,
    ns_shMaxExclusive as shMaxExclusive,
    ns_shDatatype as shDatatype,
    ns_dashSingleLine as dashSingleLine,
    ns_shTargetClass as shTargetClass,
    ns_shTargetObjectsOf as shTargetObjectsOf,
    ns_shTargetSubjectsOf as shTargetSubjectsOf,
    ns_rdePropertyShapeType as rdePropertyShapeType,
    ns_rdeInternalShape as rdeInternalShape,
    ns_rdeExternalShape as rdeExternalShape,
    ns_rdeIgnoreShape as rdeIgnoreShape,
    ns_rdeClassIn as rdeClassIn,
    ns_shIn as shIn,
    ns_shInversePath as shInversePath,
    ns_shUniqueLang as shUniqueLang,
    ns_rdeReadOnly as rdeReadOnly,
    ns_rdeIdentifierPrefix as rdeIdentifierPrefix,
    ns_rdeAllowMarkDown as rdeAllowMarkDown,
    ns_shNamespace as shNamespace,
    ns_rdeDefaultLanguage as rdeDefaultLanguage,
    ns_rdeDefaultValue as rdeDefaultValue,
    ns_shLanguageIn as shLanguageIn,
    ns_shPattern as shPattern,
    ns_rdeSortOnProperty as rdeSortOnProperty,
    ns_rdeAllowPushToTopLevelLabel as rdeAllowPushToTopLevelLabel,
    ns_rdeIndependentIdentifiers as rdeIndependentIdentifiers,
    ns_rdeSpecialPattern as rdeSpecialPattern,
    ns_rdeConnectIDs as rdeConnectIDs,
    ns_rdeAllowBatchManagement as rdeAllowBatchManagement,
    ns_rdeCopyObjectsOfProperty as rdeCopyObjectsOfProperty,
    ns_rdeUniqueValueAmongSiblings as rdeUniqueValueAmongSiblings,
    ns_rdfLangString as rdfLangString,
    ns_skosDefinition as skosDefinition,
    ns_rdfsComment as rdfsComment,
    ns_shDescription as shDescription,
    ns_rdfFirst as rdfFirst,
    ns_rdfRest as rdfRest,
    ns_rdfNil as rdfNil,
    ns_defaultLabelProperties as defaultLabelProperties,
    ns_defaultDescriptionProperties as defaultDescriptionProperties,
    ns_defaultPrefixMap as defaultPrefixMap,
  };
}

declare const history: Record<string, Array<Record<string, any>>>;
declare enum ObjectType {
    Literal = 0,
    Internal = 1,
    ResInList = 2,
    ResExt = 3,
    ResIgnore = 4,
    LitInList = 5
}
declare const updateHistory: (entity: string, qname: string, prop: string, val: Array<Value>, noHisto?: boolean | number) => void;
declare type HistoryStatus = {
    top: number;
    first: number;
    current: number;
};
declare const getHistoryStatus: (entityUri: string) => HistoryStatus;
declare class Path {
    sparqlString: string;
    directPathNode: rdf.NamedNode | null;
    inversePathNode: rdf.NamedNode | null;
    constructor(node: rdf.NamedNode, graph: EntityGraph, listMode: boolean);
}
declare class EntityGraphValues {
    oldSubjectProps: Record<string, Record<string, Array<Value>>>;
    newSubjectProps: Record<string, Record<string, Array<Value>>>;
    subjectUri: string;
    idHash: number;
    noHisto: boolean | number;
    constructor(subjectUri: string);
    onGetInitialValues: (subjectUri: string, pathString: string, values: Array<Value>) => void;
    onUpdateValues: (subjectUri: string, pathString: string, values: Array<Value>) => void;
    isInitialized: (subjectUri: string, pathString: string) => boolean;
    addNewValuestoStore(store: rdf.Store, subjectUri: string): void;
    propsUpdateEffect: (subjectUri: string, pathString: string) => AtomEffect<Array<Value>>;
    getAtomForSubjectProperty(pathString: string, subjectUri: string): RecoilState<Value[]>;
    hasSubject(subjectUri: string): boolean;
}
declare class EntityGraph {
    onGetInitialValues: (subjectUri: string, pathString: string, values: Array<Value>) => void;
    getAtomForSubjectProperty: (pathString: string, subjectUri: string) => RecoilState<Array<Value>>;
    getValues: () => EntityGraphValues;
    get values(): EntityGraphValues;
    topSubjectUri: string;
    store: rdf.Store;
    connexGraph?: rdf.Store;
    prefixMap: PrefixMap;
    labelProperties: Array<rdf.NamedNode>;
    descriptionProperties: Array<rdf.NamedNode>;
    constructor(store: rdf.Store, topSubjectUri: string, prefixMap?: PrefixMap, connexGraph?: rdf.Store, labelProperties?: rdf.NamedNode[], descriptionProperties?: rdf.NamedNode[]);
    addNewValuestoStore(store: rdf.Store): void;
    static addIdToLitList: (litList: Array<rdf.Literal>) => Array<LiteralWithId>;
    static addLabelsFromGraph: (resList: Array<rdf.NamedNode>, graph: EntityGraph) => Array<RDFResourceWithLabel>;
    static addExtDataFromGraph: (resList: Array<rdf.NamedNode>, graph: EntityGraph) => Array<RDFResourceWithLabel>;
    hasSubject(subjectUri: string): boolean;
    static subjectify: (resList: Array<rdf.NamedNode>, graph: EntityGraph) => Array<Subject>;
    getUnitializedValues(s: RDFResource, p: any): Array<Value> | null;
    getPropValuesFromStore(s: RDFResource, p: any): Array<Value>;
}
declare class RDFResource {
    node: rdf.NamedNode | rdf.BlankNode | rdf.Collection;
    graph: EntityGraph;
    isCollection: boolean;
    constructor(node: rdf.NamedNode | rdf.BlankNode | rdf.Collection, graph: EntityGraph);
    get id(): string;
    get value(): string;
    get lname(): string;
    get namespace(): string;
    get qname(): string;
    get uri(): string;
    static valuesByLang(values: Array<Value>): Record<string, string>;
    getPropValueByLang(p: rdf.NamedNode): Record<string, string>;
    getPropValueOrNullByLang(p: rdf.NamedNode): Record<string, string> | null;
    getPropLitValues(p: rdf.NamedNode): Array<rdf.Literal>;
    getPropResValues(p: rdf.NamedNode): Array<rdf.NamedNode>;
    fillElements(s: rdf.NamedNode | rdf.BlankNode | null, current: Array<rdf.Node | null>): void;
    getPropResValuesFromList(p: rdf.NamedNode): Array<rdf.NamedNode> | null;
    getPropLitValuesFromList(p: rdf.NamedNode): Array<rdf.Literal> | null;
    getPropIntValue(p: rdf.NamedNode): number | null;
    getPropStringValue(p: rdf.NamedNode): string | null;
    getPropResValue(p: rdf.NamedNode): rdf.NamedNode | null;
    getPropResValuesFromPath(p: Path): Array<rdf.NamedNode>;
    getPropResValueFromPath(p: Path): rdf.NamedNode | null;
    getPropBooleanValue(p: rdf.NamedNode, dflt?: boolean): boolean;
}
declare class RDFResourceWithLabel extends RDFResource {
    node: rdf.NamedNode;
    constructor(node: rdf.NamedNode, graph: EntityGraph, labelProp?: rdf.NamedNode);
    get prefLabels(): Record<string, string>;
    get description(): Record<string, string> | null;
}
declare class ExtRDFResourceWithLabel extends RDFResourceWithLabel {
    private _prefLabels;
    private _description;
    private _otherData;
    get prefLabels(): Record<string, string>;
    get description(): Record<string, string> | null;
    get otherData(): Record<string, any>;
    constructor(uri: string, prefLabels: Record<string, string>, data?: Record<string, any>, description?: Record<string, any> | null, prefixMap?: PrefixMap);
    addOtherData(key: string, value: any): ExtRDFResourceWithLabel;
}
declare class LiteralWithId extends rdf.Literal {
    id: string;
    constructor(value: string, language?: string | null, datatype?: rdf.NamedNode, id?: string);
    copy(): LiteralWithId;
    copyWithUpdatedValue(value: string): LiteralWithId;
    copyWithUpdatedLanguage(language: string): LiteralWithId;
}
declare type Value = Subject | LiteralWithId | RDFResourceWithLabel;
declare class Subject extends RDFResource {
    node: rdf.NamedNode;
    constructor(node: rdf.NamedNode, graph: EntityGraph);
    getUnitializedValues(property: any): Array<Value> | null;
    getAtomForProperty(pathString: string): RecoilState<Value[]>;
    noHisto(force?: boolean, start?: boolean | number): void;
    resetNoHisto(): void;
    static createEmpty(): Subject;
    isEmpty(): boolean;
}

declare const sortByPropValue: (nodelist: Array<rdf.NamedNode>, property: rdf.NamedNode, store: rdf.Store) => Array<rdf.NamedNode>;
declare class PropertyShape extends RDFResourceWithLabel {
    constructor(node: rdf.NamedNode, graph: EntityGraph);
    get prefLabels(): Record<string, string>;
    get helpMessage(): Record<string, string> | null;
    get errorMessage(): Record<string, string> | null;
    get defaultValue(): rdf.Node | null;
    get singleLine(): boolean;
    get connectIDs(): boolean;
    get displayPriority(): number | null;
    get minCount(): number | null;
    get maxCount(): number | null;
    get minInclusive(): number | null;
    get maxInclusive(): number | null;
    get minExclusive(): number | null;
    get maxExclusive(): number | null;
    get allowMarkDown(): boolean | null;
    get allowBatchManagement(): boolean | null;
    get uniqueValueAmongSiblings(): boolean | null;
    get uniqueLang(): boolean | null;
    get readOnly(): boolean;
    get defaultLanguage(): string | null;
    get editorLname(): string | null;
    get group(): rdf.NamedNode | null;
    get copyObjectsOfProperty(): Array<rdf.NamedNode> | null;
    get datatype(): rdf.NamedNode | null;
    get pattern(): string | null;
    get sortOnProperty(): rdf.NamedNode | null;
    get allowPushToTopLevelLabel(): boolean;
    get specialPattern(): rdf.NamedNode | null;
    static resourcizeWithInit(nodes: Array<rdf.NamedNode | rdf.BlankNode>, graph: EntityGraph): Array<RDFResourceWithLabel>;
    get hasListAsObject(): boolean;
    get in(): Array<RDFResourceWithLabel | LiteralWithId> | null;
    get expectedObjectTypes(): Array<RDFResourceWithLabel> | null;
    get path(): Path | null;
    get objectType(): ObjectType;
    get targetShape(): NodeShape | null;
}
declare class PropertyGroup extends RDFResourceWithLabel {
    constructor(node: rdf.NamedNode, graph: EntityGraph);
    get properties(): Array<PropertyShape>;
    get prefLabels(): Record<string, string>;
}
declare class NodeShape extends RDFResourceWithLabel {
    constructor(node: rdf.NamedNode, graph: EntityGraph);
    get targetClassPrefLabels(): Record<string, string> | null;
    get properties(): Array<PropertyShape>;
    get independentIdentifiers(): boolean;
    get groups(): Array<PropertyGroup>;
}
declare const generateSubnodes$1: (subshape: NodeShape | null, parent: RDFResource, n?: number) => Promise<Subject[]>;

declare const shapes_sortByPropValue: typeof sortByPropValue;
type shapes_PropertyShape = PropertyShape;
declare const shapes_PropertyShape: typeof PropertyShape;
type shapes_PropertyGroup = PropertyGroup;
declare const shapes_PropertyGroup: typeof PropertyGroup;
type shapes_NodeShape = NodeShape;
declare const shapes_NodeShape: typeof NodeShape;
declare namespace shapes {
  export {
    shapes_sortByPropValue as sortByPropValue,
    shapes_PropertyShape as PropertyShape,
    shapes_PropertyGroup as PropertyGroup,
    shapes_NodeShape as NodeShape,
    generateSubnodes$1 as generateSubnodes,
  };
}

declare enum EditedEntityState {
    Error = 0,
    Saved = 1,
    NeedsSaving = 2,
    Loading = 3,
    NotLoaded = 4
}
declare type Entity = {
    subjectQname: string;
    subject: Subject | null;
    shapeQname: string;
    state: EditedEntityState;
    subjectLabelState: RecoilState<Array<Value>>;
    preloadedLabel?: string;
    etag: string | null;
    loadedUnsavedFromLocalStorage: boolean;
};
declare const entitiesAtom: RecoilState<Entity[]>;
declare const defaultEntityLabelAtom: RecoilState<Value[]>;
declare const uiLangState: RecoilState<string>;
declare const uiLitLangState: RecoilState<string[]>;
declare const uiReadyState: RecoilState<boolean>;
declare const uiTabState: RecoilState<number>;
declare const uiRIDState: RecoilState<string[]>;
declare const uiEditState: RecoilState<string>;
declare const uiGroupState: RecoilState<string>;
declare const uiHistoryState: RecoilState<Record<string, never> | FC<{
    string: {
        string: Array<Value>;
    };
}>>;
declare type undoState = {
    enabled: boolean;
    subjectUri: string;
    propertyPath: string;
    parentPath: Array<string>;
};
declare type undoPN = {
    prev: undoState;
    next: undoState;
};
declare const sameUndoSub: (undo1: undoState, undo2: undoState) => boolean;
declare const sameUndo: (undo1: undoPN | null, undo2: undoPN | null) => boolean | null;
declare const noUndo: {
    enabled: boolean;
    subjectUri: string;
    propertyPath: string;
    parentPath: never[];
};
declare const noUndoRedo: {
    prev: {
        enabled: boolean;
        subjectUri: string;
        propertyPath: string;
        parentPath: never[];
    };
    next: {
        enabled: boolean;
        subjectUri: string;
        propertyPath: string;
        parentPath: never[];
    };
};
declare const uiUndosState: RecoilState<Record<string, undoPN>>;
declare const uiNavState: RecoilState<string>;
declare const sessionLoadedState: RecoilState<boolean>;
declare const profileIdState: RecoilState<string>;
declare const uiDisabledTabsState: RecoilState<boolean>;
declare const reloadProfileState: RecoilState<boolean>;
declare const reloadEntityState: RecoilState<string>;
declare type orderedByPropSelectorArgs = {
    atom: RecoilValue<Array<Value>>;
    propertyPath: string;
    order: string;
};
declare const orderedByPropSelector: (param: orderedByPropSelectorArgs) => recoil.RecoilValueReadOnly<any>;
declare type personNamesLabelsSelectorArgs = {
    atom: RecoilValue<Array<Subject>>;
};
declare const personNamesLabelsSelector: (param: personNamesLabelsSelectorArgs) => recoil.RecoilValueReadOnly<any>;
declare const initListAtom: RecoilState<Value[]>;
declare const initStringAtom: RecoilState<string>;
declare const initMapAtom: RecoilState<Record<string, Value[]>>;
declare const initkvAtom: RecoilState<{
    k: string;
    val: Value[];
}>;
declare type canPushPrefLabelGroupType = {
    props?: RecoilState<Value[]>[];
    subprops?: Record<string, {
        atom: RecoilState<Subject[]>;
        allowPush: string[];
    }>;
};
declare type canPushPrefLabelGroupsType = {
    canPushPrefLabelGroups: Record<string, canPushPrefLabelGroupType>;
};
declare const possiblePrefLabelsSelector: (param: canPushPrefLabelGroupsType) => recoil.RecoilValueReadOnly<Record<string, Value[]>>;
declare type orderedNewValSelectorType = {
    atom: RecoilState<Subject[]> | null;
    propertyPath: string;
    order?: "asc" | "desc";
};
declare const orderedNewValSelector: (param: orderedNewValSelectorType) => recoil.RecoilValueReadOnly<string>;
declare type toCopySelectorsType = Array<{
    property: string;
    atom: RecoilState<Value[]>;
}>;
declare type toCopySelectorType = {
    list?: toCopySelectorsType;
};
declare const toCopySelector: (param: toCopySelectorType) => RecoilState<{
    k: string;
    val: Value[];
}[]>;
declare const savePopupState: RecoilState<boolean>;
declare type ESfromRecoilSelectorType = {
    property: PropertyShape;
    subject: Subject;
    entityQname: string;
    undo: Record<string, undoState>;
    hStatus: HistoryStatus;
    status: EditedEntityState;
    id: string;
    removingFacet: boolean;
    forceRemove: boolean;
};
declare const ESfromRecoilSelector: (param: any) => RecoilState<any>;
declare type isUniqueTestSelectorType = {
    checkUnique: boolean;
    siblingsAtom: RecoilState<Subject[]>;
    propertyPath: string;
};
declare const isUniqueTestSelector: (param: isUniqueTestSelectorType) => recoil.RecoilValueReadOnly<boolean>;

type common_EditedEntityState = EditedEntityState;
declare const common_EditedEntityState: typeof EditedEntityState;
type common_Entity = Entity;
declare const common_entitiesAtom: typeof entitiesAtom;
declare const common_defaultEntityLabelAtom: typeof defaultEntityLabelAtom;
declare const common_uiLangState: typeof uiLangState;
declare const common_uiLitLangState: typeof uiLitLangState;
declare const common_uiReadyState: typeof uiReadyState;
declare const common_uiTabState: typeof uiTabState;
declare const common_uiRIDState: typeof uiRIDState;
declare const common_uiEditState: typeof uiEditState;
declare const common_uiGroupState: typeof uiGroupState;
declare const common_uiHistoryState: typeof uiHistoryState;
type common_undoState = undoState;
type common_undoPN = undoPN;
declare const common_sameUndoSub: typeof sameUndoSub;
declare const common_sameUndo: typeof sameUndo;
declare const common_noUndo: typeof noUndo;
declare const common_noUndoRedo: typeof noUndoRedo;
declare const common_uiUndosState: typeof uiUndosState;
declare const common_uiNavState: typeof uiNavState;
declare const common_sessionLoadedState: typeof sessionLoadedState;
declare const common_profileIdState: typeof profileIdState;
declare const common_uiDisabledTabsState: typeof uiDisabledTabsState;
declare const common_reloadProfileState: typeof reloadProfileState;
declare const common_reloadEntityState: typeof reloadEntityState;
type common_orderedByPropSelectorArgs = orderedByPropSelectorArgs;
declare const common_orderedByPropSelector: typeof orderedByPropSelector;
type common_personNamesLabelsSelectorArgs = personNamesLabelsSelectorArgs;
declare const common_personNamesLabelsSelector: typeof personNamesLabelsSelector;
declare const common_initListAtom: typeof initListAtom;
declare const common_initStringAtom: typeof initStringAtom;
declare const common_initMapAtom: typeof initMapAtom;
declare const common_initkvAtom: typeof initkvAtom;
type common_canPushPrefLabelGroupType = canPushPrefLabelGroupType;
type common_canPushPrefLabelGroupsType = canPushPrefLabelGroupsType;
declare const common_possiblePrefLabelsSelector: typeof possiblePrefLabelsSelector;
type common_orderedNewValSelectorType = orderedNewValSelectorType;
declare const common_orderedNewValSelector: typeof orderedNewValSelector;
type common_toCopySelectorsType = toCopySelectorsType;
type common_toCopySelectorType = toCopySelectorType;
declare const common_toCopySelector: typeof toCopySelector;
declare const common_savePopupState: typeof savePopupState;
type common_ESfromRecoilSelectorType = ESfromRecoilSelectorType;
declare const common_ESfromRecoilSelector: typeof ESfromRecoilSelector;
type common_isUniqueTestSelectorType = isUniqueTestSelectorType;
declare const common_isUniqueTestSelector: typeof isUniqueTestSelector;
declare namespace common {
  export {
    common_EditedEntityState as EditedEntityState,
    common_Entity as Entity,
    common_entitiesAtom as entitiesAtom,
    common_defaultEntityLabelAtom as defaultEntityLabelAtom,
    common_uiLangState as uiLangState,
    common_uiLitLangState as uiLitLangState,
    common_uiReadyState as uiReadyState,
    common_uiTabState as uiTabState,
    common_uiRIDState as uiRIDState,
    common_uiEditState as uiEditState,
    common_uiGroupState as uiGroupState,
    common_uiHistoryState as uiHistoryState,
    common_undoState as undoState,
    common_undoPN as undoPN,
    common_sameUndoSub as sameUndoSub,
    common_sameUndo as sameUndo,
    common_noUndo as noUndo,
    common_noUndoRedo as noUndoRedo,
    common_uiUndosState as uiUndosState,
    common_uiNavState as uiNavState,
    common_sessionLoadedState as sessionLoadedState,
    common_profileIdState as profileIdState,
    common_uiDisabledTabsState as uiDisabledTabsState,
    common_reloadProfileState as reloadProfileState,
    common_reloadEntityState as reloadEntityState,
    common_orderedByPropSelectorArgs as orderedByPropSelectorArgs,
    common_orderedByPropSelector as orderedByPropSelector,
    common_personNamesLabelsSelectorArgs as personNamesLabelsSelectorArgs,
    common_personNamesLabelsSelector as personNamesLabelsSelector,
    common_initListAtom as initListAtom,
    common_initStringAtom as initStringAtom,
    common_initMapAtom as initMapAtom,
    common_initkvAtom as initkvAtom,
    common_canPushPrefLabelGroupType as canPushPrefLabelGroupType,
    common_canPushPrefLabelGroupsType as canPushPrefLabelGroupsType,
    common_possiblePrefLabelsSelector as possiblePrefLabelsSelector,
    common_orderedNewValSelectorType as orderedNewValSelectorType,
    common_orderedNewValSelector as orderedNewValSelector,
    common_toCopySelectorsType as toCopySelectorsType,
    common_toCopySelectorType as toCopySelectorType,
    common_toCopySelector as toCopySelector,
    common_savePopupState as savePopupState,
    common_ESfromRecoilSelectorType as ESfromRecoilSelectorType,
    common_ESfromRecoilSelector as ESfromRecoilSelector,
    common_isUniqueTestSelectorType as isUniqueTestSelectorType,
    common_isUniqueTestSelector as isUniqueTestSelector,
  };
}

declare namespace enTranslations {
    namespace home {
        const title: string;
        const uilang: string;
        const nav: string;
    }
    namespace types {
        export const loading: string;
        export const creating: string;
        export const redirect: string;
        export const boolean: string;
        const _true: string;
        export { _true as true };
        const _false: string;
        export { _false as false };
        export const unset: string;
    }
    namespace search {
        export namespace help {
            const preview: string;
            const open: string;
            const replace: string;
            const edit: string;
        }
        export const lookup: string;
        export const cancel: string;
        export const change: string;
        export const create: string;
        const _new: string;
        export { _new as new };
        const open_1: string;
        export { open_1 as open };
    }
    namespace error {
        export const inferiorTo: string;
        export const superiorTo: string;
        export const inferiorToStrict: string;
        export const superiorToStrict: string;
        export const empty: string;
        export const unique: string;
        export const uniqueV: string;
        export const exist: string;
        export const shape: string;
        const redirect_1: string;
        export { redirect_1 as redirect };
        export const minC: string;
        export const maxC: string;
        export const prefix: string;
        export const notF: string;
        export const type: string;
        const preview_1: string;
        export { preview_1 as preview };
        export const force: string;
        export const modified: string;
        export const unauthorized: string;
        export const year: string;
        export const select: string;
        export const local_load_fail: string;
    }
    namespace general {
        export const add_another: string;
        export const add_another_plural: string;
        export const toggle: string;
        export const show: string;
        export const hide: string;
        export const add_nb: string;
        export const close: string;
        const _import: string;
        export { _import as import };
        export const save: string;
        export const ok: string;
        const cancel_1: string;
        export { cancel_1 as cancel };
        export const load_previous_q: string;
    }
}

declare type Lang = {
    value: string;
    keyboard?: string[];
};
declare const ValueByLangToStrPrefLang: (vbl: Record<string, string> | null, prefLang: string | Array<string>) => string;

interface IFetchState {
    status: string;
    error?: string;
}
interface generateSubnodes {
    (subshape: NodeShape, parent: RDFResource, n: number): Promise<Subject[]>;
}
interface valueByLangToStrPrefLang {
    (vbl: Record<string, string> | null, prefLang: string | Array<string>): string;
}
declare type previewResults = {
    value: string | null;
    error: React.ReactNode | null;
};
interface previewLiteral {
    (literal: rdf.Literal, uiLangs: string[]): previewResults;
}
interface generateConnectedID {
    (old_resource: RDFResource, old_shape: NodeShape, type: RDFResource): Promise<rdf.NamedNode>;
}
interface getDocument {
    (entity: rdf.NamedNode): Promise<{
        subject: Subject;
        etag: string | null;
    }>;
}
interface getConnexGraph {
    (entity: rdf.NamedNode): Promise<rdf.Store>;
}
interface getShapesDocument {
    (entity: rdf.NamedNode): Promise<NodeShape>;
}
interface putDocument {
    (entity: rdf.NamedNode, document: rdf.Store, etag: string | null, message: string | undefined): Promise<string>;
}
interface getPreviewLink {
    (entity: rdf.NamedNode): string | null;
}
interface getUserLocalEntities {
    (): Promise<Record<string, LocalEntityInfo>>;
}
interface getUserMenuState {
    (): Promise<Record<string, Entity>>;
}
interface setUserMenuState {
    (subjectQname: string, shapeQname: string | null, labels: string | undefined, del: boolean, etag: string | null): Promise<void>;
}
interface LocalEntityInfo {
    shapeQname: string;
    ttl: string;
    etag: string | null;
    needsSaving: boolean;
}
interface entityCreator {
    (shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null, unmounting: {
        val: boolean;
    }): {
        entityLoadingState: IFetchState;
        entity: Subject | null;
        reset: () => void;
    };
}
interface setUserLocalEntity {
    (subjectQname: string, shapeQname: string | null, ttl: string | undefined, del: boolean, etag: string | null, needsSaving: boolean): Promise<void>;
}
interface iconFromEntity {
    (entity: Entity | null): string;
}
declare type ShapeRef = RDFResourceWithLabel;
interface possibleShapeRefsForEntity {
    (entity: rdf.NamedNode): ShapeRef[];
}
interface possibleShapeRefsForType {
    (type: rdf.NamedNode): ShapeRef[];
}
declare type ResourceSelector = FC<{
    value: ExtRDFResourceWithLabel;
    onChange: (value: ExtRDFResourceWithLabel, idx: number, removeFirst: boolean | undefined) => void;
    property: PropertyShape;
    idx: number;
    exists: (uri: string) => boolean;
    subject: Subject;
    editable: boolean;
    owner?: Subject;
    title: string;
    globalError: string;
    updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void;
    shape: NodeShape;
    config: RDEConfig;
}>;
interface RDEConfig {
    readonly generateSubnodes: generateSubnodes;
    readonly valueByLangToStrPrefLang: valueByLangToStrPrefLang;
    readonly possibleLiteralLangs: Array<Lang>;
    readonly labelProperties: Array<rdf.NamedNode>;
    readonly descriptionProperties: Array<rdf.NamedNode>;
    readonly prefixMap: PrefixMap;
    readonly generateConnectedID: generateConnectedID;
    readonly entityCreator: entityCreator;
    readonly getDocument: getDocument;
    readonly previewLiteral: previewLiteral;
    readonly previewEntityLabel?: Record<string, string>;
    readonly getPreviewLink: getPreviewLink;
    readonly getShapesDocument: getShapesDocument;
    readonly getConnexGraph: getConnexGraph;
    readonly getUserLocalEntities: getUserLocalEntities;
    readonly getUserMenuState: getUserMenuState;
    readonly setUserMenuState: setUserMenuState;
    readonly setUserLocalEntity: setUserLocalEntity;
    readonly googleMapsAPIKey?: string;
    readonly latProp?: rdf.NamedNode;
    readonly lngProp?: rdf.NamedNode;
    readonly gisPropertyGroup?: rdf.NamedNode;
    readonly iconFromEntity: iconFromEntity;
    readonly possibleShapeRefs: ShapeRef[];
    possibleShapeRefsForEntity: possibleShapeRefsForEntity;
    possibleShapeRefsForType: possibleShapeRefsForType;
    libraryUrl?: string;
    resourceSelector: ResourceSelector;
    putDocument: putDocument;
}

interface IdTypeParams {
    config: RDEConfig;
    shapeQname?: string;
    entityQname?: string;
    subjectQname?: string;
    propertyQname?: string;
    index?: number;
    subnodeQname?: string;
}
interface RDEProps extends IdTypeParams {
    copy?: string | null | (string | null)[];
}

declare function EntityEditContainerMayUpdate(props: RDEProps): JSX.Element;
declare function EntityEditContainer(props: RDEProps): JSX.Element;

declare function NewEntityContainer(props: RDEProps): JSX.Element;

declare function EntityCreationContainer(props: RDEProps): JSX.Element;
declare function EntityCreationContainerRoute(props: RDEProps): JSX.Element;

declare function EntityShapeChooserContainer(props: RDEProps): JSX.Element;

declare function EntitySelector(props: RDEProps): JSX.Element;

declare function BottomBarContainer(props: RDEProps): JSX.Element;

interface StoreWithEtag {
    store: rdf.Store;
    etag: string | null;
}
declare class HttpError extends Error {
    status: number;
    constructor(message: string, status: number);
}
declare const fetchTtl: (url: string, allow404?: boolean, headers?: Headers, allowEmptyEtag?: boolean) => Promise<StoreWithEtag>;

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {
    }
}
declare const BUDAResourceSelector: FC<{
    value: ExtRDFResourceWithLabel;
    onChange: (value: ExtRDFResourceWithLabel, idx: number, removeFirst: boolean | undefined) => void;
    property: PropertyShape;
    idx: number;
    exists: (uri: string) => boolean;
    subject: Subject;
    editable: boolean;
    owner?: Subject;
    title: string;
    globalError: string;
    updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void;
    shape: NodeShape;
    config: RDEConfig;
}>;

export { BUDAResourceSelector, BottomBarContainer, Entity, EntityCreationContainer, EntityCreationContainerRoute, EntityEditContainer, EntityEditContainerMayUpdate, EntityGraph, EntitySelector as EntitySelectorContainer, EntityShapeChooserContainer, ExtRDFResourceWithLabel, HistoryStatus, HttpError, IFetchState, IdTypeParams, Lang, LiteralWithId, LocalEntityInfo, NewEntityContainer, NodeShape, RDEConfig, RDEProps, RDFResource, RDFResourceWithLabel, Subject, ValueByLangToStrPrefLang, common as atoms, enTranslations, fetchTtl, generateSubnodes$1 as generateSubnodes, getHistoryStatus, history, ns, shapes, updateHistory };
