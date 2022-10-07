import React from "react"

function About() {
  return (
    <React.Fragment>
      <div role="main">
        <section className="jumbotron text-center mb-0">
          <div className="container">
            <h1 className="jumbotron-heading">
              {window.screen.width} x {window.screen.height}
            </h1>
            <p className="lead text-muted">
              Window: {window.innerWidth} x {window.innerHeight}
            </p>
            <p className="lead text-muted">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
              {new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)[1]}
            </p>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default About
