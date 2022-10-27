import React, { useState, useEffect } from "react"
import { EntityFetcher } from "../helpers/rdf/io"
import { RDFResourceWithLabel } from "../helpers/rdf/types"
import i18n from "i18next"
import { uiLangState, entitiesAtom } from "../atoms/common"
import * as lang from "../helpers/lang"
import { useRecoilState } from "recoil"
import { RDEProps } from "../helpers/editor_props"
import { Link, Navigate, useParams, useNavigate } from "react-router-dom"
import { TextField, MenuItem } from "@mui/material"

const debug = require("debug")("rde:entity:shape")

function EntityShapeChooserContainer(props: RDEProps) {
  const config = props.config
  const params = useParams()
  const navigate = useNavigate()

  const [entityQname, setEntityQname] = useState(params.entityQname || "")
  const [uiLang] = useRecoilState(uiLangState)
  const [entities, setEntities] = useRecoilState(entitiesAtom)

  const unmounting = { val: false }

  useEffect(() => {
    return () => {
      //debug("unm:esc")
      unmounting.val = true
    }
  }, [])

  useEffect(() => {
    //debug("params", props.match.params.entityQname)
    if (unmounting.val) return
    else if (params.entityQname) setEntityQname(params.entityQname)
  }, [params])

  // here we create the entity in the list if it's not there yet:
  const entityFromList = entities.find((e) => e.subjectQname === entityQname)
  if (entityFromList && entityFromList.shapeQname) {
    const shapeQname = entityFromList.shapeQname
    navigate("/edit/" + entityQname + "/" + shapeQname, { replace: true })
    return (
      <div>
        <div>
          <>{i18n.t("types.redirect")}</>
        </div>
      </div>
    )
  }
  const { entityLoadingState, entity } = EntityFetcher(entityQname, "", config, unmounting)

  if (entity) {
    const possibleShapes = config.possibleShapeRefsForEntity(entity.node)
    if (entityLoadingState.status === "fetching") {
      return (
        <div>
          <div>
            <>{i18n.t("types.loading")}</>
          </div>
        </div>
      )
    } else if (entityLoadingState.error === "not found") {
      return (
        <div className="error">
          <div>
            <span>
              <>{i18n.t("error.exist", { id: entityQname })}</>
            </span>
            <br />
            <Link style={{ fontWeight: 700 }} to="/new">
              <>{i18n.t("error.redirect")}</>
            </Link>
          </div>
        </div>
      )
    } else if (!possibleShapes) {
      debug("cannot find", entity, entityLoadingState)
      return (
        <div className="error">
          <div>
            <span>
              <>{i18n.t("error.shape", { id: entityQname })}</>
            </span>
            <br />
            <Link style={{ fontWeight: 700 }} to="/new">
              <>{i18n.t("error.redirect")}</>
            </Link>
          </div>
        </div>
      )
    }
    if (possibleShapes.length > 1) {
      const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, shape: RDFResourceWithLabel) => {
        const newEntities = [...entities]
        for (const i in newEntities) {
          const e = newEntities[i]
          if (e.subjectQname === entityQname) {
            newEntities[i] = { ...e, shapeQname: shape.qname }
            setEntities(newEntities)
            break
          }
        }
      }

      return (
        <div className="centered-ctn">
          <div>
            <b>Choose a shape:</b>
            <TextField
              select
              helperText={"List of all possible shapes"}
              id="shapeSelec"
              className="shapeSelector"
              value={config.possibleShapeRefs[0].qname}
              style={{ marginTop: "3px", marginLeft: "10px" }}
            >
              {config.possibleShapeRefs.map((shape: RDFResourceWithLabel, index: number) => (
                <MenuItem key={shape.qname} value={shape.qname} style={{ padding: 0 }}>
                  <Link
                    to={"/edit/" + entityQname + "/" + shape.qname}
                    className="popLink"
                    onClick={(ev) => handleClick(ev, shape)}
                  >
                    {lang.ValueByLangToStrPrefLang(shape.prefLabels, uiLang)}
                  </Link>
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      )
    } else {
      return <Navigate to={"/edit/" + entityQname + "/" + possibleShapes[0].qname} />
    }
  }

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

export default EntityShapeChooserContainer
