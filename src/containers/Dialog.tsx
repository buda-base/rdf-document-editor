import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { debug as debugfactory } from "debug"

const debug = debugfactory("rde:entity:dialog")

export interface DialogProps {
  // TODO: document a bit
  open: any
  shaped: string
  newUrl: string
  editUrl: string
  named: string
}

export function Dialog422(props: DialogProps) {
  const [open, setOpen] = React.useState(props.open)
  const shape = props.shaped.split(":")[1]?.replace(/Shape$/, "")
  const [createNew, setCreateNew] = useState(false)
  const [loadNamed, setLoadNamed] = useState(false)

  debug("422:", props)

  const handleLoad = () => {
    setLoadNamed(true)
    setOpen(false)
  }

  const handleNew = () => {
    setCreateNew(true)
    setOpen(false)
  }

  if (createNew) return <Navigate to={props.newUrl} />
  else if (loadNamed) return <Navigate to={props.editUrl} />
  else
    return (
      <div>
        <Dialog open={open}>
          <DialogTitle>
            {shape} {props.named} has already been created
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to use it, or to create a new {shape} with another RID instead?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-around" }}>
            <Button className="btn-rouge" onClick={handleLoad} color="primary">
              Use&nbsp;<span style={{ textTransform: "none" }}>{props.named}</span>
            </Button>
            <Button className="btn-rouge" onClick={handleNew} color="primary">
              Create&nbsp;<span style={{ textTransform: "none" }}>{shape}</span>&nbsp;with another RID
            </Button>
          </DialogActions>
          <br />
        </Dialog>
      </div>
    )
}
