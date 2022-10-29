import React, { useState, useEffect, useCallback, useRef } from "react"
import { ShapeFetcher, EntityFetcher } from "../helpers/rdf/io"
import {
  Subject,
  ExtRDFResourceWithLabel,
  LiteralWithId,
  Value,
  sameLanguage,
  getParentPath,
  history,
} from "../helpers/rdf/types"
import { PropertyShape, PropertyGroup } from "../helpers/rdf/shapes"
import NotFoundIcon from "@mui/icons-material/BrokenImage"
import i18n from "i18next"
import PropertyGroupContainer from "./PropertyGroupContainer"
import {
  profileIdState,
  userIdState,
  uiLangState,
  uiEditState,
  uiUndosState,
  noUndoRedo,
  uiTabState,
  uiGroupState,
  possiblePrefLabelsSelector,
  initListAtom,
  initMapAtom,
  toCopySelector,
  canPushPrefLabelGroupType,
  canPushPrefLabelGroupsType,
  entitiesAtom,
  EditedEntityState,
  Entity,
} from "../atoms/common"
import * as lang from "../helpers/lang"
import { useRecoilState, useRecoilSnapshot, useRecoilValue, RecoilState } from "recoil"
import { RDEProps } from "../helpers/editor_props"
import * as rdf from "rdflib"
import * as ns from "../helpers/rdf/ns"
import { Navigate } from "react-router-dom"
import { HashLink as Link } from "react-router-hash-link"
import queryString from "query-string"
import { useLocation, useParams } from "react-router"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:entity:edit")

interface RDEPropsDoUpdate extends RDEProps {
  subject: Subject
  propertyQname: string
  objectQname: string
  index: number
}

function replaceItemAtIndex(arr: [], index: number, newValue: Value) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export function EntityEditContainerMayUpdate(props: RDEProps) {
  const params = useParams()
  const location = useLocation()

  const shapeQname = params.shapeQname
  const entityQname = params.entityQname
  const subjectQname = params.subjectQname
  const propertyQname = params.propertyQname
  const index = params.index
  const subnodeQname = params.subnodeQname

  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const snapshot = useRecoilSnapshot()
  const [subject, setSubject] = useState<Subject | null>(null)

  const { copy } = queryString.parse(location.search, { decode: false })

  useEffect(() => {
    const i = entities.findIndex((e) => e.subjectQname === subjectQname)
    let subj
    if (i === -1) return
    if (subnodeQname) {
      const pp = getParentPath(
        props.config.prefixMap.uriFromQname(subjectQname),
        props.config.prefixMap.uriFromQname(subnodeQname)
      )
      //debug("gPP:", pp)
      if (pp.length > 1 && i >= 0) {
        const atom = entities[i].subject?.getAtomForProperty(pp[1])
        if (!atom) {
          setSubject(null)
          return
        }
        subj = snapshot.getLoadable(atom).contents
        if (Array.isArray(subj)) {
          subj = subj.filter((s) => s.qname === subnodeQname)
          if (subj.length) subj = subj[0]
          else throw new Error("subnode not found: " + subnodeQname)
        }
        //debug("atom:", subj)
        setSubject(subj)
      }
    } else {
      subj = entities[i].subject
      setSubject(subj)
    }
  }, [])

  //debug("subj:", subject, propertyQname, entityQname, index)

  if (subject && propertyQname && entityQname && index) {
    const propsForCall = { ...props, copy: copy }
    return (
      <EntityEditContainerDoUpdate
        subject={subject}
        propertyQname={propertyQname}
        objectQname={entityQname}
        index={Number(index)}
        copy={copy}
        {...props}
      />
    )
  }
  // TODO: add 'could not find subject' warning?
  else if (subject != null) return <Navigate to={"/edit/" + entityQname + "/" + shapeQname} />
  else return <div></div>
}

