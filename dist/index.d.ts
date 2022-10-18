import * as rdflib_lib_tf_types from 'rdflib/lib/tf-types';
import * as rdf from 'rdflib';
import { RecoilState, AtomEffect } from 'recoil';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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
    ns_defaultPrefixMap as defaultPrefixMap,
  };
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
    getUnitializedValues(s: RDFResource, p: PropertyShape): Array<Value> | null;
    getPropValuesFromStore(s: RDFResource, p: PropertyShape): Array<Value>;
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
    constructor(uri: string, prefLabels: Record<string, string>, data?: Record<string, any>, description?: Record<string, any> | null);
    addOtherData(key: string, value: any): ExtRDFResourceWithLabel;
}
declare enum ObjectType {
    Literal = 0,
    Internal = 1,
    ResInList = 2,
    ResExt = 3,
    ResIgnore = 4,
    LitInList = 5
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
    getUnitializedValues(property: PropertyShape): Array<Value> | null;
    getAtomForProperty(pathString: string): RecoilState<Value[]>;
    noHisto(force?: boolean, start?: boolean | number): void;
    resetNoHisto(): void;
    static createEmpty(): Subject;
    isEmpty(): boolean;
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
declare const defaultLabelProperties: rdf.NamedNode[];
declare const defaultDescriptionProperties: rdf.NamedNode[];
declare const sortByPropValue: (nodelist: Array<rdf.NamedNode>, property: rdf.NamedNode, store: rdf.Store) => Array<rdf.NamedNode>;
declare class Path {
    sparqlString: string;
    directPathNode: rdf.NamedNode | null;
    inversePathNode: rdf.NamedNode | null;
    constructor(node: rdf.NamedNode, graph: EntityGraph, listMode: boolean);
}
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
declare const generateSubnode$1: (subshape: NodeShape, parent: RDFResource) => Promise<Subject>;

declare const shapes_rdfType: typeof rdfType;
declare const shapes_shProperty: typeof shProperty;
declare const shapes_shGroup: typeof shGroup;
declare const shapes_shOrder: typeof shOrder;
declare const shapes_rdfsLabel: typeof rdfsLabel;
declare const shapes_prefLabel: typeof prefLabel;
declare const shapes_shName: typeof shName;
declare const shapes_shPath: typeof shPath;
declare const shapes_dashEditor: typeof dashEditor;
declare const shapes_shNode: typeof shNode;
declare const shapes_dashListShape: typeof dashListShape;
declare const shapes_dashEnumSelectEditor: typeof dashEnumSelectEditor;
declare const shapes_shMessage: typeof shMessage;
declare const shapes_rdeDisplayPriority: typeof rdeDisplayPriority;
declare const shapes_shMinCount: typeof shMinCount;
declare const shapes_shMinInclusive: typeof shMinInclusive;
declare const shapes_shMinExclusive: typeof shMinExclusive;
declare const shapes_shClass: typeof shClass;
declare const shapes_shMaxCount: typeof shMaxCount;
declare const shapes_shMaxInclusive: typeof shMaxInclusive;
declare const shapes_shMaxExclusive: typeof shMaxExclusive;
declare const shapes_shDatatype: typeof shDatatype;
declare const shapes_dashSingleLine: typeof dashSingleLine;
declare const shapes_shTargetClass: typeof shTargetClass;
declare const shapes_shTargetObjectsOf: typeof shTargetObjectsOf;
declare const shapes_shTargetSubjectsOf: typeof shTargetSubjectsOf;
declare const shapes_rdePropertyShapeType: typeof rdePropertyShapeType;
declare const shapes_rdeInternalShape: typeof rdeInternalShape;
declare const shapes_rdeExternalShape: typeof rdeExternalShape;
declare const shapes_rdeIgnoreShape: typeof rdeIgnoreShape;
declare const shapes_rdeClassIn: typeof rdeClassIn;
declare const shapes_shIn: typeof shIn;
declare const shapes_shInversePath: typeof shInversePath;
declare const shapes_shUniqueLang: typeof shUniqueLang;
declare const shapes_rdeReadOnly: typeof rdeReadOnly;
declare const shapes_rdeIdentifierPrefix: typeof rdeIdentifierPrefix;
declare const shapes_rdeAllowMarkDown: typeof rdeAllowMarkDown;
declare const shapes_shNamespace: typeof shNamespace;
declare const shapes_rdeDefaultLanguage: typeof rdeDefaultLanguage;
declare const shapes_rdeDefaultValue: typeof rdeDefaultValue;
declare const shapes_shLanguageIn: typeof shLanguageIn;
declare const shapes_shPattern: typeof shPattern;
declare const shapes_rdeSortOnProperty: typeof rdeSortOnProperty;
declare const shapes_rdeAllowPushToTopLevelLabel: typeof rdeAllowPushToTopLevelLabel;
declare const shapes_rdeIndependentIdentifiers: typeof rdeIndependentIdentifiers;
declare const shapes_rdeSpecialPattern: typeof rdeSpecialPattern;
declare const shapes_rdeConnectIDs: typeof rdeConnectIDs;
declare const shapes_rdeAllowBatchManagement: typeof rdeAllowBatchManagement;
declare const shapes_rdeCopyObjectsOfProperty: typeof rdeCopyObjectsOfProperty;
declare const shapes_rdeUniqueValueAmongSiblings: typeof rdeUniqueValueAmongSiblings;
declare const shapes_rdfLangString: typeof rdfLangString;
declare const shapes_skosDefinition: typeof skosDefinition;
declare const shapes_rdfsComment: typeof rdfsComment;
declare const shapes_shDescription: typeof shDescription;
declare const shapes_defaultLabelProperties: typeof defaultLabelProperties;
declare const shapes_defaultDescriptionProperties: typeof defaultDescriptionProperties;
declare const shapes_sortByPropValue: typeof sortByPropValue;
type shapes_Path = Path;
declare const shapes_Path: typeof Path;
type shapes_PropertyShape = PropertyShape;
declare const shapes_PropertyShape: typeof PropertyShape;
type shapes_PropertyGroup = PropertyGroup;
declare const shapes_PropertyGroup: typeof PropertyGroup;
type shapes_NodeShape = NodeShape;
declare const shapes_NodeShape: typeof NodeShape;
declare namespace shapes {
  export {
    shapes_rdfType as rdfType,
    shapes_shProperty as shProperty,
    shapes_shGroup as shGroup,
    shapes_shOrder as shOrder,
    shapes_rdfsLabel as rdfsLabel,
    shapes_prefLabel as prefLabel,
    shapes_shName as shName,
    shapes_shPath as shPath,
    shapes_dashEditor as dashEditor,
    shapes_shNode as shNode,
    shapes_dashListShape as dashListShape,
    shapes_dashEnumSelectEditor as dashEnumSelectEditor,
    shapes_shMessage as shMessage,
    shapes_rdeDisplayPriority as rdeDisplayPriority,
    shapes_shMinCount as shMinCount,
    shapes_shMinInclusive as shMinInclusive,
    shapes_shMinExclusive as shMinExclusive,
    shapes_shClass as shClass,
    shapes_shMaxCount as shMaxCount,
    shapes_shMaxInclusive as shMaxInclusive,
    shapes_shMaxExclusive as shMaxExclusive,
    shapes_shDatatype as shDatatype,
    shapes_dashSingleLine as dashSingleLine,
    shapes_shTargetClass as shTargetClass,
    shapes_shTargetObjectsOf as shTargetObjectsOf,
    shapes_shTargetSubjectsOf as shTargetSubjectsOf,
    shapes_rdePropertyShapeType as rdePropertyShapeType,
    shapes_rdeInternalShape as rdeInternalShape,
    shapes_rdeExternalShape as rdeExternalShape,
    shapes_rdeIgnoreShape as rdeIgnoreShape,
    shapes_rdeClassIn as rdeClassIn,
    shapes_shIn as shIn,
    shapes_shInversePath as shInversePath,
    shapes_shUniqueLang as shUniqueLang,
    shapes_rdeReadOnly as rdeReadOnly,
    shapes_rdeIdentifierPrefix as rdeIdentifierPrefix,
    shapes_rdeAllowMarkDown as rdeAllowMarkDown,
    shapes_shNamespace as shNamespace,
    shapes_rdeDefaultLanguage as rdeDefaultLanguage,
    shapes_rdeDefaultValue as rdeDefaultValue,
    shapes_shLanguageIn as shLanguageIn,
    shapes_shPattern as shPattern,
    shapes_rdeSortOnProperty as rdeSortOnProperty,
    shapes_rdeAllowPushToTopLevelLabel as rdeAllowPushToTopLevelLabel,
    shapes_rdeIndependentIdentifiers as rdeIndependentIdentifiers,
    shapes_rdeSpecialPattern as rdeSpecialPattern,
    shapes_rdeConnectIDs as rdeConnectIDs,
    shapes_rdeAllowBatchManagement as rdeAllowBatchManagement,
    shapes_rdeCopyObjectsOfProperty as rdeCopyObjectsOfProperty,
    shapes_rdeUniqueValueAmongSiblings as rdeUniqueValueAmongSiblings,
    shapes_rdfLangString as rdfLangString,
    shapes_skosDefinition as skosDefinition,
    shapes_rdfsComment as rdfsComment,
    shapes_shDescription as shDescription,
    shapes_defaultLabelProperties as defaultLabelProperties,
    shapes_defaultDescriptionProperties as defaultDescriptionProperties,
    shapes_sortByPropValue as sortByPropValue,
    shapes_Path as Path,
    shapes_PropertyShape as PropertyShape,
    shapes_PropertyGroup as PropertyGroup,
    shapes_NodeShape as NodeShape,
    generateSubnode$1 as generateSubnode,
  };
}

interface StoreWithEtag {
    store: rdf.Store;
    etag: string | null;
}
declare const fetchTtl: (url: string, allow404?: boolean, headers?: Headers, allowEmptyEtag?: boolean) => Promise<StoreWithEtag>;
interface IFetchState {
    status: string;
    error?: string;
}

interface IdTypeParams {
    shapeQname: string;
    entityQname: string;
    subjectQname?: string;
    propertyQname?: string;
    index?: string;
    subnodeQname?: string;
}
interface RDEProps extends RouteComponentProps<IdTypeParams> {
    copy?: string | null | (string | null)[];
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

declare type Lang = {
    value: string;
    keyboard?: string[];
};
declare const ValueByLangToStrPrefLang: (vbl: Record<string, string> | null, prefLang: string | Array<string>) => string;

interface generateSubnode {
    (subshape: NodeShape, parent: RDFResource): Promise<Subject>;
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
    (old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape): Promise<rdf.NamedNode>;
}
interface getDocument {
    (entity: rdf.NamedNode): Promise<{
        subject: Subject;
        etag: string;
    }>;
}
interface getConnexGraph {
    (entity: rdf.NamedNode): Promise<rdf.Store>;
}
interface getShapesDocument {
    (entity: rdf.NamedNode): Promise<NodeShape>;
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
    (subjectQname: string, shapeQname: string | null, ttl: string | null, del: boolean, userId: string, etag: string | null, needsSaving: boolean): Promise<void>;
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
    readonly generateSubnode: generateSubnode;
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
}

declare function EntityEditContainerMayUpdate(props: RDEProps): JSX.Element;
declare function EntityEditContainer(props: RDEProps, config: RDEConfig): JSX.Element;

declare function NewEntityContainer(props: RDEProps, config: RDEConfig): JSX.Element;

declare function EntityCreationContainer(props: RDEProps, config: RDEConfig): JSX.Element;
declare function EntityCreationContainerRoute(props: RDEProps): JSX.Element;

declare function EntityShapeChooserContainer(props: RDEProps, config: RDEConfig): JSX.Element;

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

export { BUDAResourceSelector, Entity, EntityCreationContainer, EntityCreationContainerRoute, EntityEditContainer, EntityEditContainerMayUpdate, EntityGraph, EntityShapeChooserContainer, ExtRDFResourceWithLabel, IFetchState, IdTypeParams, Lang, LiteralWithId, LocalEntityInfo, NewEntityContainer, NodeShape, RDEConfig, RDFResource, Subject, ValueByLangToStrPrefLang, fetchTtl, generateSubnode$1 as generateSubnode, ns, shapes };
