import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { AB_Provider, AB_Test, StorageAdapter } from "../../../dist";
import Cookies from "js-cookie";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

const cookies = Cookies.withConverter({
  read: function(value, name) {
    return value;
  },
  write: function(value, name) {
    return value;
  }
});

const experimentMap = [
  {
    name: "MyExperiment",
    variants: [
      {
        name: "Default",
        weight: 1
      },
      {
        name: "B",
        weight: 2
      }
    ],
    resolve: variant => {
      console.log("MyExperiment: selected variant", variant);
    }
  },
  {
    name: "MyExperiment2",
    variants: [
      {
        name: "Default",
        weight: 1
      },
      {
        name: "B",
        weight: 2
      }
    ],
    resolve: variant => {
      console.log("MyExperiment2: selected variant", variant);
    }
  }
];

window.main = () => {
  const history = createBrowserHistory();

  const storageAdapter = new StorageAdapter({
    setter: (name, val) => {
      cookies.set(name, val);
    },
    getter: name => cookies.get(name)
  });

  const abTest = new AB_Test(experimentMap, storageAdapter);

  ReactDOM.hydrate(
    <Router history={history}>
      <AB_Provider abTest={abTest} history={history}>
        <App />
      </AB_Provider>
    </Router>,
    document.getElementById("root")
  );
};