function EntityEditContainerDoUpdate(props: RDEPropsDoUpdate) {
  const config = props.config
  const params = useParams()

  const shapeQname = params.shapeQname
  const atom = props.subject.getAtomForProperty(props.config.prefixMap.uriFromQname(props.propertyQname))
  const [list, setList] = useRecoilState(atom)

  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const i = entities.findIndex((e) => e.subjectQname === props.objectQname)
  const subject = entities[i]?.subject

  let copy: Record<string, Value[]> | null = null
  if (props.copy && typeof props.copy === "string") {
    copy = props.copy.split(";").reduce((acc: Record<string, Value[]>, p: string): Record<string, Value[]> => {
      const q = p.split(",")
      const literals = q.slice(1).map((v: string) => {
        const lit = decodeURIComponent(v).split("@")
        return new LiteralWithId(lit[0].replace(/(^")|("$)/g, ""), lit[1], ns.rdfLangString)
      })
      return { ...acc, [q[0]]: literals }
    }, {})
  }

  //debug("copy:",copy,props.copy)

  const [getProp, setProp] = useRecoilState(
    toCopySelector({
      list:
        subject && copy
          ? Object.keys(copy).map((p: string) => ({
              property: p,
              atom: subject.getAtomForProperty(config.prefixMap.uriFromQname(p)),
            }))
          : undefined,
    })
  )

  debug("LIST:", list, atom, props.copy, copy)

  useEffect(() => {
    if (copy) {
      // we have to delay this a bit for value to be propagated to EntityGraph and be exported to ttl when saving
      setTimeout(() => {
        if (copy) {
          const p = []
          for (const k of Object.keys(copy)) {
            p.push({ k, val: copy[k] })
          }
          setProp(p)
        }
      }, 1150) // eslint-disable-line no-magic-numbers
    }

    const newObject = new ExtRDFResourceWithLabel(props.config.prefixMap.uriFromQname(props.objectQname), {}, {}, props.config.prefixMap)
    // DONE: must also give set index in url
    const newList = replaceItemAtIndex(list as [], props.index, newObject)
    setList(newList)
  }, [])

  return <Navigate to={"/edit/" + props.objectQname + "/" + shapeQname} />
}

