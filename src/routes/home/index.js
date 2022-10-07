import React from "react"
import PropTypes from "prop-types"
import preval from "preval.macro"
import { Link } from "react-router-dom"
import i18n from "i18next"

import { PersonIcon, PlaceIcon, WorkIcon, VersionIcon } from "../layout/icons"

const buildDate = preval`module.exports = new Date().toISOString()`

// eslint-disable-next-line no-unused-vars
const announcement = (
  <div className="alert alert-success alert-dismissible" role="alert">
    <button type="button" className="close" data-dismiss="alert">
      <span aria-hidden="true">&times;</span>
      <span className="sr-only">Close</span>
    </button>
    <p className="text-center mb-0">Sample</p>
  </div>
)

function EntryPoint({ label, icon, path }) {
  return (
    <div className="col-auto d-flex justify-content-center">
      <div className="text-center" style={{ width: "150px" }}>
        <div className="card px-0" style={{ height: "150px", width: "150px", borderRadius: "25px" }}>
          <Link className="py-3" to={path}>
            <span className="py-0" style={{ fontSize: "4em", color: "gray" }}>
              {icon}
            </span>
          </Link>
        </div>
        <p className="small strong mt-2">{label}</p>
      </div>
    </div>
  )
}

EntryPoint.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
}

function Home() {
  return (
    <div role="main">
      <section className="announcement"></section>
      <section className="jumbotron text-center mb-0">
        <div className="container">
          <h3 className="jumbotron-heading">{i18n.t("home.title")}</h3>
          <p className="small text-muted mt-2">
            {process.env.NODE_ENV || "development"} | Release {process.env.REACT_APP_VERSION} | Build: {buildDate}
          </p>
        </div>
      </section>

      <section className="album">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <EntryPoint path="/persons" label={i18n.t("types.person_plural")} icon={<PersonIcon height="50px" />} />
            <EntryPoint path="/works" label={i18n.t("types.work_plural")} icon={<WorkIcon height="50px" />} />
            <EntryPoint path="/places" label={i18n.t("types.place_plural")} icon={<PlaceIcon height="50px" />} />
            <EntryPoint path="/versions" label={i18n.t("types.version_plural")} icon={<VersionIcon height="40px" />} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
