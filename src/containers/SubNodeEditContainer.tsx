import React, { FC } from "react"
import { Subject } from "../helpers/rdf/types"
import { NodeShape } from "../helpers/rdf/shapes"
import PropertyContainer from "./ValueList"
import RDEConfig from "../helpers/rde_config"

const SubNodeEditContainer: FC<{ shape: NodeShape; subject: Subject; config: RDEConfig }> = ({
  shape,
  subject,
  config,
}) => {
  return (
    <React.Fragment>
      <div>
        {shape.properties.map((p, index) => (
          <PropertyContainer
            key={p.uri}
            property={p}
            subject={subject}
            shape={shape}
            editable={p.readOnly !== true}
            config={config}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default SubNodeEditContainer
