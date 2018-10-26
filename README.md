# react-ab-test

Simple library for A/B-testing react apps

## Installation

```sh
$ npm install react-abtesting --save
```

## SSR support

an example will be later

## Getting Started

##### First you need to create an array of tests..

```javascript
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
    ...etc
];
```

##### The next step is to create an adapter for storing and deleting data about the selected variant.

for example, we will save the selected option in the cookie

```javascript
import Cookies from "js-cookie";
import { StorageAdapter } from "react-abtesting";

const storageAdapter = new StorageAdapter({
  prefix: "AB_",
  setter: (name, val) => Cookies.set(name, val),
  getter: name => Cookies.get(name)
});
```

##### The next step is to create an instance of the test class.

```javascript
import { AB_Test } from "react-abtesting";
const abTest = new AB_Test(experimentMap, storageAdapter);
```

##### Wrap application.

```javascript
import { AB_Provider } from "react-abtesting";
ReactDOM.render(
  <AB_Provider abTest={abTest}>
    <App />
  </AB_Provider>
);
```

##### Now, anywhere in the application, we can create our tests.

```javascript
//App.js
import { Experiment, Variant } from "react-abtesting";
render() {
    return (
        <div>
            <Experiment name="MyExperiment">
                <Variant name="A">
                    <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
                </Variant>
                <Variant name="B">
                    <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
                </Variant>
                <Variant name="C">
                    <div>CCCCCCCCCCCCCCCCCCCCCCCC</div>
                </Variant>
            </Experiment>
        </div>
)}
```
