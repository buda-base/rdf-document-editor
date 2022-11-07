import * as rdf from "rdflib"
import i18n from "i18next"
import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { Subject, EntityGraph } from "./types"
import { NodeShape } from "./shapes"
import {
  profileIdState,
  uiReadyState,
  sessionLoadedState,
  reloadEntityState,
  uiDisabledTabsState,
  entitiesAtom,
  EditedEntityState,
  defaultEntityLabelAtom,
} from "../../atoms/common"
import RDEConfig, { IFetchState } from "../rde_config"
import { prefLabel } from "./ns"
import { debug as debugfactory } from "debug"

interface StoreWithEtag {
  store: rdf.Store
  etag: string | null
}

const debug = debugfactory("rde:rdf:io")

const defaultFetchTtlHeaders = new Headers()
defaultFetchTtlHeaders.set("Accept", "text/turtle")

export class HttpError extends Error {

  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const fetchTtl = async (
  url: string,
  allow404 = false,
  headers = defaultFetchTtlHeaders,
  allowEmptyEtag = true
): Promise<StoreWithEtag> => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, { headers: headers })

    // eslint-disable-next-line no-magic-numbers
    if (allow404 && response.status == 404) {
      resolve({ store: new rdf.Store(), etag: null })
      return
    }
    // eslint-disable-next-line no-magic-numbers
    if (response.status != 200) {
      reject(new HttpError("cannot fetch " + url, response.status))
      return
    }

    const etag = response.headers.get("etag")
    if (!allowEmptyEtag && !etag) {
      reject(new Error("no etag returned from " + url))
      return
    }

    const body = await response.text()
    const store: rdf.Store = new rdf.Store()
    try {
      rdf.parse(body, store, rdf.Store.defaultGraphURI, "text/turtle")
    } catch {
      reject(new Error("cannot parse result of " + url + " in ttl"))
      return
    }
    resolve({ store, etag })
  })
}

const defaultPutTtlHeaders = new Headers()
defaultPutTtlHeaders.set("Content-Type", "text/turtle")

export const putTtl = async (
  url: string,
  s: rdf.Store,
  method = "PUT",
  headers = defaultPutTtlHeaders,
  allowEmptyEtag = true
): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI)
    rdf.serialize(defaultRef, s, undefined, "text/turtle", async function (err, str) {
      if (err) {
        reject(err)
        return
      }
      const response = await fetch(url, { headers, method, body: str })
      const etag = response.headers.get("etag")

      // eslint-disable-next-line no-magic-numbers
      if (response.status == 403) {
        reject(new HttpError(i18n.t("error.unauthorized", { url }), response.status))
        return
      }

      // eslint-disable-next-line no-magic-numbers
      if (response.status == 412) {
        reject(new HttpError(i18n.t("error.modified"), response.status))
        return
      }

      // eslint-disable-next-line no-magic-numbers
      if (response.status > 400) {
        reject(new HttpError("error " + response.status + " when saving " + url, response.status))
        return
      }

      if (!etag && !allowEmptyEtag) {
        reject(new Error("no etag returned from " + url))
        return
      }

      resolve(etag)
    })
  })
}

// maps of the shapes and entities that have been downloaded so far, with no gc
export const shapesMap: Record<string, NodeShape> = {}

