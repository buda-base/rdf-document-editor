import React, { useState, useEffect, useMemo, useLayoutEffect, useCallback, useRef } from "react"
import { ShapeFetcher, EntityFetcher, setUserLocalEntities, debugStore } from "../helpers/rdf/io"
import { setDefaultPrefixes } from "../helpers/rdf/ns"
import { RDFResource, Subject, ExtRDFResourceWithLabel, history, LiteralWithId } from "../helpers/rdf/types"
import * as shapes from "../helpers/rdf/shapes"
import NotFoundIcon from "@material-ui/icons/BrokenImage"
import i18n from "i18next"
import { entitiesAtom, EditedEntityState, Entity } from "./EntitySelectorContainer"
import { getIcon } from "./EntityInEntitySelectorContainer"
import PropertyGroupContainer from "./PropertyGroupContainer"
import {
  reloadEntityState,
  profileIdState,
  userIdState,
  uiLangState,
  uiEditState,
  uiUndosState,
  noUndoRedo,
  uiTabState,
  uiNavState,
  uiGroupState,
  personNamesLabelsSelector,
  possiblePrefLabelsSelector,
  initListAtom,
  initMapAtom,
  toCopySelector,
} from "../atoms/common"
import * as lang from "../helpers/lang"
import { atom, useRecoilState, useRecoilSnapshot, useRecoilValue } from "recoil"
import { AppProps, IdTypeParams } from "../containers/AppContainer"
import * as rdf from "rdflib"
import qs from "query-string"
import * as ns from "../helpers/rdf/ns"
import { Redirect } from "react-router-dom"
import { replaceItemAtIndex } from "../helpers/atoms"
import { HashLink as Link } from "react-router-hash-link"
import { useAuth0 } from "@auth0/auth0-react"
import queryString from "query-string"
import { getParentPath } from "../../helpers/observer"
import Button from "@material-ui/core/Button"
import { demoUserId } from "../../../containers/DemoContainer"

import config from "../../../config"

const debug = require("debug")("rde:entity:edit")

