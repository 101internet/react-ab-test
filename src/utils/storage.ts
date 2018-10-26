import { iVariantSelect } from "../interfaces";

interface iStorageOptions {
  prefix: string;
}

export class Storage {
  prefix = "AB_";
  selectedVariantsMap: iVariantSelect[] = [];

  constructor(options: iStorageOptions) {
    if (options && !!options.prefix) this.prefix = options.prefix;
  }

  add(variant: iVariantSelect) {
    this.selectedVariantsMap.push(variant);
  }

  getSaveName(experimentName: string) {
    return `${this.prefix}${experimentName}`;
  }

  getVariant(experimentName: string): iVariantSelect | undefined {
    const variant = this.selectedVariantsMap.find(
      v => v.experimentName == experimentName
    );

    return variant;
  }
}
