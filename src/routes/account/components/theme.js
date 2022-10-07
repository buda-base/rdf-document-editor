import React from "react"
import { BsToggleOn } from "react-icons/bs"

export const toggleSwitch = value => {
  return value ? (
    <BsToggleOn className="text-contrast" style={{ fontSize: "1.4em" }} />
  ) : (
    <BsToggleOn style={{ fontSize: "1.4em", color: "#868686", transform: "rotate(180deg)" }} />
  )
}
