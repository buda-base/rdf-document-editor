import React from "react"
import EntityEditContainer, { EntityEditContainerMayUpdate } from "./rde/containers/EntityEditContainer"
import NewEntityContainer from "./rde/containers/NewEntityContainer"
import EntityCreationContainer, { EntityCreationContainerRoute } from "./rde/containers/EntityCreationContainer"
import EntityShapeChooserContainer from "./rde/containers/EntityShapeChooserContainer"
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom"
import { IdTypeParams } from "./rde/helpers/editor_props"


export interface AppProps extends RouteComponentProps<IdTypeParams> {}

function App(props: AppProps) {
  const appEl = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={appEl}
        data-route={props.location.pathname}
        className={"App " + (props.location.pathname === "/" ? "home" : "")}
      >
        <main>
          <div>
            <Switch>
              <Route exact path="/new" component={NewEntityContainer} />
              <Route exact path="/new/:shapeQname" component={EntityCreationContainer} />
              <Route // we need that route to link back value to property where entity was created
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityCreationContainerRoute}
              />
              <Route // this one as well
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route // same with entityQname
                exact
                path="/new/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname/named/:entityQname"
                component={EntityCreationContainerRoute}
              />
              <Route
                exact
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index"
                component={EntityEditContainerMayUpdate}
              />
              <Route
                exact
                path="/edit/:entityQname/:shapeQname/:subjectQname/:propertyQname/:index/:subnodeQname"
                component={EntityEditContainerMayUpdate}
              />
              <Route exact path="/edit/:entityQname/:shapeQname" component={EntityEditContainer} />
              <Route exact path="/edit/:entityQname" component={EntityShapeChooserContainer} />
            </Switch>
          </div>
        </main>
      </div>
    </>
  )
}

export default App