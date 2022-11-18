
import { uiTabState, entitiesAtom } from "../atoms/common"
import { useRecoilState } from "recoil"
import { Dialog422 } from "./Dialog"
import { Navigate, useParams, useLocation } from "react-router-dom"
import React, { useEffect } from "react"
import { BrokenImage as NotFoundIcon } from "@mui/icons-material"
import i18n from "i18next"
import queryString from "query-string"
import { RDEProps } from "../helpers/editor_props"
import * as rdf from "rdflib"
import { debug as debugfactory } from "debug"
import { useTranslation } from "react-i18next"

const debug = debugfactory("rde:entity:entitycreation")

export function EntityCreationContainer(props: RDEProps) {
  const config = props.config
  const params = useParams()
  
  const subjectQname = params.subjectQname
  const shapeQname = params.shapeQname || ""
  const propertyQname = params.propertyQname
  const index = params.index
  const subnodeQname = params.subnodeQname

  // entityQname is an ID desired by the user. In that case we must:
  // - if an entity with the same qname is already open in the editor, just redirect to it
  // - else call EntityCreator
  const entityQname = params.entityQname || ""
  
  const location = useLocation()
  const { t } = useTranslation()
  
  const unmounting = { val: false }
  useEffect(() => {
    return () => {
      //debug("unm:ecc")
      unmounting.val = true
    }
  }, [])

  const shapeNode = rdf.sym(config.prefixMap.uriFromQname(shapeQname))
  const entityNode = entityQname ? rdf.sym(config.prefixMap.uriFromQname(entityQname)) : null

  const { entityLoadingState, entity } = unmounting.val
    ? { entityLoadingState: { status: "idle", error: undefined }, entity: null }
    : config.entityCreator(shapeNode, entityNode, unmounting)

  debug("new:", entityLoadingState, entity, entityQname, entity?.qname, shapeQname, shapeNode, entityNode)

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

    const newUrl = location.pathname.replace(/\/named\/.*/, "") + location.search

    return <Dialog422 open={true} shaped={shapeQname} named={entityQname} editUrl={editUrl} newUrl={newUrl} />
  } else if (entity) {
    if (subjectQname && propertyQname && index != undefined)
      return (
        <Navigate
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
    else return <Navigate to={"/edit/" + (entityQname ? entityQname : entity.qname) + "/" + shapeQname} />
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
        <div>
          <>{t("types.creating")}</>
        </div>
      </div>
    </>
  )
}

export function EntityCreationContainerAlreadyOpen(props: RDEProps) {
  const params = useParams()

  const subjectQname = params.subjectQname
  const shapeQname = params.shapeQname
  const propertyQname = params.propertyQname
  const index = params.index
  const subnodeQname = params.subnodeQname

  // entityQname is an ID desired by the user. In that case we must:
  // - if an entity with the same qname is already open in the editor, just redirect to it
  // - else call EntityCreator
  const entityQname = params.entityQname

  const unmounting = { val: false }
  useEffect(() => {
    return () => {
      //debug("unm:ecc")
      unmounting.val = true
    }
  }, [])

  if (subjectQname && propertyQname && index != undefined)
    return (
      <Navigate
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
  else return <Navigate to={"/edit/" + entityQname + "/" + shapeQname} />

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

export function EntityCreationContainerRoute(props: RDEProps) {
  const params = useParams()

  const [entities, setEntities] = useRecoilState(entitiesAtom)
  const i = entities.findIndex((e) => e.subjectQname === params.entityQname)
  const theEntity = entities[i]

  const location = useLocation()

  const { copy } = queryString.parse(location.search, { decode: false })

  //debug("search/copy:", copy)

  if (theEntity) return <EntityCreationContainerAlreadyOpen {...props} copy={copy} />
  else return <EntityCreationContainer {...props} copy={copy} />
}

export default EntityCreationContainer
