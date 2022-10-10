/* eslint-disable no-extra-parens */
import React, { useState, FC, useEffect, ChangeEvent } from "react"
import { Subject, RDFResourceWithLabel, RDFResource, history as undoHistory } from "../helpers/rdf/types"
//import { setUserSession, setUserLocalEntities } from "../helpers/rdf/io"
import * as shapes from "../helpers/rdf/shapes"
import { FiPower as LogoutIcon } from "react-icons/fi"
import { InputLabel, Select, MenuItem } from "@material-ui/core"
import i18n from "i18next"
import { atom, useRecoilState, useRecoilValue, selectorFamily } from "recoil"
import { useAuth0 } from "@auth0/auth0-react"
import { FormHelperText, FormControl } from "@material-ui/core"
import { AppProps, IdTypeParams } from "./AppContainer"
import { DialogBeforeClose } from "../components/Dialog"
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom"
import {
  uiDisabledTabsState,
  uiLangState,
  uiLitLangState,
  uiTabState,
  userIdState,
  savePopupState,
} from "../atoms/common"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import * as lang from "../helpers/lang"
import * as ns from "../helpers/rdf/ns"
import { Entity, EditedEntityState, entitiesAtom, defaultEntityLabelAtom } from "./EntitySelectorContainer"
import * as rdf from "rdflib"
import { CloseIcon } from "../routes/layout/icons"

const debug = require("debug")("rde:entity:selector")

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export const getIcon = (entity: Entity) => {
  if (!entity) return
  let icon
  if (entity.subject) {
    const rdfType = ns.RDF("type") as rdf.NamedNode
    if (entity?.subject?.graph?.store?.statements)
      for (const s of entity.subject.graph.store.statements) {
        if (s.predicate.value === rdfType.value && s.subject.value === entity.subject.node.value) {
          icon = s.object.value.replace(/.*?[/]([^/]+)$/, "$1") // .toLowerCase()
          if (icon.toLowerCase() === "user") break
        }
      }
  }
  let shapeQname = entity.shapeRef
  if (entity.shapeRef && entity.shapeRef.qname) shapeQname = entity.shapeRef.qname
  if (!icon && shapeQname) {
    // TODO: might be something better than that...
    icon = shapeQname.replace(/^[^:]+:([^:]+?)Shape[^/]*$/, "$1")
  }
  return icon
}

export const EntityInEntitySelectorContainer: FC<{ entity: Entity; index: number }> = ({ entity, index }) => {
  const [uiLang] = useRecoilState(uiLangState)
  const [uiLitLang] = useRecoilState(uiLitLangState)
  const [labelValues] = useRecoilState(!entity.preloadedLabel ? entity.subjectLabelState : defaultEntityLabelAtom)
  const [tab, setTab] = useRecoilState(uiTabState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [disabled, setDisabled] = useRecoilState(uiDisabledTabsState)
  const [userId, setUserId] = useRecoilState(userIdState)
  const [popupOn, setPopupOn] = useRecoilState(savePopupState)

  const history = useHistory()
  const auth0 = useAuth0()

  const prefLabels = labelValues ? RDFResource.valuesByLang(labelValues) : ""
  const label = !entity.preloadedLabel ? lang.ValueByLangToStrPrefLang(prefLabels, uiLitLang) : entity.preloadedLabel
  const icon = getIcon(entity)
  const shapeQname = entity.shapeRef
    ? entity.shapeRef.qname
      ? entity.shapeRef.qname
      : entity.shapeRef
    : entities[index] && entities[index].shapeRef
    ? entities[index].shapeRef.qname
      ? entities[index].shapeRef.qname
      : entities[index].shapeRef
    : icon
    ? "bds:" + icon[0].toUpperCase() + icon.substring(1) + "Shape"
    : ""

  //debug("sQn:", icon) //, index, tab, shapeQname, entity.shapeRef?.qname, entity.shapeRef, entity.subjectQname)

  const link =
    icon && icon.startsWith("user") ? "/profile" : "/edit/" + entity.subjectQname + (shapeQname ? "/" + shapeQname : "")

  const allLoaded = entities.reduce((acc, e) => acc && e.state !== EditedEntityState.Loading, true)

  const handleClick = (event: ChangeEvent<unknown>, newTab: number): void => {
    if (newTab !== tab) {
      setDisabled(true)
      setTab(newTab)
      setPopupOn(false)
    }
  }

  const closeEntity = async (ev: MouseEvent) => {
    ev.persist()
    if (entity.state === EditedEntityState.NeedsSaving || entity.state === EditedEntityState.Error) {
      const go = window.confirm("unsaved data will be lost")
      if (!go) return
    }
    // update user session
    setUserSession(
      auth0,
      entity.subjectQname,
      shapeQname,
      !entity.preloadedLabel ? (label && entity.subject?.lname ? entity.subject?.lname : label) : entity.preloadedLabel,
      true
    )
    // remove data in local storage
    await setUserLocalEntities(auth0, entity.subjectQname, shapeQname, "", true, userId, entity.alreadySaved)
    // remove history for entity
    if (undoHistory) {
      const uri = ns.defaultPrefixMap.uriFromQname(entity.subjectQname)
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
      history.push("/")
    } else if (tab <= newList.length && tab !== -1) {
      // keep current tab open
      const newIndex = newList.findIndex((e) => e.entityQname === entities[index].entityQname)
      setTab(newIndex)
    } else {
      // case of closing from /new route
      setTab(-1)
    }
    return false
  }

  //debug("entity?", entity.alreadySaved, entity, tab, entities[tab], entities.map(e => e.subjectQname+":"+e.alreadySaved))

  // update user session
  setUserSession(
    auth0,
    entity.subjectQname,
    shapeQname,
    !entity.preloadedLabel ? (entity.subject?.lname ? entity.subject?.lname : label) : entity.preloadedLabel,
    false,
    entity.alreadySaved
  )

  //debug("label?",label,entity.subject?.lname)

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
                  src={
                    "/icons/" +
                    icon.toLowerCase() +
                    (index === tab ? "_" : "") +
                    (icon && icon.startsWith("User") ? ".png" : ".svg")
                  }
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
