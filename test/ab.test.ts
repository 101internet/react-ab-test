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
        name: "A",
        weight: 3
      },
      {
        name: "B",
        weight: 7
      }
    ],
    resolve: (variant: iVariantSelect) => {
      //   console.log("Selected variant --->", variant);
    }
  }
];

describe("AB_Test", () => {
  test("set in storage variant", () => {
    const storage = new Storage();
    storage.set("AB_MyExperiment", '{"name":"B","weight":7}');

    const storageAdapter = new StorageAdapter({
      setter: (name, val) => {
        storage.set(name, val);
      },
      getter: name => storage.get(name)
    });

    const abTest = new AB_Test(experimentMap, storageAdapter);

    expect(storage.store).toHaveProperty(
      "AB_MyExperiment",
      '{"name":"B","weight":7}'
    );
  });
});
