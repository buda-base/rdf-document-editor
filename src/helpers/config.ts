import * as rdf from "rdflib"
import { RDFResource, Subject, LiteralWithId } from "./rdf/types"
import { NodeShape } from "./rdf/shapes"
import { Lang } from "./lang"
import { FC } from "react"

interface generateSubnode {
  async(
    subshape: NodeShape,
    parent: RDFResource
    // user info ?
  ): Promise<Subject | Subject[]>
}

interface valueByLangToStrPrefLang {
  (vbl: Record<string, string> | null, prefLang: string | Array<string>): string
}

interface previewLiteral {
  (literal: LiteralWithId): string
}

interface generateConnectedID {
  async(old_resource: RDFResource, old_shape: NodeShape, new_shape: NodeShape): Promise<rdf.NamedNode>
}

interface DocumentInfo {
  shapesDocument: rdf.Store
  document?: rdf.Store
  connexGraph?: rdf.Store
}

interface getDocumentInfo {
  async(entity: rdf.NamedNode): Promise<DocumentInfo>
}

interface putDocument {
  async(entity: rdf.NamedNode, document: rdf.Store): Promise<void>
}

interface previewEntity {
  (entity: rdf.NamedNode): void
}

interface RDEConfig {
  generateSubnode: generateSubnode
  valueByLangToStrPrefLang: valueByLangToStrPrefLang
  possibleLiteralLangs: Array<Lang>
  labelProperties: Array<rdf.NamedNode>
  descriptionProperties: Array<rdf.NamedNode>
  prefixMap: { [key: string]: string }
  generateConnectedID: generateConnectedID
  entityCreator: FC<{ shapeQname: string; entityQname: string | null; unmounting: any }>
  getDocumentInfo: getDocumentInfo
  previewLiteral: previewLiteral
  previewEntityLabel: Record<string, string>
  previewEntity: previewEntity
}
