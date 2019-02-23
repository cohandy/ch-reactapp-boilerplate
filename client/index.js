import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import App from "./App.js";

import "normalize.css";
import "./styles/base.less";
import "./styles/layout.less";
import "./styles/module.less";

const stores = {
  
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
