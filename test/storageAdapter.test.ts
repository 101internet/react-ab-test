import { StorageAdapter } from "../src/adapters/storageAdapter";
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

describe("storageAdapter", () => {
  test("called setter/getter", () => {
    expect(2);
    const setterMock = jest.fn();
    const getterMock = jest.fn();

    const storageAdapter = new StorageAdapter({
      getter: getterMock,
      setter: setterMock
    });

    const variantSelect: iVariantSelect = {
      experimentName: "MyTest",
      variant: {
        name: "A",
        weight: 20
      }
    };

    storageAdapter.addExperimentVariant(variantSelect);
    storageAdapter.restoreExperimentVariant(variantSelect.experimentName);

    expect(setterMock).toHaveBeenCalled();
    expect(getterMock).toHaveBeenCalled();
  });

  test("save and restore variant", () => {
    const storage = new Storage();

    const storageAdapter = new StorageAdapter({
      getter: name => storage.get(name),
      setter: (name, value) => storage.set(name, value)
    });

    const variantSelect: iVariantSelect = {
      experimentName: "MyTest",
      variant: {
        name: "A",
        weight: 20
      }
    };

    storageAdapter.addExperimentVariant(variantSelect);
    const restoredVariant = storageAdapter.restoreExperimentVariant(
      variantSelect.experimentName
    );

    expect(restoredVariant).toEqual(variantSelect.variant);
  });
});
