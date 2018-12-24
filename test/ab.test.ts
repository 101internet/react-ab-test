import { AB_Test, StorageAdapter } from "../src";
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
beforeEach(() => {
    storage = new Storage();
    storageAdapter = new StorageAdapter({
        setter: (name, val) => {
            storage.set(name, val);
        },
        getter: name => storage.get(name)
    });
});

describe("AB_Test", () => {
    test("set in storage variant", () => {
        storage.set("AB_MyExperiment", '{"name":"B","weight":7}');
        const abTest = new AB_Test(experimentMap, storageAdapter);

        expect(storage.store).toHaveProperty(
            "AB_MyExperiment",
            '{"name":"B","weight":7}'
        );
    });

    test("get variant with name", () => {
        const abTest = new AB_Test(experimentMap, storageAdapter);
        const variant = abTest.getVariant("Default");
        if (variant) {
            expect(variant.variant.name).toEqual("Default");
        } else {
            expect(variant).toEqual(undefined);
        }
    });

    test("get variant without name `Default`", () => {
        const abTest = new AB_Test(experimentMap, storageAdapter);
        const variant = abTest.getVariant();
        if (variant) {
            expect(variant.variant.name).toEqual("Default");
        } else {
            expect(variant).toEqual(undefined);
        }
    });

    test("get variant by incorrect name `Default`", () => {
        const abTest = new AB_Test(experimentMap, storageAdapter);
        const variant = abTest.getVariant("incorrect");
        if (variant) {
            expect(variant.variant.name).toEqual("Default");
        } else {
            expect(variant).toEqual(undefined);
        }
    });
});
