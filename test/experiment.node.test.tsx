/**
 * @jest-environment node
 */
import * as React from "react";
import { render, mount } from "enzyme";
import { Variant } from "../src/components/variant";
import { AB_Provider, StorageAdapter, AB_Test, Experiment } from "../src";
import { iVariantSelect, iContext } from "../src/interfaces";
import { createLocation } from "history";

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
                weight: 1
            },
            {
                name: "B",
                weight: 2
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

describe("Experiment", () => {
    test("without location", () => {
        const storage = new Storage();
        const storageAdapter = new StorageAdapter({
            setter: (name, val) => {
                storage.set(name, val);
            },
            getter: name => storage.get(name)
        });

        const abTest = new AB_Test(experimentMap, storageAdapter);

        const experimentName = "MyExperiment";
        let abContext: iContext = {};

        expect(() => {
            render(
                <AB_Provider abTest={abTest} context={abContext}>
                    <Experiment name={experimentName}>
                        <Variant name="Default">
                            <div>A</div>
                        </Variant>
                        <Variant name="B">
                            <div>B</div>
                        </Variant>
                    </Experiment>
                </AB_Provider>
            );
        }).toThrow(
            /Location not defined, use createLocation from package History and set this on AB_Provider/
        );
    });

    test("render Default variant after not default", () => {
        const storage = new Storage();
        const storageAdapter = new StorageAdapter({
            setter: (name, val) => {
                storage.set(name, val);
            },
            getter: name => storage.get(name)
        });

        // { statusCode: 302, queryPart: '' }
        const variantSelect: iVariantSelect = {
            experimentName: "MyExperiment",
            variant: {
                name: "Default",
                weight: 1
            }
        };
        const returnedContext = {
            statusCode: 302,
            queryPart: ""
        };
        storageAdapter.addExperimentVariant(variantSelect);
        const abTest_ = new AB_Test(experimentMap, storageAdapter);
        const experimentName = "MyExperiment";
        let abContext: iContext = {};
        const location = createLocation("/test?MyExperiment=B");
        const wrapper = render(
            <AB_Provider
                abTest={abTest_}
                context={abContext}
                location={location}
            >
                <Experiment name={experimentName}>
                    <Variant name="Default">
                        <div>A</div>
                    </Variant>
                    <Variant name="B">
                        <div>B</div>
                    </Variant>
                </Experiment>
            </AB_Provider>
        );

        expect(abContext).toEqual(returnedContext);
    });
});
