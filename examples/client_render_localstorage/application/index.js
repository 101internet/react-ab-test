import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { AB_Provider, AB_Test, StorageAdapter } from "../../../dist";
import Cookies from "js-cookie";

const experimentMap = [
  {
    name: "MyExperiment",
    variants: [
      {
        name: "A",
        weight: 3
      },
      {
        name: "B",
        weight: 7
      },
      {
        name: "C",
        weight: 10
      }
    ],
    resolve: variant => {
      console.log("MyExperiment: selected variant", variant);
    }
  }
];

const storageAdapter = new StorageAdapter({
  setter: (name, val) => localStorage.setItem(name, val),
  getter: name => localStorage.getItem(name)
});

const abTest = new AB_Test(experimentMap, storageAdapter);

ReactDOM.render(
  <AB_Provider abTest={abTest}>
    <App />
  </AB_Provider>,
  document.getElementById("root")
);
