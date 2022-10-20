import React from "react"
import { 
  EntityEditContainer, 
  EntityEditContainerMayUpdate, 
  NewEntityContainer,
  EntityCreationContainer, 
  EntityCreationContainerRoute,
  EntityShapeChooserContainer,
  IdTypeParams
} from "rdf-document-editor"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams
} from "react-router-dom"

import { demoConfig } from "./demo_rde_config"

export interface AppProps extends IdTypeParams {}

function App() {
  const appEl = React.useRef<HTMLDivElement>(null)
  const uriParams = useParams()
  const location = useLocation()

  return (
    <>
      <div
        ref={appEl}
        data-route={location.pathname}
        className={"App " + (location.pathname === "/" ? "home" : "")}
      >
        <main>
          <div>
            <Routes>
              <Route path="/new" element={<NewEntityContainer config={demoConfig}/>} />
              <Route path="/new/:shapeQname" component={EntityCreationContainer} />
              <Route // we need that route to link back value to property where entity was created
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityCreationContainerRoute}
              />
              <Route // this one as well
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityEditContainerMayUpdate}
              />
              <Route
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityEditContainerMayUpdate}
              />
              <Route path="/edit/:entityQname/:shapeQname" component={EntityEditContainer} />
              <Route path="/edit/:entityQname" component={EntityShapeChooserContainer} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  )
}

export default App