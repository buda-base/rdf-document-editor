import React from "react"
import { Link } from "react-router-dom"
import qs from "query-string"

const debug = require("debug")("rde:auth:request")

export function AuthRequest(props) {
  const urlParams = qs.parse(window.location.search)
  const notAdmin = urlParams.notAdmin === "true"
  //debug("urlP:",urlParams)

  return (
    <React.Fragment>
      <div role="main">
        <section className="jumbotron pb-1 mb-0">
          <div className="container text-center">
            {notAdmin && <p>This account does not have admin credentials.</p>}
            <p className="text-muted">
              You must be signed in to an account <b>with admin credentials</b> to access this feature.
              <br />
              <br />
            </p>
            <div className="container col-md-4">
              <Link
                style={{ width: 130 }}
                className="btn btn-danger px-4"
                to={"/login?redirect=" + encodeURIComponent(window.location.pathname + window.location.search)}
              >
                Login
              </Link>
              <Link style={{ width: 130 }} className="btn btn-outline-contrast px-4 ml-4" to={"/demo"}>
                Try demo
              </Link>
              <p className="card-text small text-center pt-1 pb-4 mt-3">
                <a href="/register" className="text-secondary">
                  {/* Don’t have a user account yet? Create one now. */}
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}
