import * as rdf from "rdflib"
import config from "../../config"
import { useState, useEffect, useContext } from "react"
import { useRecoilState } from "recoil"
import * as ns from "./ns"
import { RDFResource, Subject, EntityGraph, RDFResourceWithLabel } from "./types"
import { NodeShape } from "./shapes"
import { IFetchState, shapesMap, fetchUrlFromshapeQname, loadOntology, loadTtl, setUserLocalEntities } from "./io"
import * as shapes from "./shapes"
import { entitiesAtom, EditedEntityState } from "../../containers/EntitySelectorContainer"
import { useAuth0 } from "@auth0/auth0-react"
import { nanoid, customAlphabet } from "nanoid"
import { uiTabState, userIdState, RIDprefixState, demoAtom } from "../../atoms/common"

const debug = require("debug")("rde:rdf:construct")

const NANOID_LENGTH = 8
const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", NANOID_LENGTH)

export const generateSubnode = async (
  subshape: NodeShape,
  parent: RDFResource,
  userPrefix: string,
  idToken: string | null
  //n = 1
): Promise<Subject | Subject[]> => {
  if (subshape.node.uri.startsWith("http://purl.bdrc.io/ontology/shapes/adm/AdmEntityShape")) {
    // special case for admin entities
    const res = new Subject(new rdf.NamedNode(ns.BDA_uri + parent.lname), parent.graph)
    return Promise.resolve(res)
  }
  let prefix = subshape.getPropStringValue(shapes.bdsIdentifierPrefix)
  if (prefix == null) throw "cannot find entity prefix for " + subshape.qname
  let namespace = subshape.getPropStringValue(shapes.shNamespace)
  if (namespace == null) namespace = parent.namespace
  if (subshape.independentIdentifiers) {
    prefix += userPrefix
    if (!idToken) throw new Error("no token when reserving id")
    const reservedId = await reserveLname(prefix, null, idToken) //, n)
    //if (n == 1) {
    const res = new Subject(new rdf.NamedNode(namespace + reservedId), parent.graph)
    return Promise.resolve(res)
    // } else {
    //   const res = reservedId.split(/[ \n]+/).map((id) => new Subject(new rdf.NamedNode(namespace + id), parent.graph))
    //   return Promise.resolve(res)
    // }
  }
  let uri = namespace + prefix + parent.lname + nanoidCustom()
  while (parent.graph.hasSubject(uri)) {
    uri = namespace + prefix + nanoidCustom()
  }
  const res = new Subject(new rdf.NamedNode(uri), parent.graph)
  return Promise.resolve(res)
}

export const reserveLname = async (
  prefix: string,
  proposedLname: string | null,
  token: string,
  n = 1
): Promise<string> => {
  let url = config.API_BASEURL + "ID/" + prefix
  if (proposedLname) url += "/" + proposedLname
  else if (n > 1) url += "?n=" + n
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // eslint-disable-next-line no-magic-numbers
  if (response.status == 422) throw "422"
  const body = await response.text()
  return body
}

export function EntityCreator(shapeQname: string, entityQname: string | null, unmounting = { val: false }) {
  const [entityLoadingState, setEntityLoadingState] = useState<IFetchState>({ status: "idle", error: undefined })
  const [entity, setEntity] = useState<Subject>()
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const { getAccessTokenSilently, isAuthenticated, getIdTokenClaims } = useAuth0()
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"))
  const [shape, setShape] = useState<NodeShape>()
  const auth0 = useAuth0()
  const [tab, setTab] = useRecoilState(uiTabState)
  const [userId, setUserId] = useRecoilState(userIdState)
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)
  const [demo, setDemo] = useRecoilState(demoAtom)

  //debug("RIDp:", RIDprefix, idToken)

  useEffect(() => {
    return () => {
      unmounting.val = true
      //debug("unm:ecr",unmounting)
    }
  }, [])

  const reset = () => {
    setEntity(undefined)
    setShape(undefined)
    setEntityLoadingState({ status: "idle", error: undefined })
  }

  useEffect(() => {
    // we need to load the shape at the same time, which means we need to also
    // load the ontology
    async function createResource(shapeQname: string, entityQname: string | null) {
      if (!unmounting.val) setEntityLoadingState({ status: "fetching shape", error: undefined })
      const url = fetchUrlFromshapeQname(shapeQname)
      const loadShape = loadTtl(url)
      const loadOnto = loadOntology()
      let shape: NodeShape
      try {
        const store = await loadShape
        const ontology = await loadOnto
        const shapeUri = ns.uriFromQname(shapeQname)
        shape = new NodeShape(rdf.sym(shapeUri), new EntityGraph(store, shapeUri), ontology)
        if (!unmounting.val) setShape(shape)
      } catch (e) {
        debug(e)
        if (!unmounting.val) setEntityLoadingState({ status: "error", error: "error fetching shape" })
        return
      }

      const shapePrefix = shape.getPropStringValue(shapes.bdsIdentifierPrefix)
      let namespace = shape.getPropStringValue(shapes.shNamespace)
      if (namespace == null) namespace = ns.BDR_uri
      if (!unmounting.val) setEntityLoadingState({ status: "creating", error: undefined })
      let lname
      try {
        if (!idToken && !demo) throw new Error("no token when reserving id")
        const prefix = shapePrefix + RIDprefix
        // if entityQname is not null, we call reserveLname with the entityQname
        const proposedLname = entityQname ? ns.lnameFromQname(entityQname) : null
        if (idToken) lname = await reserveLname(prefix, proposedLname, idToken)
        else if (demo) {
          const max = 9999
          let free = false
          // check first if entity with id not already open
          do {
            if (proposedLname) {
              lname = proposedLname
            } else {
              lname = prefix + Math.floor(Math.random() * max)
            }
            if (entities.some((ent) => ent.entityQname === "bdr:" + lname)) {
              free = false
              if (proposedLname) proposedLname = ""
            } else {
              free = true
            }
          } while (!free)
        }
        debug("lname:", lname, prefix, proposedLname)
      } catch (e) {
        debug(e)
        // TODO: handle 422?
        if (!unmounting.val) setEntityLoadingState({ status: "error", error: e })
        return
      }
      const uri = namespace + lname
      const graph = new EntityGraph(rdf.graph(), uri)
      const node = new rdf.NamedNode(uri)
      const newSubject = new Subject(node, graph)

      const newEntity = {
        subjectQname: newSubject.qname,
        state: EditedEntityState.NeedsSaving,
        shapeRef: shape,
        subject: newSubject,
        subjectLabelState: newSubject.getAtomForProperty(shapes.prefLabel.uri),
        alreadySaved: false,
      }
      if (!unmounting.val) {
        const newEntities = [newEntity, ...entities]
        setEntities(newEntities)
      }
      if (!unmounting.val) setEntity(newSubject)
      if (!unmounting.val) setEntityLoadingState({ status: "created", error: undefined })

      // save to localStorage
      setUserLocalEntities(auth0, newSubject.qname, shapeQname, "", false, userId, null)

      if (!unmounting.val && tab !== 0) setTab(0)
    }
    if ((idToken || demo) && RIDprefix !== null) createResource(shapeQname, entityQname)
  }, [shapeQname, entityQname, RIDprefix])

  return { entityLoadingState, entity, reset }
}
