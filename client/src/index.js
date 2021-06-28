import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";

import App from "containers/App";
import * as serviceWorker from "./sw/sw-register";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("index")
);

serviceWorker.LocalRegister();
