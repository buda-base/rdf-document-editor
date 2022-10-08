import React, { useState, useEffect, useMemo, FC } from "react"
import { TimeTravelObserver } from "../../helpers/observer"
import { ShapeFetcher, debugStore } from "../../../helpers/rdf/io"
import { RDFResource, Subject } from "../../../helpers/rdf/types"
import { PropertyShape, NodeShape } from "../../../helpers/rdf/shapes"
import NotFoundIcon from "@material-ui/icons/BrokenImage"
import i18n from "i18next"
import PropertyContainer from "./PropertyContainer"
import { uiLangState } from "../../../atoms/common"
import * as lang from "../../../helpers/lang"
import { atom, useRecoilState } from "recoil"
import { AppProps, IdTypeParams } from "../../../containers/AppContainer"
import Button from "@material-ui/core/Button"
import * as rdf from "rdflib"

const debug = require("debug")("rde:entity:edit:subnode")

const SubNodeEditContainer: FC<{ shape: NodeShape; subject: Subject }> = ({ shape, subject }) => {
  return (
    <React.Fragment>
      <div>
        {shape.properties.map((p, index) => (
          <PropertyContainer key={p.uri} property={p} subject={subject} editable={p.readOnly !== true} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default SubNodeEditContainer
