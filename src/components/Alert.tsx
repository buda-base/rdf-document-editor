import React, { FC, MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export const Alert: FC<{ type: string; text: string }> = ({ type, text }) => {
  const name = `alert ${type} alert-dismissible fade show`

  return (
    <div className={name} role="alert">
      {text}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export const AlertError: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="alert alert-danger fade show rounded-0" role="alert">
      {text}
    </div>
  )
}

export const AlertBacklink: FC<{ text: string; goBack: MouseEventHandler }> = ({ text, goBack }) => {
  return (
    <div className="alert alert-info alert-dismissible" role="alert">
      {text} Click&nbsp;
      <Link className="text-info" to={"#"} onClick={goBack}>
        here
      </Link>
      &nbsp;to go back.
    </div>
  )
}

export const AlertErrorForm: FC<{ text: string; dismissable: boolean }> = ({ text, dismissable = false }) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show small text-center" role="alert">
      {text}
      {dismissable ? (
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      ) : null}
    </div>
  )
}
