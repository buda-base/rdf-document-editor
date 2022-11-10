/* eslint-disable no-extra-parens */
import React, { FC, ChangeEvent } from "react"
import { RDFResource, history as undoHistory } from "../helpers/rdf/types"
import { useRecoilState, selectorFamily } from "recoil"
import { Link, useNavigate } from "react-router-dom"
import {
  uiDisabledTabsState,
  uiLangState,
  uiLitLangState,
  uiTabState,
  savePopupState,
  Entity, EditedEntityState, entitiesAtom, defaultEntityLabelAtom
} from "../atoms/common"
import { Tab } from "@mui/material"
import * as lang from "../helpers/lang"
import RDEConfig from "../helpers/rde_config"
import { Close as CloseIcon } from "@mui/icons-material"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:entity:selector")

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export const EntityInEntitySelectorContainer: FC<{ entity: Entity; index: number; config: RDEConfig }> = ({
  entity,
  index,
  config,
}) => {
  const [uiLitLang] = useRecoilState(uiLitLangState)
  const [labelValues] = useRecoilState(!entity.preloadedLabel ? entity.subjectLabelState : defaultEntityLabelAtom)
  const [tab, setTab] = useRecoilState(uiTabState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState)
  const [popupOn, setPopupOn] = useRecoilState(savePopupState)

  const navigate = useNavigate()

  const prefLabels = labelValues ? RDFResource.valuesByLang(labelValues) : null
  const label = !entity.preloadedLabel ? lang.ValueByLangToStrPrefLang(prefLabels, uiLitLang) : entity.preloadedLabel
  const icon = config.iconFromEntity(entity)
  const shapeQname = entity.shapeQname
    ? entity.shapeQname
    : entities[index] && entities[index].shapeQname
    ? entities[index].shapeQname
    : null

  //debug("sQn:", icon) //, index, tab, shapeQname, entity.shapeRef?.qname, entity.shapeRef, entity.subjectQname)

  const link = "/edit/" + entity.subjectQname + (shapeQname ? "/" + shapeQname : "")

  const allLoaded = entities.reduce((acc, e) => acc && e.state !== EditedEntityState.Loading, true)

  const handleClick = (event: ChangeEvent<unknown>, newTab: number): void => {
    if (newTab !== tab) {
      setDisabled(true)
      setTab(newTab)
      setPopupOn(false)
    }
  }

  const closeEntity = async (ev: React.MouseEvent) => {
    ev.persist()
    if (entity.state === EditedEntityState.NeedsSaving || entity.state === EditedEntityState.Error) {
      const go = window.confirm("unsaved data will be lost")
      if (!go) return
    }
    // update user session
    config.setUserMenuState(
      entity.subjectQname,
      shapeQname,
      !entity.preloadedLabel ? (label && entity.subject?.lname ? entity.subject?.lname : label) : entity.preloadedLabel,
      true,
      null
    )
    // remove data in local storage
    await config.setUserLocalEntity(entity.subjectQname, shapeQname, "", true, entity.etag, false)
    // remove history for entity
    if (undoHistory) {
      const uri = config.prefixMap.uriFromQname(entity.subjectQname)
      if (undoHistory[uri]) delete undoHistory[uri]
    }

    // prevent click event
    ev.preventDefault()
    ev.stopPropagation()

    const newList = [...entities.filter((e, i) => i !== index)]
    setEntities(newList)

    // if closing self, go back to home page
    if (index === tab) {
      setTab(-1)
      navigate("/")
    } else if (tab <= newList.length && tab !== -1) {
      // keep current tab open
      const newIndex = newList.findIndex((e) => e.subjectQname === entities[index].subjectQname)
      setTab(newIndex)
    } else {
      // case of closing from /new route
      setTab(-1)
    }
    return false
  }

  //debug("entity?", entity.alreadySaved, entity, tab, entities[tab], entities.map(e => e.subjectQname+":"+e.alreadySaved))

  // update user session
  config.setUserMenuState(
    entity.subjectQname,
    shapeQname,
    !entity.preloadedLabel ? (entity.subject?.lname ? entity.subject?.lname : label) : entity.preloadedLabel,
    false,
    entity.etag
  )

  return (
    <>
      <Tab
        key={entity.subjectQname}
        {...a11yProps(index)}
        className={index === tab ? "Mui-selected" : ""}
        onClick={(e) => handleClick(e, index)}
        {...(disabled ? { disabled: true } : {})}
        label={
          <>
            <Link to={link}>
              {icon && (
                <img
                  className="entity-type"
                  src={icon}
                />
              )}
              <span style={{ marginLeft: 30, marginRight: "auto", textAlign: "left" }}>
                <span>{label && label != "..." ? label : entity.subject?.lname ? entity.subject.lname : label}</span>
                <br />
                <span className="RID">{entity.subjectQname}</span>
              </span>
            </Link>
            <span className={"state state-" + entity.state}></span>
            <CloseIcon className="close-facet-btn" onClick={closeEntity} />
          </>
        }
      />
    </>
  )
}

export default EntityInEntitySelectorContainer
