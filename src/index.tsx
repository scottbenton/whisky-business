import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "components/App";
import * as serviceWorker from "./serviceWorker";
import AppProviders from "providers/AppProviders";

import "typeface-dosis";
import "typeface-montserrat";

import Amplify from "aws-amplify";
import aws_exports from "aws-exports";
Amplify.Auth.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
