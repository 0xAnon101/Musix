import React from "react";
import ReactDOM from "react-dom";
import App from "./Containers/App";
import * as serviceWorker from "./sw/sw-register";

ReactDOM.render(<App />, document.getElementById("index"));

serviceWorker.LocalRegister();
