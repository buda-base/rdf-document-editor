import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './DemoSingleEntity';
import { RecoilRoot } from "recoil"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <RecoilRoot>
      <Switch>
        <Route component={App} />
      </Switch>
    </RecoilRoot>
  </Router>
)