function EntityEditContainer(props: RDEProps) {
  const config = props.config
  const params = useParams()

  //const [shapeQname, setShapeQname] = useState(props.match.params.shapeQname)
  //const [entityQname, setEntityQname] = useState(props.match.params.entityQname)
  const shapeQname = params.shapeQname || ""
  const entityQname = params.entityQname || ""
  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const [uiLang] = useRecoilState(uiLangState)
  const [edit, setEdit] = useRecoilState(uiEditState)
  const [groupEd, setGroupEd] = useRecoilState(uiGroupState)

  const [undos, setUndos] = useRecoilState(uiUndosState)

  //const [nav, setNav] = useRecoilState(uiNavState)

  const [profileId, setProfileId] = useRecoilState(profileIdState)
  const [tab, setTab] = useRecoilState(uiTabState)

  const entityObj = entities.filter(
    (e) => e.subjectQname === entityQname || e.subjectQname === profileId && entityQname === "tmp:user"
  )
  const icon = config.iconFromEntity(entityObj.length ? entityObj[0] : null)

  const { loadingState, shape } = ShapeFetcher(shapeQname, entityQname, config)

  const canPushPrefLabelGroups: Record<string, canPushPrefLabelGroupType> | undefined = shape?.groups.reduce(
    (
      acc: Record<string, canPushPrefLabelGroupType>,
      group: PropertyGroup
    ): Record<string, canPushPrefLabelGroupType> => {
      const props: Array<RecoilState<Value[]> | undefined> = group.properties
        .filter((p: PropertyShape) => p.allowPushToTopLevelLabel)
        .map((p: PropertyShape) => {
          if (entityObj && entityObj[0] && entityObj[0].subject && p.path)
            return entityObj[0].subject.getAtomForProperty(p.path.sparqlString)
        })
        // removes undefined values
        .filter((a) => a != undefined)
      const subprops: Record<string, { atom: RecoilState<Subject[]>; allowPush: string[] }> = group.properties.reduce(
        (accG, p) => {
          const allowPush: (string | undefined)[] | undefined = p.targetShape?.properties
            .filter((s: PropertyShape) => s.allowPushToTopLevelLabel)
            .map((s: PropertyShape) => s.path?.sparqlString)
          if (allowPush?.length && entityObj && entityObj[0] && entityObj[0].subject && p.path)
            return {
              ...accG,
              [p.qname]: { atom: entityObj[0].subject.getAtomForProperty(p.path.sparqlString), allowPush },
            }
          return accG
        },
        {}
      )
      if (props?.length || Object.keys(subprops).length)
        return { ...acc, [group.qname]: { props, subprops } } as Record<string, canPushPrefLabelGroupType>
      return { ...acc }
    },
    {} as Record<string, canPushPrefLabelGroupType>
  )

  const possiblePrefLabels = useRecoilValue(
    canPushPrefLabelGroups
      ? possiblePrefLabelsSelector({ canPushPrefLabelGroups } as canPushPrefLabelGroupsType)
      : initMapAtom
  )

  let prefLabelAtom = entityObj[0]?.subject?.getAtomForProperty(ns.SKOS("prefLabel").value)
  if (!prefLabelAtom) prefLabelAtom = initListAtom
  const [prefLabels, setPrefLabels] = useRecoilState(prefLabelAtom)

  let altLabelAtom = entityObj[0]?.subject?.getAtomForProperty(ns.SKOS("altLabel").value)
  if (!altLabelAtom) altLabelAtom = initListAtom
  const altLabels = useRecoilValue(altLabelAtom)

  //debug("EntityEditContainer:", JSON.stringify(props), entityQname, isAuthenticated, profileId)

  useEffect(() => {
    entities.map((e, i) => {
      if (e.subjectQname === entityQname || e.subjectQname === profileId && entityQname === "tmp:user") {
        if (tab != i) {
          setTab(i)
          return
        }
      }
    })
  }, [entities, profileId])

  let init = 0
  useEffect(() => {
    if (entityQname === "tmp:user" && !profileId) return

    const delay = 350
    let n = -1 // is this used at all??
    const entityUri = props.config.prefixMap.uriFromQname(entityQname === "tmp:user" ? profileId : entityQname)

    // wait for all data to be loaded then add flag in history
    if (init) clearInterval(init)
    init = window.setInterval(() => {
      if (history[entityUri]) {
        if (history[entityUri].some((h) => h["tmp:allValuesLoaded"])) {
          clearInterval(init)
          //debug("(no init)", entityUri, n, history[entityUri])
        } else if (n === history[entityUri].length) {
          clearInterval(init)
          history[entityUri].push({ "tmp:allValuesLoaded": true })
          //debug("init:", entityUri, n, history[entityUri])
          setUndos({ ...undos, [entityUri]: noUndoRedo })
        } else {
          n = history[entityUri].length
        }
      }
    }, delay)
  }, [entities, tab, profileId, entityQname])

  const [userId, setUserId] = useRecoilState(userIdState)

  const save = useCallback(
    (obj: Entity[]) => {
      return new Promise(async (resolve) => {
        //debug("saving?",obj[0]?.subjectQname,obj[0]?.state,obj[0].alreadySaved)
        if ([EditedEntityState.NeedsSaving, EditedEntityState.Error].includes(obj[0].state)) {
          // save to localStorage
          const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI)
          const store = new rdf.Store()
          props.config.prefixMap.setDefaultPrefixes(store)
          obj[0]?.subject?.graph.addNewValuestoStore(store)
          //debug(store)
          //debugStore(store)
          rdf.serialize(defaultRef, store, undefined, "text/turtle", async function (err, str) {
            if (err || !str) {
              debug(err, store)
              throw "error when serializing"
            }
            const shape = obj[0]?.shapeQname
            config.setUserLocalEntity(
              obj[0].subjectQname,
              shape,
              str,
              false,
              userId,
              obj[0].etag,
              obj[0].state === EditedEntityState.NeedsSaving
            )
            //debug("RESOLVED")
            resolve(true)
          })
        }
      })
    },
    [entityQname, shapeQname, entityObj]
  )

  // trick to get current value when unmounting
  // (see https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect-hook)
  const entityObjRef = useRef<Entity[]>(entityObj)

  useEffect(() => {
    // no luck for now
    if (entityObjRef.current?.length && entityObj?.length) {
      if (entityObjRef.current[0]?.subjectQname != entityObj[0]?.subjectQname) {
        //debug("switched:",entityObjRef.current[0].subjectQname, entityObj[0].subjectQname)
        save(entityObjRef.current)
      }
    }
  })

  useEffect(() => {
    return () => {
      const fun = async () => {
        if (entityObjRef.current) {
          debug("unmounting /edit", entityObjRef.current)
          await save(entityObjRef.current)
        }
      }
      fun()
    }
  }, [])

  const [warning, setWarning] = useState(() => (event: BeforeUnloadEvent) => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  useEffect(() => {
    const willSave: Entity[] = []
    for (const e of entities) {
      if (e.state !== EditedEntityState.Saved && e.state !== EditedEntityState.NotLoaded) {
        willSave.push(e)
        //break // DAMN IT
      }
    }
    //debug("wS:",willSave,entities)
    if (willSave.length) {
      window.removeEventListener("beforeunload", warning, true)
      setWarning(() => async (event: BeforeUnloadEvent) => {
        //debug("unload?",willSave)
        for (const w of willSave) {
          await save([w])
        }
        // Cancel the event as stated by the standard.
        event.preventDefault()
        // Chrome requires returnValue to be set.
        event.returnValue = ""
      })
    } else {
      window.removeEventListener("beforeunload", warning, true)
      setWarning(() => (event: BeforeUnloadEvent) => {}) // eslint-disable-line @typescript-eslint/no-empty-function
    }
  }, [entities])

  useEffect(() => {
    window.addEventListener("beforeunload", warning, true)
  }, [warning])

  //debug("warning:",warning)

  // refactoring needed
  //if (entityQname === "tmp:user" && !auth0.isAuthenticated && userId != demoUserId) return <span>unauthorized</span>

  // TODO: update highlighted tab

  const { entityLoadingState, entity } = EntityFetcher(entityQname, shapeQname, config)

  // TODO: check that shape can be properly applied to entity

  if (loadingState.status === "error" || entityLoadingState.status === "error") {
    return (
      <p className="text-center text-muted">
        <NotFoundIcon className="icon mr-2" />
        {loadingState.error}

        {entityLoadingState.error}
      </p>
    )
  }

  if (loadingState.status === "fetching" || entityLoadingState.status === "fetching" || !entity || entity.isEmpty()) {
    return (
      <>
        <div>
          <div>
            <>{i18n.t("types.loading")}</>
          </div>
        </div>
      </>
    )
  }

  if (!shape || !entity)
    return (
      <>
        <div>
          <div>
            <>{i18n.t("types.loading")}</>
          </div>
        </div>
      </>
    )

  //debug("entity:", entity, shape)

  const shapeLabel = lang.ValueByLangToStrPrefLang(shape.targetClassPrefLabels, uiLang)

  const checkPushNameAsPrefLabel = (e: React.MouseEvent, currentGroupName: string) => {
    //debug("closing: ", currentGroupName, possiblePrefLabels[currentGroupName])
    if (possiblePrefLabels && possiblePrefLabels[currentGroupName]?.length) {
      //debug("names:",personNamesLabels,prefLabels)
      const newLabels = [...prefLabels]
      for (const n of possiblePrefLabels[currentGroupName]) {
        if (
          n instanceof LiteralWithId &&
          !newLabels.some((l) => l instanceof LiteralWithId && sameLanguage(l.language, n.language)) &&
          !altLabels.some((l) => l instanceof LiteralWithId && sameLanguage(l.language, n.language))
        )
          newLabels.push(n)
      }
      if (newLabels.length != prefLabels.length) setPrefLabels(newLabels)
    }
    setEdit("")
    setGroupEd("")
    e.stopPropagation()
  }

  //debug("eO:",entityObj)

  // refactoring needed
  // const BUDAlink = config.LIBRARY_URL + "/show/" + entity.qname + "?v=" + entityObj[0]?.alreadySaved

  const previewLink = config.getPreviewLink(entity.node)

  return (
    <React.Fragment>
      <div role="main" className="pt-4" style={{ textAlign: "center" }}>
        <div className={"header " + icon?.toLowerCase()} {...(!icon ? { "data-shape": shape.qname } : {})}>
          <div className="shape-icon"></div>
          <div>
            <h1>{shapeLabel}</h1>
            <span>{entity.qname}</span>
            {previewLink && (
              <div className="buda-link">
                <a
                  className={"btn-rouge" + (!entityObj[0]?.etag ? " disabled" : "")}
                  target="_blank"
                  rel="noreferrer"
                  {...(!entityObj[0]?.etag ? { title: i18n.t("error.preview") } : { href: previewLink })}
                >
                  <>{i18n.t("general.preview")}</>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div role="navigation" className="innerNav">
        <p className="text-uppercase small my-2">
          <>{i18n.t("home.nav")}</>
        </p>
        {shape.groups.map((group, index) => {
          const label = lang.ValueByLangToStrPrefLang(group.prefLabels, uiLang)
          return (
            <Link
              key={group.qname}
              to={"#" + group.qname}
              // eslint-disable-next-line no-magic-numbers
              onClick={() => {
                setGroupEd(group.qname)
                setEdit(group.qname)
              }}
              className={groupEd === group.qname ? "on" : ""}
            >
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
      <div>
        {shape.groups.map((group, index) => (
          <>
            {groupEd === group.qname && (
              <div
                className="group-edit-BG"
                onClick={(e: React.MouseEvent) => checkPushNameAsPrefLabel(e, group.qname)}
              ></div>
            )}
            <PropertyGroupContainer
              key={group.uri}
              group={group}
              subject={entity}
              onGroupOpen={checkPushNameAsPrefLabel}
              shape={shape}
              config={config}
            />
          </>
        ))}
      </div>
    </React.Fragment>
  )
}

export default EntityEditContainer
