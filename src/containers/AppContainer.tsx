import React, { useEffect, useRef, useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import i18n from "i18next"
import { useTranslation, initReactI18next } from "react-i18next"
import { useRecoilState } from "recoil"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import { ClearCacheProvider } from "react-clear-cache"

import config from "../config"

import { AuthRequest } from "../routes/account/components/AuthRequest"
import { NavBarContainer, BottomBarContainer } from "../components/NavBar"
import EntitySelector, {
  entitiesAtom,
  EditedEntityState,
  defaultEntityLabelAtom,
} from "../containers/EntitySelectorContainer"
import DemoContainer from "../containers/DemoContainer"
import OutlineEditorContainer from "../containers/OutlineEditorContainer"
import WithdrawingEditorContainer from "../containers/WithdrawingEditorContainer"
import ScanRequestContainer from "../containers/ScanRequestContainer"
import Home from "../routes/home"
import ProfileContainer from "../routes/account/containers/Profile"
import EntityEditContainer, { EntityEditContainerMayUpdate } from "../routes/entity/containers/EntityEditContainer"
import NewEntityContainer from "../routes/entity/containers/NewEntityContainer"
import EntityCreationContainer, {
  EntityCreationContainerRoute,
} from "../routes/entity/containers/EntityCreationContainer"
import EntityShapeChooserContainer from "../routes/entity/containers/EntityShapeChooserContainer"
import {
  uiDisabledTabsState,
  profileIdState,
  uiTabState,
  uiUndosState,
  noUndo,
  noUndoRedo,
  undoState,
  sameUndo,
  userIdState,
  demoAtom,
} from "../atoms/common"

import { Subject, history } from "../helpers/rdf/types"

import enTranslations from "../translations/en"

//import axios from "axios"
//import PreviewImage from "../libs/bvmt/src/components/PreviewImage"
import { default as BVMT } from "../libs/bvmt/src/App"

import { demoUserId } from "./DemoContainer"

const debug = require("debug")("rde:router")

const numtobodic: Record<string, string> = {
  "0": "༠",
  "1": "༡",
  "2": "༢",
  "3": "༣",
  "4": "༤",
  "5": "༥",
  "6": "༦",
  "7": "༧",
  "8": "༨",
  "9": "༩",
}

const numtobo = function (cstr: string): string {
  let res = ""
  for (const ch of cstr) {
    if (numtobodic[ch]) res += numtobodic[ch]
    else res += ch
  }
  return res
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format: function (value, format, lng) {
        if (format === "counttobo") {
          return numtobo("" + value)
        } else if (format === "counttozh" && value) {
          return value.toLocaleString("zh-u-nu-hanidec")
        } else if (format === "lowercase") return value.toLowerCase()
        else if (format === "uppercase") return value.toUpperCase()
        return value
      },
    },
  })

export interface IdTypeParams {
  shapeQname: string
  entityQname: string
  subjectQname?: string
  propertyQname?: string
  index?: string
}

export interface AppProps extends RouteComponentProps<IdTypeParams> {}

// get info from history (values modified? values undone?)
export const getHistoryStatus = (entityUri) => {
  if (!history[entityUri]) return {}

  // DONE: optimizing a bit (1 for instead of 2 .findIndex + 1 .some)
  const top = history[entityUri].length - 1
  let first = -1,
    current = -1
  for (const i in history[entityUri]) {
    const h = history[entityUri][i]
    if (h["tmp:allValuesLoaded"]) first = i
    else if (h["tmp:undone"]) current = i - 1
    if (first != -1 && current != -1) break
  }
  return { top, first, current }
}

