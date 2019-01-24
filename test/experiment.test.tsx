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
    test("without AB_Provider", () => {
        expect(() => {
            render(<Experiment name="MyExperiment" />);
        }).toThrow(/You should not use <Experiment> outside a <AB_Provider>/);
    });

    test("without experiment", () => {
        const text = "Test";
        const wrapper = render(
            <AB_Provider abTest={abTest}>
                <div>{text}</div>
            </AB_Provider>
        );

        expect(wrapper.text()).toEqual(text);
    });

    test("render Default variant", () => {
        const storage = new Storage();
        const storageAdapter = new StorageAdapter({
            setter: (name, val) => {
                storage.set(name, val);
            },
            getter: name => storage.get(name)
        });

        const variantSelect: iVariantSelect = {
            experimentName: "MyExperiment",
            variant: {
                name: "Default",
                weight: 1
            }
        };

        storageAdapter.addExperimentVariant(variantSelect);
        const abTest = new AB_Test(experimentMap, storageAdapter);

        const experimentName = "MyExperiment";
        let abContext: iContext = {};
        const location = createLocation("/test");
        const wrapper = render(
            <AB_Provider
                abTest={abTest}
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

        expect(wrapper.text()).toEqual("A");
    });

    test("render not default variant", () => {
        const storage = new Storage();
        const storageAdapter = new StorageAdapter({
            setter: (name, val) => {
                storage.set(name, val);
            },
            getter: name => storage.get(name)
        });
        const variantSelect: iVariantSelect = {
            experimentName: "MyExperiment",
            variant: {
                name: "B",
                weight: 2
            }
        };
        storageAdapter.addExperimentVariant(variantSelect);

        const abTest_ = new AB_Test(experimentMap, storageAdapter);

        const returnedContext = {
            statusCode: 302,
            queryPart: "MyExperiment=B"
        };

        const experimentName = "MyExperiment";
        let abContext: iContext = {};
        const wrapper = mount(
            <AB_Provider abTest={abTest_} context={abContext}>
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

        const selectedVariant = abTest_.storageAdapter.getVariant(
            experimentName
        );

        expect(wrapper.text()).toEqual("A");
        expect(selectedVariant).toEqual(variantSelect);
        expect(abContext).toEqual(returnedContext);
    });
});
