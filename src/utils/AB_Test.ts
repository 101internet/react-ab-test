import { iExperiment, iVariant, iVariantSelect } from "../interfaces";
import { StorageAdapter } from "../adapters/storageAdapter";

export class AB_Test {
  selectedVariantsMap = [];
  storageAdapter: StorageAdapter;

  constructor(experiments: iExperiment[], storageAdapter: StorageAdapter) {
    this.storageAdapter = storageAdapter;

    experiments.forEach(experiment => {
      const selectedVariant = this.selectVariant(experiment.variants);

      const saveVariant: iVariantSelect = {
        experimentName: experiment.name,
        variant: selectedVariant
      };

      this.storageAdapter.addExperimentVariant(saveVariant);

      if (experiment.resolve && typeof experiment.resolve == "function") {
        experiment.resolve(saveVariant);
      }
    });
  }

  // Выбор варианта
  selectVariant(variants: iVariant[]): iVariant {
    const selectedVariant: iVariant = this.weightedRandom(
      variants,
      variants.map(v => v.weight)
    );

    return selectedVariant;
  }

  // Рандомный выбор по весу
  weightedRandom(values: any[], weights: number[]) {
    const totalWeight = weights.reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    const rnd = Math.floor(Math.random() * totalWeight);

    let n = 0;

    for (let i = 0; i < values.length; i++) {
      n += weights[i];
      if (n >= rnd) {
        return values[i];
      }
    }
  }

  // Получение варинта по имени эксперимента
  getVariant(experimentName: string) {
    return this.storageAdapter.getVariant(experimentName);
  }
}
