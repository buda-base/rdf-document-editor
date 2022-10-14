import React, { useState, useEffect, useMemo, FC } from "react"
import { RDFResource, Subject } from "../helpers/rdf/types"
import { PropertyShape, NodeShape } from "../helpers/rdf/shapes"
import NotFoundIcon from "@material-ui/icons/BrokenImage"
import i18n from "i18next"
import PropertyContainer from "./PropertyContainer"
import { uiLangState } from "../atoms/common"
import * as lang from "../helpers/lang"
import RDEConfig from "../helpers/rde_config"
import { atom, useRecoilState } from "recoil"
import Button from "@material-ui/core/Button"
import * as rdf from "rdflib"

const debug = require("debug")("rde:entity:edit:subnode")

const SubNodeEditContainer: FC<{ shape: NodeShape; subject: Subject, config: RDEConfig }> = ({ shape, subject, config }) => {
  return (
    <React.Fragment>
      <div>
        {shape.properties.map((p, index) => (
          <PropertyContainer key={p.uri} property={p} subject={subject} shape={shape} editable={p.readOnly !== true} config={config} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default SubNodeEditContainer
