import React from "react"

export const MUI_FIELD_SPACER = "8px"

export function SectionDivider({ text, className = "text-contrast" }) {
  return (
    <p
      className={`text-center border-bottom small ${className}`}
      style={{ lineHeight: "0.1em", margin: "10px 0 20px" }}
    >
      <span style={{ background: "white", padding: "0 10px" }}>{text}</span>
    </p>
  )
}
