import React, { useState, FC } from "react"
import { RDFResource, Subject, LiteralWithId, ObjectType } from "../helpers/rdf/types"
import { PropertyShape, NodeShape } from "../helpers/rdf/shapes"
import { uiLangState } from "../atoms/common"
import * as lang from "../helpers/lang"
import { atom, useRecoilState, atomFamily } from "recoil"
import ValueList from "./ValueList"
import * as rdf from "rdflib"

const debug = require("debug")("rde:entity:property")

const PropertyContainer: FC<{
  property: PropertyShape
  subject: Subject
  embedded?: boolean
  force?: boolean
  editable: boolean
  owner?: Subject
  topEntity?: Subject
  shape: NodeShape
  siblingsPath?: string
}> = ({ property, subject, embedded, force, editable, owner, topEntity, shape, siblingsPath }) => {
  const objectType = property.objectType

  //debug("propertyCtn:", property.qname, property, subject.qname, subject, siblingsPath)

  const [css, setCss] = useState("")

  const setCssClass = (txt, add = true) => {
    if (add) {
      if (!css.includes(txt)) setCss(css + txt + " ")
    } else {
      if (css.includes(txt)) setCss(css.replace(new RegExp(txt), ""))
    }
  }

  return (
    <React.Fragment>
      <div role="main" {...(css ? { className: css } : {})}>
        <section className="album">
          <div
            className={"container" + (embedded ? " px-0" : "") + " editable-" + editable}
            style={{ border: "dashed 1px none" }}
          >
            <ValueList
              subject={subject}
              property={property}
              embedded={embedded}
              force={force}
              editable={editable}
              {...(owner ? { owner } : {})}
              {...(topEntity ? { topEntity } : {})}
              shape={shape}
              siblingsPath={siblingsPath}
              setCssClass={setCssClass}
            />
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default PropertyContainer
