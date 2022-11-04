import React, { useState } from "react"
import { RDFResourceWithLabel } from "../helpers/rdf/types"
import { uiLangState } from "../atoms/common"
import * as lang from "../helpers/lang"
import { useRecoilState } from "recoil"
import { RDEProps } from "../helpers/editor_props"
import { Link, useNavigate } from "react-router-dom"
import i18n from "i18next"
import { Trans } from "react-i18next"
import { TextField, MenuItem } from "@mui/material"

function NewEntityContainer(props: RDEProps) {
  const config = props.config || {}

  const [uiLang] = useRecoilState(uiLangState)
  const [RID, setRID] = useState("")

  const navigate = useNavigate()

  // otherwise we want the user to select the appropriate shape

  // "here is a list of all possible shapes" "to choose from in order to create a new entity":
  return (
    <div className="new-fix">
      <div>
        <b>New entity:</b>
        <span>
          <TextField
            variant="standard"
            select
            //label="Choose a shape"
            helperText={"List of all possible shapes"}
            id="shapeSelec"
            className="shapeSelector"
            value={config.possibleShapeRefs[0].qname}
            style={{ marginTop: "3px", marginLeft: "10px" }}
          >
            {config.possibleShapeRefs.map((shape: RDFResourceWithLabel, index: number) => (
              <MenuItem key={shape.qname} value={shape.qname} style={{ padding: 0 }}>
                <Link to={"/new/" + shape.qname} className="popLink">
                  {lang.ValueByLangToStrPrefLang(shape.prefLabels, uiLang)}
                </Link>
              </MenuItem>
            ))}
          </TextField>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ marginRight: "10px" }}>
          <b>Load entity:</b>{" "}
        </div>
        <div>
          <TextField
            variant="standard"
            style={{ width: "100%" }}
            value={RID}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setRID(e.target.value)}
            helperText={"select an entity to load here by its RID"}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase())
            }}
          />
        </div>
        <div>
          <Link
            to={"/edit/bdr:" + RID.replace(/^bdr:/, "").toUpperCase()}
            className={"btn btn-sm btn-outline-primary py-3 ml-2 lookup btn-rouge " + (!RID ? "disabled" : "")}
            style={{ boxShadow: "none", alignSelf: "center", marginBottom: "15px" }}
          >
            <>{i18n.t("search.open")}</>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewEntityContainer
