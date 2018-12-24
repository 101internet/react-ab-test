import * as React from "react";
import { render } from "enzyme";
import { Variant } from "../src/components/variant";
import { AB_Provider } from "../src/components/provider";
import { Experiment, StorageAdapter, AB_Test } from "../src";
import { iVariantSelect } from "../src/interfaces";

class Storage {
    store: any = {};

    set(name: string, value: string) {
        this.store[name] = value;
    }

    get(name: string) {
        return this.store[name];
    }
}

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
        resolve: (variant: iVariantSelect) => {}
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
        ]
    }
];

let storage: Storage;
let storageAdapter: StorageAdapter;
let abTest: AB_Test;
beforeEach(() => {
    storage = new Storage();
    storageAdapter = new StorageAdapter({
        setter: (name, val) => {
            storage.set(name, val);
        },
        getter: name => storage.get(name)
    });
    abTest = new AB_Test(experimentMap, storageAdapter);
});

describe("Provider", () => {
    test("Test draw childrens", () => {
        const text = "Test";
        const wrapper = render(
            <AB_Provider abTest={abTest}>
                <div>{text}</div>
            </AB_Provider>
        );

        expect(wrapper.text()).toEqual(text);
    });
});
