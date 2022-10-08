import * as rdf from "rdflib"
import { useState, useEffect, useContext } from "react"
import { useRecoilState } from "recoil"
import { RDFResource, Subject, EntityGraph, RDFResourceWithLabel } from "./types"
import { NodeShape } from "./shapes"
import * as shapes from "./shapes"
import { entitiesAtom, EditedEntityState } from "../../containers/EntitySelectorContainer"
import { uiTabState, userIdState, RIDprefixState, demoAtom } from "../../atoms/common"


export const generateSubnode = async (
  subshape: NodeShape,
  parent: RDFResource,
  userPrefix: string,
  idToken: string | null
  //n = 1
): Promise<Subject | Subject[]> => {

}



export const ValueByLangToStrPrefLang = (vbl: Record<string, string> | null, prefLang: string | Array<string>): string => {
  return ""
}

export const langs: Array<Lang> = [
  { value: "en" },
]

// TODO: use in types.ts
export cont labelProperties: Array<rdf.NamedNode>

export cont descriptionProperties: Array<rdf.NamedNode>

// TODO: merge those with the ones in ns.ts
export const prefixToURI: { [key: string]: string }

export function EntityCreator(shapeQname: string, entityQname: string | null, unmounting = { val: false }) {}

export const removeEntityPrefix = (lname: string): string => {}

export const getDocument = async (entity: RDFResource) => rdf.Store {}

export const getDocumentShapeGraph = async (entity: RDFResource) => rdf.Store {}

export const getConnexGraph = async (entity: RDFResource) => rdf.Store {}

export const putDocument = async (entity: RDFResource, graph: rdf.Store) => {}
