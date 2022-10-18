import * as rdf from 'rdflib';
import { RecoilState, AtomEffect } from 'recoil';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

export { EntityCreationContainer, EntityCreationContainerRoute, EntityEditContainer, EntityEditContainerMayUpdate, EntityShapeChooserContainer, IdTypeParams, NewEntityContainer };
