import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './DemoSingleEntity';
import { RecoilRoot } from "recoil"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

import { AppProps } from './DemoSingleEntity';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <RecoilRoot>
      <Routes>
        <Route element={<App />} />
      </Routes>
    </RecoilRoot>
  </Router>
)
