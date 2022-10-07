import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { outlinesAtom } from "../atoms/common"
import { useRecoilState } from "recoil"

const debug = require("debug")("rde:outline:info")

function OutlineInfo(props: any) {
  //debug("props:",props)
  const { manifest, data, title, getPageTitlePath, i } = props

  useEffect(() => {
    if (!title) getPageTitlePath(i + 1)
  })

  const indent = 20,
    init = 5

  const renderTitle = (tt) => {
    return tt.map((t, i) => (
      <>
        <div style={{ marginLeft: indent * i + init }}>{t.labels[0]["@value"]}</div>
      </>
    ))
  }

  return (
    <div className="outline-info" data-i={i}>
      {i + 1}
      <br />
      {!title || !title.length ? data.filename : Array.isArray(title[0]) ? title.map(renderTitle) : renderTitle(title)}
    </div>
  )
}

const mapStateToProps = function (state: any) {
  return {
    manifest: state.manifest,
  }
}

export default connect(mapStateToProps)(OutlineInfo)
