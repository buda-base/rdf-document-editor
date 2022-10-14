import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId, RDFResourceWithLabel, ExtRDFResourceWithLabel } from "./rdf/types"
import { NodeShape, PropertyShape } from "./rdf/shapes"
import { PrefixMap } from "./rdf/ns"
import { IFetchState } from "./rdf/io"
import { Entity, EditedEntityState } from "../containers/EntitySelectorContainer"
import { Lang } from "./lang"
import { FC, PropsWithChildren } from "react"

interface generateSubnode {
  (subshape: NodeShape, parent: RDFResource): Promise<Subject>
}

interface valueByLangToStrPrefLang {
  (vbl: Record<string, string> | null, prefLang: string | Array<string>): string
}

export type previewResults = {
  value: string | null,
  error: React.ReactNode | null
}

interface previewLiteral {
  (literal: rdf.Literal, uiLangs: string[]): previewResults
}

interface generateConnectedID {
  (old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape): Promise<rdf.NamedNode>
}

interface getDocument {
  (entity: rdf.NamedNode): Promise<{subject: Subject, etag: string}>
}

interface getConnexGraph {
  (entity: rdf.NamedNode): Promise<rdf.Store>
}

interface getShapesDocument {
  (entity: rdf.NamedNode): Promise<NodeShape>
}

interface putDocument {
  (entity: rdf.NamedNode, document: rdf.Store): Promise<string>
}

interface getPreviewLink {
  (entity: rdf.NamedNode): string | null
}

interface getUserLocalEntities {
  (): Promise<Record<string, LocalEntityInfo>>
}

interface setUserLocalEntities {
  (localEntities: Record<string, LocalEntityInfo>): Promise<void>
}

interface getUserMenuState {
  (): Promise<Record<string, Entity>>
}

interface setUserMenuState {
  (
  subjectQname: string,
  shapeQname: string | null,
  labels: string | undefined,
  del: boolean,
  etag: string | null
  ): Promise<void>
}

export interface LocalEntityInfo {
  shapeQname: string,
  ttl: string,
  etag: string | null,
  needsSaving: boolean
}

type EntityCreatorArgs = {shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null, unmounting: {val: boolean}}

type EntityCreatorProps = PropsWithChildren<EntityCreatorArgs>

interface entityCreator {
  (shapeNode: rdf.NamedNode, entityNode: rdf.NamedNode | null, unmounting: {val: boolean}): { entityLoadingState: IFetchState, entity: Subject | null, reset: () => void }
}

type localEntityInfo = {
  subjectQname: string,
  shapeQname: string,
  ttl: string,
  del: boolean,
  userId: string,
  etag: string | null,
  needsSaving: boolean
}

interface setUserLocalEntity {
  (
  subjectQname: string,
  shapeQname: string | null,
  ttl: string | null,
  del: boolean,
  userId: string,
  etag: string | null,
  needsSaving: boolean
  ): Promise<void>
}

interface iconFromEntity {
  (entity: Entity | null): string
}

type ShapeRef = RDFResourceWithLabel

interface possibleShapeRefsForEntity {
  (entity: rdf.NamedNode): ShapeRef[]
}

interface possibleShapeRefsForType {
  (type: rdf.NamedNode): ShapeRef[]
}

type ResourceSelector = FC<{
  value: ExtRDFResourceWithLabel
  onChange: (value: ExtRDFResourceWithLabel, idx: number, removeFirst: boolean | undefined) => void
  property: PropertyShape
  idx: number
  exists: (uri: string) => boolean
  subject: Subject
  editable: boolean
  owner?: Subject
  title: string
  globalError: string
  updateEntityState: (status: EditedEntityState, id: string, removingFacet?: boolean, forceRemove?: boolean) => void
  shape: NodeShape,
  config: RDEConfig
}>

export default interface RDEConfig {
  readonly generateSubnode: generateSubnode
  readonly valueByLangToStrPrefLang: valueByLangToStrPrefLang
  readonly possibleLiteralLangs: Array<Lang>
  readonly labelProperties: Array<rdf.NamedNode>
  readonly descriptionProperties: Array<rdf.NamedNode>
  readonly prefixMap: PrefixMap
  readonly generateConnectedID: generateConnectedID
  readonly entityCreator: entityCreator
  readonly getDocument: getDocument
  readonly previewLiteral: previewLiteral
  readonly previewEntityLabel?: Record<string, string>
  readonly getPreviewLink: getPreviewLink
  readonly getShapesDocument: getShapesDocument
  readonly getConnexGraph: getConnexGraph
  readonly getUserLocalEntities: getUserLocalEntities
  readonly getUserMenuState: getUserMenuState
  readonly setUserMenuState: setUserMenuState
  readonly setUserLocalEntity: setUserLocalEntity
  readonly googleMapsAPIKey?: string
  readonly latProp: rdf.NamedNode
  readonly lngProp: rdf.NamedNode
  readonly gisPropertyGroup?: rdf.NamedNode
  readonly iconFromEntity: iconFromEntity
  readonly possibleShapeRefs: ShapeRef[]
  possibleShapeRefsForEntity: possibleShapeRefsForEntity
  possibleShapeRefsForType: possibleShapeRefsForType
  libraryUrl?: string
  resourceSelector: ResourceSelector
}
