import { Storage } from "../src/utils/storage";
import { iVariantSelect } from "../src/interfaces";

describe("storage", () => {
    test("add variant in storage", () => {
        const storage = new Storage();

        const variantSelect: iVariantSelect = {
            experimentName: "MyTest",
            variant: {
                name: "A",
                weight: 20
            }
        };
        storage.add(variantSelect);

        expect(storage.selectedVariantsMap[0]).toEqual(variantSelect);
    });

    test("get Experiment name for save in storage with prefix", () => {
        expect(2);
        const storage = new Storage();
        const storage_2 = new Storage({
            prefix: "PREFIX_"
        });

        storage.getSaveName("experiment"); // AB_experiment
        storage_2.getSaveName("experiment"); // PREFIX_experiment

        expect(storage.getSaveName("experiment")).toEqual("AB_experiment");
        expect(storage_2.getSaveName("experiment")).toEqual(
            "PREFIX_experiment"
        );
    });

    test("getVariant with existing experiment", () => {
        const storage = new Storage();

        const variantSelect: iVariantSelect = {
            experimentName: "MyTest",
            variant: {
                name: "A",
                weight: 20
            }
        };
        storage.add(variantSelect);

        expect(storage.getVariant(variantSelect.experimentName)).toEqual(
            variantSelect
        );
    });

    test("getVariant without existing experiment", () => {
        const storage = new Storage();

        const variantSelect: iVariantSelect = {
            experimentName: "MyTest",
            variant: {
                name: "A",
                weight: 20
            }
        };
        storage.add(variantSelect);

        expect(storage.getVariant("experimentNotExist")).toEqual(undefined);
    });
});
