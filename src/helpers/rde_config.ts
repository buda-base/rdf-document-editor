import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId } from "./rdf/types"
import { NodeShape } from "./rdf/shapes"
import { PrefixMap } from "./rdf/ns"
import { Lang } from "./lang"
import { FC } from "react"

interface generateSubnode {
  (
    subshape: NodeShape,
    parent: RDFResource
  ): Promise<Subject>
}

interface valueByLangToStrPrefLang {
  (vbl: Record<string, string> | null, prefLang: string | Array<string>): string
}

interface previewLiteral {
  (literal: LiteralWithId): string
}

interface generateConnectedID {
  (old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape): Promise<rdf.NamedNode>
}

interface DocumentInfo {
  shapesDocument: rdf.Store
  document?: rdf.Store
  connexGraph?: rdf.Store
}

interface getDocumentInfo {
  (entity: rdf.NamedNode): Promise<DocumentInfo>
}

interface getShapesDocument {
  (entity: rdf.NamedNode): Promise<NodeShape>
}

interface putDocument {
  (entity: rdf.NamedNode, document: rdf.Store): Promise<void>
}

interface previewEntity {
  (entity: rdf.NamedNode): void
}

export interface RDEConfig {
  readonly generateSubnode: generateSubnode
  readonly valueByLangToStrPrefLang: valueByLangToStrPrefLang
  readonly possibleLiteralLangs: Array<Lang>
  readonly labelProperties: Array<rdf.NamedNode>
  readonly descriptionProperties: Array<rdf.NamedNode>
  readonly prefixMap: PrefixMap
  readonly generateConnectedID: generateConnectedID
  readonly entityCreator: FC<{ shapeQname: string; entityQname: string | null; unmounting: any }>
  readonly getDocumentInfo: getDocumentInfo
  readonly previewLiteral: previewLiteral
  readonly previewEntityLabel: Record<string, string>
  readonly previewEntity: previewEntity,
  readonly getShapesDocument: getShapesDocument
}