export function ShapeFetcher(shapeQname: string, entityQname: string, config: RDEConfig) {
  const [loadingState, setLoadingState] = useState<IFetchState>({ status: "idle", error: undefined })
  const [shape, setShape] = useState<NodeShape>()
  const [current, setCurrent] = useState(shapeQname)
  const [entities, setEntities] = useRecoilState(entitiesAtom)

  //debug("fetcher: shape ", shapeQname, current, shape)

  useEffect(() => {
    if (current != shapeQname) {
      reset()
    }
  })

  const reset = () => {
    setCurrent(shapeQname)
    setShape(undefined)
    setLoadingState({ status: "idle", error: undefined })
  }

  useEffect(() => {
    //debug("shM:", shapeQname, shapesMap, current)
    if (shape && shapeQname === current && loadingState.status === "fetched") {
      return
    }
    if (shapeQname in shapesMap) {
      setLoadingState({ status: "fetched", error: undefined })
      setShape(shapesMap[shapeQname])
      return
    }
    async function fetchResource(shapeQname: string) {
      setLoadingState({ status: "fetching", error: undefined })
      const shapeNode = rdf.sym(config.prefixMap.uriFromQname(shapeQname))
      const loadShape = config.getShapesDocument(shapeNode)
      try {
        const shape: NodeShape = await loadShape
        shapesMap[shapeQname] = shape
        setShape(shape)

        if (entityQname && entityQname !== "tmp:uri") {
          const index = entities.findIndex((e) => e.subjectQname === entityQname)
          if (index !== -1) {
            const newEntities = [...entities]
            newEntities[index] = {
              ...newEntities[index],
              shapeQname: shape.qname,
            }
            //debug("shape:", shape, entityQname, index, newEntities, newEntities[index])
            setEntities(newEntities)
          }
        }

        setLoadingState({ status: "fetched", error: undefined })
      } catch (e) {
        debug("shape error:", e)
        setLoadingState({ status: "error", error: "error fetching shape or ontology" })
      }
    }
    if (current === shapeQname) fetchResource(shapeQname)
  }, [config, entityQname, shape, shapeQname, current, entities])

  const retVal =
    shapeQname === current && shape && shapeQname == shape.qname
      ? { loadingState, shape, reset }
      : { loadingState: { status: "loading", error: undefined }, shape: undefined, reset }

  return retVal //{ loadingState, shape, reset }
}

