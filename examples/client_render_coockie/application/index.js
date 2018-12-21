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
    }
];

const storageAdapter = new StorageAdapter({
    setter: (name, val) => Cookies.set(name, val),
    getter: name => Cookies.get(name)
});

const abTest = new AB_Test(experimentMap, storageAdapter);

ReactDOM.render(
    <AB_Provider abTest={abTest}>
        <App />
    </AB_Provider>,
    document.getElementById("root")
);
