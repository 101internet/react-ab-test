import { Storage } from "../utils/storage";
import { iVariantSelect } from "../interfaces";

interface iGetter {
  (name: string): string;
}

interface iSetter {
  (name: string, val: string): void;
}

interface iStorageAdapterOptions {
  prefix: string;
  getter: iGetter;
  setter: iSetter;
}

export class StorageAdapter extends Storage {
  getItem: iGetter;
  setItem: iSetter;

  constructor(options: iStorageAdapterOptions) {
    super(options);
    this.getItem = options.getter;
    this.setItem = options.setter;
  }

  restoreExperimentVariant(experimentName: string) {
    const experiment = this.getItem(this.getSaveName(experimentName));

    if (experiment || experiment !== undefined) {
      return JSON.parse(experiment);
    } else {
      return null;
    }
  }

  addExperimentVariant(variant: iVariantSelect) {
    const restoreVariant = this.restoreExperimentVariant(
      variant.experimentName
    );

    if (restoreVariant) {
      variant.variant = restoreVariant;
    } else {
      this.setItem(
        this.getSaveName(variant.experimentName),
        JSON.stringify(variant.variant)
      );
    }

    this.add(variant);
  }
}