export function EntityFetcher(entityQname: string, shapeQname: string, config: RDEConfig, unmounting = { val: false }) {
  const [entityLoadingState, setEntityLoadingState] = useState<IFetchState>({ status: "idle", error: undefined })
  const [entity, setEntity] = useState<Subject>(Subject.createEmpty())
  const [uiReady, setUiReady] = useRecoilState(uiReadyState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [sessionLoaded, setSessionLoaded] = useRecoilState(sessionLoadedState)
  const [idToken, setIdToken] = useState(localStorage.getItem("BLMPidToken"))
  const [profileId, setProfileId] = useRecoilState(profileIdState)
  const [current, setCurrent] = useState(entityQname)
  const [reloadEntity, setReloadEntity] = useRecoilState(reloadEntityState)
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState)

  //debug("reload?", reloadEntity, unmounting)

  useEffect(() => {
    return () => {
      //debug("unm:ef")
      unmounting.val = true
    }
  }, [])

  useEffect(() => {
    if (unmounting.val) return
    if (current != entityQname) {
      reset()
    }
  })

  const reset = () => {
    setCurrent(entityQname)
    setEntity(Subject.createEmpty())
    setEntityLoadingState({ status: "idle", error: undefined })
  }

  useEffect(() => {
    if (unmounting.val) return
    async function fetchResource(entityQname: string) {
      setEntityLoadingState({ status: "fetching", error: undefined })

      const entityUri = config.prefixMap.uriFromQname(entityQname)
      const entityNode = rdf.sym(entityUri)

      debug("fetching", entity, shapeQname, entityQname, entities) //, isAuthenticated, idToken)

      // TODO: UI "save draft" / "publish"

      let loadRes, loadLabels, localRes, useLocal, notFound, needsSaving
      let res: { subject: Subject; etag: string | null } | null = null
      let etag: string | null = null
      const localEntities = await config.getUserLocalEntities()
      // 1 - check if entity has local edits (once shape is defined)
      //debug("local?", shapeQname, reloadEntity,entityQname, localEntities[entityQname])
      if (reloadEntity !== entityQname && shapeQname && localEntities[entityQname] !== undefined) {
        useLocal = window.confirm(i18n.t("load_previous_q"))
        const store: rdf.Store = rdf.graph()
        if (useLocal) {
          try {
            rdf.parse(localEntities[entityQname].ttl, store, rdf.Store.defaultGraphURI, "text/turtle")
            etag = localEntities[entityQname].etag
            needsSaving = localEntities[entityQname].needsSaving
            debug("nS:", needsSaving)
          } catch (e) {
            debug(e)
            debug(localEntities[entityQname])
            window.alert(i18n.t("local_load_fail"))
            useLocal = false
            delete localEntities[entityQname]
          }
        } else {
          rdf.parse("", store, rdf.Store.defaultGraphURI, "text/turtle")
        }
        const subject = new Subject(entityNode, new EntityGraph(store, entityUri, config.prefixMap))
        res = { subject, etag }
      }

      // 2 - try to load data from server if not or if user wants to

      try {
        if (!useLocal) {
          res = await config.getDocument(entityNode)
          needsSaving = false
        }
      } catch (e) {
        // 3 - case when entity is not on server and user does not want to use local edits that already exist
        notFound = true
      }

      // load session before updating entities
      let _entities = entities
      if (!sessionLoaded) {
        const obj = await config.getUserMenuState()
        //debug("session:", obj)
        if (obj) {
          _entities = []
          for (const k of Object.keys(obj)) {
            _entities.push({
              subjectQname: k,
              subject: null,
              shapeQname: obj[k].shapeQname,
              subjectLabelState: defaultEntityLabelAtom,
              state: EditedEntityState.NotLoaded,
              preloadedLabel: obj[k].preloadedLabel,
              etag: obj[k].etag,
              loadedUnsavedFromLocalStorage: true,
            })
          }
        }
      }

      try {
        // TODO: redirection to /new instead of "error fetching entity"? create missing entity?
        if (notFound) throw Error("not found")

        const resInfo = await config.getDocument(entityNode)
        const subject = resInfo.subject
        etag = resInfo.etag

        // update state with loaded entity
        let index = _entities.findIndex((e) => e.subjectQname === entityQname)
        const newEntities = [..._entities]
        if (index === -1) {
          newEntities.push({
            subjectQname: entityQname,
            state: EditedEntityState.Loading,
            shapeQname: shapeQname,
            subject: null,
            subjectLabelState: defaultEntityLabelAtom,
            etag: etag,
            loadedUnsavedFromLocalStorage: false,
          })
          index = newEntities.length - 1
        }
        if (index >= 0 && newEntities[index] && !newEntities[index].subject) {
          newEntities[index] = {
            ...newEntities[index],
            subject,
            state: EditedEntityState.Saved,
            subjectLabelState: subject.getAtomForProperty(prefLabel.uri),
            preloadedLabel: "",
            etag: etag,
            ...etag ? { loadedUnsavedFromLocalStorage: needsSaving } : {},
          }

          // DONE: issue #2 fixed, fully using getEntities
          setEntities(newEntities)

          //debug("fetched")
        }
        setEntityLoadingState({ status: "fetched", error: undefined })
        setEntity(subject)
        setUiReady(true)

        if (reloadEntity) setReloadEntity("")
      } catch (e: any) {
        debug("e:", e.message, e)
        setDisabled(false)
        setEntityLoadingState({
          status: "error",
          error: e.message !== "not found" ? "error fetching entity" : "not found",
        })
        if (!entities.length && _entities.length) {
          setEntities(_entities)
        }
      }
      if (!sessionLoaded) setSessionLoaded(true)
    }
    const index = entities.findIndex(
      (e) => e.subjectQname === entityQname || entityQname == "tmp:user" && e.subjectQname === profileId
    )

    if (
      reloadEntity === entityQname && !entities[index].subject ||
      current === entityQname && (index === -1 || entities[index] && !entities[index].subject)
    ) {
      if (entityQname != "tmp:user" || idToken) fetchResource(entityQname)
    } else {
      if (unmounting.val) return
      else setEntityLoadingState({ status: "fetched", error: undefined })

      const subj: Subject | null = entities[index] ? entities[index].subject : null

      if (unmounting.val) return
      else if (subj) setEntity(subj)

      if (unmounting.val) return
      else setUiReady(true)
    }
  }, [config, entities, entityQname, entity, current, shapeQname, idToken, profileId, reloadEntity])

  const retVal =
    entityQname === current
      ? { entityLoadingState, entity, reset }
      : { entityLoadingState: { status: "loading", error: undefined }, entity: Subject.createEmpty(), reset }

  //debug("ret:",retVal)

  return retVal
}
