import React from "react"
import { render } from "react-dom"
import { RecoilRoot } from "recoil"
import EntityEditContainer, { EntityEditContainerMayUpdate } from "../../src/containers/EntityEditContainer"
import NewEntityContainer from "../../src/containers/NewEntityContainer"
import EntityCreationContainer, { EntityCreationContainerRoute } from "../../src/containers/EntityCreationContainer"
import EntityShapeChooserContainer from "../../src/containers/EntityShapeChooserContainer"
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom"

const target = document.querySelector("#root")

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
              <Route exact path="/" component={HomeContainer} />
              <Route
                exact
                path="/profile"
                render={(rprops) => (
                  <EntityEditContainer {...rprops} entityQname="tmp:user" shapeQname="bds:UserProfileShape" />
                )}
              />
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

render(
  <Router>
    <RecoilRoot>
      <Switch>
        <Route component={App} />
      </Switch>
    </RecoilRoot>
  </Router>,
  target
)
