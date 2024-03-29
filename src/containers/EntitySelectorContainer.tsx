/* eslint-disable no-extra-parens */
import React, { useEffect, ChangeEvent, useTransition } from "react"
import { history as undoHistory } from "../helpers/rdf/types"
import { Close as CloseIcon } from "@mui/icons-material"
import i18n from "i18next"
import { useRecoilState } from "recoil"
import { RDEProps } from "../helpers/editor_props"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  uiLangState,
  uiTabState,
  uiEditState,
  sessionLoadedState,
  uiGroupState,
  uiDisabledTabsState,
  entitiesAtom,
  defaultEntityLabelAtom,
  EditedEntityState,
  Entity,
} from "../atoms/common"
import { Tabs, Tab } from "@mui/material"
import * as lang from "../helpers/lang"
import * as ns from "../helpers/rdf/ns"
import { EntityInEntitySelectorContainer } from "./EntityInEntitySelectorContainer"
import { debug as debugfactory } from "debug"
import { useTranslation } from "react-i18next"

const debug = debugfactory("rde:entity:selector")

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export function EntitySelector(props: RDEProps) {
  const config = props.config
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [sessionLoaded, setSessionLoaded] = useRecoilState(sessionLoadedState)
  const [uiLang] = useRecoilState(uiLangState)
  const [tab, setTab] = useRecoilState(uiTabState)
  const handleChange = (event: ChangeEvent<unknown>, newTab: number): void => {
    //debug("newTab:", newTab)
    setTab(newTab)
  }
  const [edit, setEdit] = useRecoilState(uiEditState)
  const [groupEd, setGroupEd] = useRecoilState(uiGroupState)
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState)

  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  // restore user session on startup
  useEffect(() => {
    const session = config.getUserMenuState()
    session.then((entities) => {
      //debug("session:", obj, props, props.location)
      if (!entities) return
      const newEntities: Entity[] = []
      for (const k of Object.keys(entities)) {
        newEntities.push({
          subjectQname: k,
          subject: null,
          shapeQname: entities[k].shapeQname,
          subjectLabelState: defaultEntityLabelAtom,
          state: EditedEntityState.NotLoaded,
          preloadedLabel: entities[k].preloadedLabel,
          etag: entities[k].etag,
          loadedUnsavedFromLocalStorage: true,
        })
      }
      if (newEntities.length) {
        setEntities(newEntities)
      }
      if (!sessionLoaded) setSessionLoaded(true)
      if (location?.pathname == "/new") setTab(newEntities.length)
      if (location?.pathname.startsWith("/edit/")) {
        const id = location.pathname.split("/")[2] // eslint-disable-line no-magic-numbers
        let found = false
        newEntities.map((e, i) => {
          if (e.subjectQname === id) {
            found = true
            setTab(i)
          }
        })
        // case of opening an entity not in session yet
        if (!found) setTab(newEntities.length)
      }
    })
  }, [])

  const closeEntities = async (ev: React.MouseEvent) => {
    let warn = false
    for (const entity of entities) {
      if (entity.state === EditedEntityState.NeedsSaving || entity.state === EditedEntityState.Error) {
        warn = true
        break
      }
    }
    if (warn) {
      const go = window.confirm("unsaved data will be lost")
      if (!go) return
    }
    for (const entity of entities) {
      const shapeQname = entity.shapeQname

      // update user session
      await config.setUserMenuState(entity.subjectQname, shapeQname, "", true, null)

      // remove data in local storage
      await config.setUserLocalEntity(entity.subjectQname, shapeQname, "", true, entity.etag, false)

      // remove history for entity
      if (undoHistory) {
        const uri = config.prefixMap.uriFromQname(entity.subjectQname)
        if (undoHistory[uri]) delete undoHistory[uri]
      }
    }

    setEntities([])
    setTab(-1)
    navigate("/")

    return false
  }

  return (
    <div
      className="tabs-select"
      onClick={() => {
        setEdit("")
        setGroupEd("")
      }}
    >
      <h3>Edition</h3>
      <h4>
        Open entities
        <span title={t("general.close") as string}>
          <CloseIcon className="close-facet-btn" onClick={closeEntities} />
        </span>
      </h4>
      <Tabs value={tab === -1 ? false : tab} onChange={handleChange} aria-label="entities">
        {entities.map((entity: Entity, index) => {
          return <EntityInEntitySelectorContainer entity={entity} index={index} key={index} config={config} />
        })}
        <Tab
          key="new"
          {...a11yProps(entities.length)}
          id="new-load"
          label={
            <Link to="/new" className="btn-rouge" onClick={() => setDisabled(false)}>
              NEW / LOAD
            </Link>
          }
        />
      </Tabs>
    </div>
  )
}

export default EntitySelector
