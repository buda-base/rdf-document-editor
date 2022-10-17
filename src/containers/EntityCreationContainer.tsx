//import { EntityCreator } from "../helpers/rdf/construct"
import { ShapeFetcher, EntityFetcher } from "../helpers/rdf/io"
import * as shapes from "../helpers/rdf/shapes"
import { RDFResourceWithLabel, Subject, EntityGraph } from "../helpers/rdf/types"
import { entitiesAtom, EditedEntityState } from "./EntitySelectorContainer"
import { uiLangState, userIdState, RIDprefixState, uiTabState } from "../atoms/common"
import * as lang from "../helpers/lang"
import RDEConfig from "../helpers/rde_config"
import { useRecoilState } from "recoil"
import { Dialog422 } from "./Dialog"
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"
import qs from "query-string"
import NotFoundIcon from "@material-ui/icons/BrokenImage"
import i18n from "i18next"
import queryString from "query-string"
import Button from "@material-ui/core/Button"
import { RDEProps } from "../helpers/editor_props"
import * as rdf from "rdflib"

const debug = require("debug")("rde:entity:entitycreation")

export function EntityCreationContainer(props: RDEProps, config: RDEConfig) {
  const subjectQname = props.match.params.subjectQname
  const shapeQname = props.match.params.shapeQname
  const propertyQname = props.match.params.propertyQname
  const index = props.match.params.index
  const subnodeQname = props.match.params.subnodeQname

  // entityQname is an ID desired by the user. In that case we must:
  // - if an entity with the same qname is already open in the editor, just redirect to it
  // - else call EntityCreator
  const entityQname = props.match.params.entityQname
  const [userId, setUserId] = useRecoilState(userIdState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)
  const [uiTab, setUiTab] = useRecoilState(uiTabState)

  const routerHistory = useHistory()

  const unmounting = { val: false }
  useEffect(() => {
    return () => {
      //debug("unm:ecc")
      unmounting.val = true
    }
  }, [])

  if (RIDprefix == "") return <Redirect to="/new" />

  const shapeNode = rdf.sym(config.prefixMap.uriFromQname(shapeQname))
  const entityNode = rdf.sym(config.prefixMap.uriFromQname(entityQname))

  const { entityLoadingState, entity } = unmounting.val
    ? { entityLoadingState: { status: "idle", error: undefined }, entity: null }
    : config.entityCreator(shapeNode, entityNode, unmounting)

  debug("new:", entityLoadingState, entity, entityQname, entity?.qname, shapeQname)

  // TODO: if EntityCreator throws a 422 exception (the entity already exists),
  // we must give a choice to the user:
  //    * open the existing entity
  //    * create an entity with a different id, in which case we call reserveLname again
  if (entityLoadingState.error === "422" && entity) {
    // eslint-disable-line no-magic-numbers

    const editUrl =
      subjectQname && propertyQname && index != undefined
        ? "/edit/" +
          entityQname +
          "/" +
          shapeQname +
          "/" +
          subjectQname +
          "/" +
          propertyQname +
          "/" +
          index +
          (subnodeQname ? "/" + subnodeQname : "") +
          (props.copy ? "?copy=" + props.copy : "")
        : "/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname

    const newUrl = routerHistory.location.pathname.replace(/\/named\/.*/, "") + routerHistory.location.search

    return <Dialog422 open={true} shaped={shapeQname} named={entityQname} editUrl={editUrl} newUrl={newUrl} />
  } else if (entity) {
    if (subjectQname && propertyQname && index != undefined)
      return (
        <Redirect
          to={
            "/edit/" +
            (entityQname ? entityQname : entity.qname) +
            "/" +
            shapeQname +
            "/" +
            subjectQname +
            "/" +
            propertyQname +
            "/" +
            index +
            (subnodeQname ? "/" + subnodeQname : "") +
            (props.copy ? "?copy=" + props.copy : "")
          }
        />
      )
    else return <Redirect to={"/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname} />
  }
  if (entityLoadingState.status === "error") {
    return (
      <p className="text-center text-muted">
        <NotFoundIcon className="icon mr-2" />
        {entityLoadingState.error}
      </p>
    )
  }
  return (
    <>
    <div>
      <div><>{i18n.t("types.creating")}</></div>
    </div>
    </>
  )
}

export function EntityCreationContainerAlreadyOpen(props: RDEProps) {
  const subjectQname = props.match.params.subjectQname
  const shapeQname = props.match.params.shapeQname
  const propertyQname = props.match.params.propertyQname
  const index = props.match.params.index
  const subnodeQname = props.match.params.subnodeQname

  // entityQname is an ID desired by the user. In that case we must:
  // - if an entity with the same qname is already open in the editor, just redirect to it
  // - else call EntityCreator
  const entityQname = props.match.params.entityQname
  const [userId, setUserId] = useRecoilState(userIdState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const [RIDprefix, setRIDprefix] = useRecoilState(RIDprefixState)
  const [uiTab, setUiTab] = useRecoilState(uiTabState)

  const unmounting = { val: false }
  useEffect(() => {
    return () => {
      //debug("unm:ecc")
      unmounting.val = true
    }
  }, [])

  if (subjectQname && propertyQname && index != undefined)
    return (
      <Redirect
        to={
          "/edit/" +
          entityQname +
          "/" +
          shapeQname +
          "/" +
          subjectQname +
          "/" +
          propertyQname +
          "/" +
          index +
          (subnodeQname ? "/" + subnodeQname : "") +
          (props.copy ? "?copy=" + props.copy : "")
        }
      />
    )
  else return <Redirect to={"/edit/" + entityQname + "/" + shapeQname} />

  return (
    <>
    <div>
      <div><>{i18n.t("types.loading")}</></div>
    </div>
    </>
  )
}

export function EntityCreationContainerRoute(props: RDEProps) {
  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const i = entities.findIndex((e) => e.subjectQname === props.match.params.entityQname)
  const theEntity = entities[i]

  const { copy } = queryString.parse(props.location.search, { decode: false })

  //debug("search/copy:", copy)

  if (theEntity) return <EntityCreationContainerAlreadyOpen {...props} copy={copy} />
  else return <EntityCreationContainer {...props} copy={copy} />
}

export default EntityCreationContainer
