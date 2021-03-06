import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { AB_Provider, AB_Test, StorageAdapter } from "../../../dist";

const experimentMap = [
    {
        name: "MyExperiment",
        variants: [
            {
                name: "Default",
                weight: 3
            },
            {
                name: "B",
                weight: 7
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
