## SSR support = true

## examples

to run the examples you need

1. clone this repo
2. cd react-ab-test
3. npm i && npm run build
   - cd examples/client_render_coockie or examples/client_render_localstorage
     - npm i && npm start
   - cd examples/server_render_coockie
     - npm i && npm run build && npm start

[client_render_coockie](https://github.com/101internet/react-ab-test/tree/master/examples/client_render_coockie)

[client_render_localstorage](https://github.com/101internet/react-ab-test/tree/master/examples/client_render_localstorage)

[server_render_coockie](https://github.com/101internet/react-ab-test/tree/master/examples/server_render_coockie)

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

`resolve` -> function will be called after selecting the option `A/B testing`
variants of experiments will be sorted in ascending order automatically

##### The next step is to create an adapter for storing and deleting data about the selected variant.

The library doesn't care where you save/retrieve `selected variant`, the most common examples are storage in coockies and localStorage.

```javascript
// cookies set/get example
import Cookies from "js-cookie";
import { StorageAdapter } from "react-abtesting";

const storageAdapter = new StorageAdapter({
  prefix: "AB_", // optional
  setter: (key, val) => Cookies.set(key, val), // required
  getter: key => Cookies.get(key) // required
});
```

```javascript
// localStorage set/get example
import { StorageAdapter } from "react-abtesting";

const storageAdapter = new StorageAdapter({
  prefix: "AB_", // optional
  setter: (key, val) => localStorage.setItem(key, val), // required
  getter: key => localStorage.getItem(key) // required
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