export function EntityEditContainerMayUpdate(props: AppProps) {
  const shapeQname = props.match.params.shapeQname
  const entityQname = props.match.params.entityQname
  const subjectQname = props.match.params.subjectQname
  const propertyQname = props.match.params.propertyQname
  const index = props.match.params.index
  const subnodeQname = props.match.params.subnodeQname

  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const snapshot = useRecoilSnapshot()
  const [subject, setSubject] = useState(false)

  const { copy } = queryString.parse(props.location.search, { decode: false })

  useEffect(() => {
    const i = entities.findIndex((e) => e.subjectQname === subjectQname)
    let subj
    if (i === -1) return
    if (subnodeQname) {
      const pp = getParentPath(ns.uriFromQname(subjectQname), ns.uriFromQname(subnodeQname))
      //debug("gPP:", pp)
      if (pp.length > 1 && i >= 0) {
        const atom = entities[i].subject.getAtomForProperty(pp[1])
        subj = snapshot.getLoadable(atom).contents
        if (Array.isArray(subj)) {
          subj = subj.filter((s) => s.qname === subnodeQname)
          if (subj.length) subj = subj[0]
          else throw new Error("subnode not found", subnode)
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
  else if (subject != false) return <Redirect to={"/edit/" + entityQname + "/" + shapeQname} />
  else return <div></div>
}

interface AppPropsDoUpdate extends AppProps {
  subject: Subject
  propertyQname: string
  objectQname: string
  index: number
}

function EntityEditContainerDoUpdate(props: AppPropsDoUpdate) {
  const shapeQname = props.match.params.shapeQname
  const atom = props.subject.getAtomForProperty(ns.uriFromQname(props.propertyQname))
  const [list, setList] = useRecoilState(atom)

  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const i = entities.findIndex((e) => e.subjectQname === props.objectQname)
  const subject = entities[i]?.subject

  const copy = props.copy?.split(";").reduce((acc, p) => {
    const q = p.split(",")
    return {
      ...acc,
      [q[0]]: q.slice(1).map((v) => {
        const lit = decodeURIComponent(v).split("@")
        return new LiteralWithId(lit[0].replace(/(^")|("$)/g, ""), lit[1], ns.RDF("langString").value)
      }),
    }
  }, {})

  //debug("copy:",copy,props.copy)

  const [getProp, setProp] = useRecoilState(
    subject && copy && Object.keys(copy).length
      ? //? subject.getAtomForProperty(ns.SKOS("prefLabel").value)
        toCopySelector({
          list: Object.keys(copy).map((p) => ({
            property: p,
            atom: subject.getAtomForProperty(ns.uriFromQname(p)),
          })),
        })
      : initListAtom
  )

  debug("LIST:", list, atom, props.copy, copy, props.prefLabel)

  useEffect(() => {
    if (copy) {
      // we have to delay this a bit for value to be propagated to EntityGraph and be exported to ttl when saving
      setTimeout(() => {
        for (const k of Object.keys(copy)) {
          setProp({ k, val: copy[k] })
        }
      }, 1150) // eslint-disable-line no-magic-numbers
    }

    const newObject = new ExtRDFResourceWithLabel(ns.uriFromQname(props.objectQname), {}, {})
    // DONE: must also give set index in url
    const newList = replaceItemAtIndex(list, props.index, newObject)
    setList(newList)
  }, [])

  return <Redirect to={"/edit/" + props.objectQname + "/" + shapeQname} />
}

function EntityEditContainer(props: AppProps) {
  //const [shapeQname, setShapeQname] = useState(props.match.params.shapeQname)
  //const [entityQname, setEntityQname] = useState(props.match.params.entityQname)
  const shapeQname = props.shapeQname ?? props.match.params.shapeQname
  const entityQname = props.entityQname ?? props.match.params.entityQname
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const auth0 = useAuth0()

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
  const icon = getIcon(entityObj.length ? entityObj[0] : null)

  const { loadingState, shape } = ShapeFetcher(shapeQname, entityQname)

  const canPushPrefLabelGroups = shape?.groups.reduce((acc, group) => {
    const props = group.properties
      .filter((p) => p.allowPushToTopLevelSkosPrefLabel)
      .map((p) => entityObj[0]?.subject?.getAtomForProperty(p.path.sparqlString))
      .filter((a) => a)
    const subprops = group.properties.reduce((accG, p) => {
      const allowPush = p.targetShape?.properties
        .filter((s) => s.allowPushToTopLevelSkosPrefLabel)
        .map((s) => s.path.sparqlString)
      if (allowPush?.length)
        return {
          ...accG,
          [p.qname]: { atom: entityObj[0]?.subject?.getAtomForProperty(p.path.sparqlString), allowPush },
        }
      return accG
    }, {})
    if (props?.length || Object.keys(subprops).length) return { ...acc, [group.qname]: { props, subprops } }
    return { ...acc }
  }, {})

  const possiblePrefLabels = useRecoilValue(possiblePrefLabelsSelector({ canPushPrefLabelGroups }))

  const personNamesLabels = useRecoilValue(
    personNamesLabelsSelector({
      atom: entityObj[0]?.subject?.getAtomForProperty(ns.BDO("personName").value),
    })
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
    const entityUri = ns.uriFromQname(entityQname === "tmp:user" ? profileId : entityQname)

    // wait for all data to be loaded then add flag in history
    if (init) clearInterval(init)
    init = setInterval(() => {
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
    (obj) => {
      return new Promise(async (resolve) => {
        //debug("saving?",obj[0]?.subjectQname,obj[0]?.state,obj[0].alreadySaved)
        if ([EditedEntityState.NeedsSaving, EditedEntityState.Error].includes(obj[0]?.state)) {
          //debug("yes")
          // save to localStorage
          const defaultRef = new rdf.NamedNode(rdf.Store.defaultGraphURI)
          const store = new rdf.Store()
          ns.setDefaultPrefixes(store)
          obj[0]?.subject?.graph.addNewValuestoStore(store)
          debug(store)
          debugStore(store)
          rdf.serialize(defaultRef, store, undefined, "text/turtle", async function (err, str) {
            if (err) {
              debug(err, store)
              throw "error when serializing"
            }
            let shape = obj[0]?.shapeRef
            if (shape?.qname) shape = shape.qname
            setUserLocalEntities(
              auth0,
              obj[0]?.subject?.qname,
              shape,
              str,
              false,
              userId,
              obj[0].alreadySaved,
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
  const entityObjRef = useRef(null)

  useEffect(() => {
    // no luck for now
    if (entityObjRef.current?.length && entityObj?.length) {
      if (entityObjRef.current[0]?.subjectQname != entityObj[0]?.subjectQname) {
        //debug("switched:",entityObjRef.current[0].subjectQname, entityObj[0].subjectQname)
        save(entityObjRef.current)
      }
    }
    entityObjRef.current = entityObj
  })

  useEffect(() => {
    return async () => {
      debug("unmounting /edit", entityObjRef.current[0]?.state)
      await save(entityObjRef.current)
    }
  }, [])

  const [warning, setWarning] = useState(() => (event) => {}) // eslint-disable-line @typescript-eslint/no-empty-function
  useEffect(() => {
    const willSave = []
    for (const e of entities) {
      if (e.state !== EditedEntityState.Saved && e.state !== EditedEntityState.NotLoaded) {
        willSave.push(e)
        //break // DAMN IT
      }
    }
    //debug("wS:",willSave,entities)
    if (willSave.length) {
      window.removeEventListener("beforeunload", warning, true)
      setWarning(() => async (event) => {
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
      setWarning(() => (event) => {}) // eslint-disable-line @typescript-eslint/no-empty-function
    }
  }, [entities])

  useEffect(() => {
    window.addEventListener("beforeunload", warning, true)
  }, [warning])

  //debug("warning:",warning)

  if (entityQname === "tmp:user" && !auth0.isAuthenticated && userId != demoUserId) return <span>unauthorized</span>

  // useEffect(() => {
  //   debug("params", props.match.params.entityQname)
  //   if (props.match.params.entityQname) setEntityQname(props.match.params.entsityQname)
  //   if (props.match.params.shapeQname) setShapeQname(props.match.params.shapeQname)
  // }, [props.match.params])

  if (!(shapeQname in shapes.shapeRefsMap)) return <span>invalid shape!</span>

  // TODO: update highlighted tab

  // eslint-disable-next-line prefer-const
  let { entityLoadingState, entity } = EntityFetcher(entityQname, shapes.shapeRefsMap[shapeQname])

  // TODO: check that shape can be properly applied to entuty

  if (loadingState.status === "error" || entityLoadingState.status === "error") {
    return (
      <p className="text-center text-muted">
        <NotFoundIcon className="icon mr-2" />
        {loadingState.error}

        {entityLoadingState.error}
      </p>
    )
  }

  if (loadingState.status === "fetching" || entityLoadingState.status === "fetching" || entity.isEmpty()) {
    return (
      <div>
        <div>{i18n.t("types.loading")}</div>
      </div>
    )
  }

  if (!shape || !entity)
    return (
      <div>
        <div>{i18n.t("types.loading")}</div>
      </div>
    )

  //debug("entity:", entity, shape)

  /* // no need for updateEntitiesRDF

  // DONE: add new entity as object for property where it was created
  const urlParams = qs.parse(props.history.location.search)
  const index = entities.findIndex((e) => e.subjectQname === urlParams.subject)
  // DONE: ok if subject for property is a new one
  if (index >= 0 && entities[index].subject) {
    const subject = entities[index].subject
    if (subject) {
      const rdf = "<" + subject.uri + "> <" + urlParams.propid + "> <" + ns.uriFromQname(entity.qname) + "> ."
      // DONE: fix deleted property reappearing
      updateEntitiesRDF(subject, subject.extendWithTTL, rdf, entities, setEntities)
      props.history.replace(props.history.location.pathname)
    }
  }
  */

  const shapeLabel = lang.ValueByLangToStrPrefLang(shape.targetClassPrefLabels, uiLang)
  //const entityLabel = lang.ValueByLangToStrPrefLang(entity.prefLabels, uiLang)

  const checkPushNameAsPrefLabel = (e, currentGroupName) => {
    //debug("closing: ", currentGroupName, possiblePrefLabels[currentGroupName])
    const isBo = (l) => ["bo", "bo-x-ewts"].includes(l)
    if (possiblePrefLabels[currentGroupName]?.length) {
      //debug("names:",personNamesLabels,prefLabels)
      const newLabels = [...prefLabels]
      for (const n of possiblePrefLabels[currentGroupName]) {
        if (
          !newLabels.some((l) => l.language === n.language || isBo(l.language) && isBo(n.language)) &&
          !altLabels.some((l) => l.language === n.language || isBo(l.language) && isBo(n.language))
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

  const BUDAlink = config.LIBRARY_URL + "/show/" + entity.qname + "?v=" + entityObj[0]?.alreadySaved

  return (
    <React.Fragment>
      <div role="main" className="pt-4" style={{ textAlign: "center" }}>
        <div className={"header " + icon?.toLowerCase()} {...(!icon ? { "data-shape": shape.qname } : {})}>
          <div className="shape-icon"></div>
          <div>
            <h1>{shapeLabel}</h1>
            <span>{entity.qname}</span>
            {entityQname !== "tmp:user" && shape.qname != "bds:UserProfileShape" && (
              <div className="buda-link">
                <a
                  className={"btn-rouge" + (!entityObj[0]?.alreadySaved ? " disabled" : "")}
                  target="_blank"
                  rel="noreferrer"
                  {...(!entityObj[0]?.alreadySaved ? { title: i18n.t("error.preview") } : { href: BUDAlink })}
                >
                  {i18n.t("general.preview")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div role="navigation" className="innerNav">
        <p className="text-uppercase small my-2">{i18n.t("home.nav")}</p>
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
              <div className="group-edit-BG" onClick={(e) => checkPushNameAsPrefLabel(e, group.qname)}></div>
            )}
            <PropertyGroupContainer
              key={group.uri}
              group={group}
              subject={entity}
              onGroupOpen={checkPushNameAsPrefLabel}
              shape={shape}
            />
          </>
        ))}
      </div>
    </React.Fragment>
  )
}

export default EntityEditContainer
