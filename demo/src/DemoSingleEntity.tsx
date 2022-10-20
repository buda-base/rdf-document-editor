import React from "react"
import {
  EntityEditContainer,
  EntityEditContainerMayUpdate,
  NewEntityContainer,
  EntityCreationContainer,
  EntityCreationContainerRoute,
  EntityShapeChooserContainer,
  IdTypeParams,
} from "rdf-document-editor"

import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from "react-router-dom"

import { demoConfig } from "./demo_rde_config"

export interface AppProps extends IdTypeParams {}

function App() {
  const appEl = React.useRef<HTMLDivElement>(null)
  const location = useLocation()

  return (
    <>
      <div ref={appEl} data-route={location.pathname} className={"App " + (location.pathname === "/" ? "home" : "")}>
        <main>
          <div>
            <Routes>
              <Route path="/new" element={<NewEntityContainer config={demoConfig} />} />
              <Route path="/new/:shapeQname" element={<EntityCreationContainer config={demoConfig} />} />
              <Route // we need that route to link back value to property where entity was created
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index"
                element={<EntityCreationContainerRoute config={demoConfig} />}
              />
              <Route // this one as well
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                element={<EntityCreationContainerRoute config={demoConfig} />}
              />
              <Route // same with entityQname
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/named/:entityQname"
                element={<EntityCreationContainerRoute config={demoConfig} />}
              />
              <Route // same with entityQname
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname/named/:entityQname"
                element={<EntityCreationContainerRoute config={demoConfig} />}
              />
              <Route
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index"
                element={<EntityEditContainerMayUpdate config={demoConfig} />}
              />
              <Route
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                element={<EntityEditContainerMayUpdate config={demoConfig} />}
              />
              <Route path="/edit/:entityQname/:shapeQname" element={<EntityEditContainer config={demoConfig} />} />
              <Route path="/edit/:entityQname" element={<EntityShapeChooserContainer config={demoConfig} />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
