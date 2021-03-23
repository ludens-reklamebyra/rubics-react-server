import React from "react";
import ReactDOM from "react-dom";
import Page from "./Page";

ReactDOM.hydrate(
  <Page store={_STORE} renderer="client" />,
  document.querySelector("#app")
);