function HomeContainer() {
  // uncommenting this triggers "Can't perform a React state update on an unmounted component" error (see #11)
  // const [tab, setTab] = useRecoilState(uiTabState)

  /* // PoC bvmt
  const [iiif, setiiif] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          "https://iiif.bdrc.io/bdr:I4CZ75258::I4CZ752580003.jpg/info.json"
          //`https://iiif.bdrc.io/${props.volumeId}::${image.filename}/info.json`,
        )
        const iiif = data.data
        setiiif(iiif)
      } catch (err) {
        debug("iiifErr", err)
      }
    }
    getData()
  }, [])

  debug("iiif:", iiif)

  if (!iiif) {
    return <div>loading</div>
  } else {
    */

  const [userId, setUserId] = useRecoilState(userIdState)

  if (userId === demoUserId)
    return (
      <div className="centered-ctn">
        <div>
          <h1>Welcome to RDF Document Editor demo!</h1>
          <span>{i18n.t("home.title")}</span>
          <p>
            You can click the <em>New / Load</em> button on the left, or the link to an example entity below.
          </p>
          {/* <PreviewImage i={0 as never} iiif={iiif as never} /> */}
          <p className="menu">
            <Link className="menu-link" to="/edit/bdr:P1583">
              <img src="/icons/person.svg" style={{ height: "31px", marginRight: "15px", marginLeft: "7px" }} />
              Open example entity
            </Link>
          </p>
        </div>
      </div>
    )
  else
    return (
      <div className="centered-ctn">
        <div>
          <h1>Welcome to RDF Document Editor!</h1>
          <span>{i18n.t("home.title")}</span>
          <p>
            To start the editor, you must first set up the RID prefix in your user profile (ex: <em>3KG</em>), and then
            click on the <em>New / Load</em> button.
          </p>
          {/* <PreviewImage i={0 as never} iiif={iiif as never} /> */}
          <p className="menu">
            <Link className="menu-link" to="/edit/bdr:P1583">
              <img src="/icons/person.svg" style={{ height: "31px", marginRight: "15px", marginLeft: "7px" }} />
              Open example entity
            </Link>
          </p>
        </div>
      </div>
    )
  //}
}

let undoTimer = 0,
  undoEntity = "tmp:uri"

function App(props: AppProps) {
  const auth = useAuth0()
  const { isAuthenticated, isLoading } = auth
  const [undos, setUndos] = useRecoilState(uiUndosState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [uiTab, setTab] = useRecoilState(uiTabState)
  const entity = entities.findIndex((e, i) => i === uiTab)
  const entityUri = entities[entity]?.subject?.uri || "tmp:uri"
  const [profileId, setProfileId] = useRecoilState(profileIdState)
  const undo = undos[entityUri]
  const setUndo = (s: Record<string, undoState>) => setUndos({ ...undos, [entityUri]: s })
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState)
  const appEl = useRef<HTMLDivElement>(null)
  // see https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1 for the wrapping anonymous function
  const routerHistory = useHistory()
  const [userId, setUserId] = useRecoilState(userIdState)
  const [demo, setDemo] = useRecoilState(demoAtom)

  // DONE: update undo buttons status after selecting entity in iframe
  useEffect(() => {
    const updateUndoOnMsg = (ev: MessageEvent) => {
      appEl?.current?.click()
    }
    window.addEventListener("message", updateUndoOnMsg)

    if (config.DEMO_MODE) setDemo(true)

    return () => {
      if (undoTimer) clearInterval(undoTimer)
      window.removeEventListener("message", updateUndoOnMsg)
    }
  }, [])

  //debug("entities:",entities.map(e => e?.subjectQname+","+e?.subject?.qname+"="+e?.state))

  /*
  useEffect( () => {
    debug("undos!",undo,undos)
  }, [undos])
  */

  // this is needed to initialize undo/redo without any button being clicked
  // (link between recoil/react states and data updates automatically stored in EntityGraphValues)
  useEffect(() => {
    //if (undoTimer === 0 || entityUri !== undoEntity) {
    //debug("clear:",entities[entity]?.subject,undoTimer, entity, entityUri,entities)
    undoEntity = entityUri
    clearInterval(undoTimer)
    const delay = 150
    undoTimer = setInterval(() => {
      //debug("timer", undoTimer, entity, entityUri, profileId, history[entityUri], history)
      if (!history[entityUri]) return
      const { top, first, current } = getHistoryStatus(entityUri)
      //debug("disable:",disabled,first)
      if (first === -1) return
      if (disabled) setDisabled(false)
      // check if flag is on top => nothing modified
      if (history[entityUri][history[entityUri].length - 1]["tmp:allValuesLoaded"]) {
        if (!sameUndo(undo, noUndoRedo)) {
          //debug("no undo:",undo)
          setUndo(noUndoRedo)
        }
      } else {
        if (first !== -1) {
          if (current < 0 && first < top) {
            const histo = history[entityUri][top]
            if (history[entityUri][top][entityUri]) {
              // we can undo a modification of simple property value
              const prop = Object.keys(history[entityUri][top][entityUri])
              if (prop && prop.length && entities[entity].subject !== null) {
                const newUndo = {
                  prev: { enabled: true, subjectUri: entityUri, propertyPath: prop[0], parentPath: [] },
                  next: noUndo,
                }
                if (!sameUndo(undo, newUndo)) {
                  //debug("has undo1:", undo, newUndo, first, top, history, current, entities[entity])
                  setUndo(newUndo)
                }
              }
            } else {
              // TODO: enable undo when change in subnode
              const parentPath = history[entityUri][top]["tmp:parentPath"]
              if (parentPath && parentPath[0] === entityUri) {
                const sub = Object.keys(history[entityUri][top]).filter(
                  (k) => !["tmp:parentPath", "tmp:undone"].includes(k)
                )
                if (sub && sub.length) {
                  // we can undo a modification of simple value of subproperty of a property
                  const prop = Object.keys(history[entityUri][top][sub[0]])
                  if (prop && prop.length && entities[entity].subject !== null) {
                    const newUndo = {
                      next: noUndo,
                      prev: { enabled: true, subjectUri: sub[0], propertyPath: prop[0], parentPath },
                    }
                    if (!sameUndo(undo, newUndo)) {
                      //debug("has undo2:", undo, newUndo, first, top, history, current, entities[entity])
                      setUndo(newUndo)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, delay)
    //}

    return () => {
      clearInterval(undoTimer)
    }
  }, [disabled, entities, undos, profileId, uiTab])

  if (isLoading) return <div></div>
  if (config.requireAuth && !isAuthenticated && props.location.pathname !== "/demo" && userId != demoUserId)
    return <AuthRequest />

  debug("App:", entities)

  // check if latest version every 5 min
  const checkVersionInterval = 5 * 60 * 1000 // eslint-disable-line no-magic-numbers

  return (
    <ClearCacheProvider duration={checkVersionInterval}>
      <div
        ref={appEl}
        data-route={props.location.pathname}
        /*onClick={updateUndo} onKeyUp={updateUndo}*/ className={
          "App " + (props.location.pathname === "/" ? "home" : "")
        }
      >
        <NavBarContainer />
        <main>
          <div>
            {!props.location.pathname.startsWith("/bvmt") && <EntitySelector {...props} />}
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route
                exact
                path="/profile"
                render={(rprops) => (
                  <EntityEditContainer
                    {...rprops}
                    entityQname={demo ? demoUserId : "tmp:user"}
                    shapeQname="bds:UserProfileShape"
                  />
                )}
              />
              <Route exact path="/new" component={NewEntityContainer} />
              <Route exact path="/new/:shapeQname" component={EntityCreationContainer} />
              <Route // we need that route to link back value to property where entity was created
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityCreationContainerRoute}
              />
              <Route // this one as well
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route
                exact
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityEditContainerMayUpdate}
              />
              <Route
                exact
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityEditContainerMayUpdate}
              />
              <Route exact path="/edit/:entityQname/:shapeQname" component={EntityEditContainer} />
              <Route exact path="/edit/:entityQname" component={EntityShapeChooserContainer} />
              <Route exact path="/demo" component={DemoContainer} />
            </Switch>
          </div>
        </main>
        {!props.location.pathname.startsWith("/new") && <BottomBarContainer />}
      </div>
    </ClearCacheProvider>
  )
}
export default App
