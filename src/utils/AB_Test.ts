import { iExperiment, iVariant, iVariantSelect } from "../interfaces";
import { StorageAdapter } from "../adapters/storageAdapter";

export class AB_Test {
  selectedVariantsMap = [];
  storageAdapter: StorageAdapter;

  constructor(experiments: iExperiment[], storageAdapter: StorageAdapter) {
    this.storageAdapter = storageAdapter;

    experiments.forEach(experiment => {
      const selectedVariant = this.selectVariant(
        experiment.variants,
        experiment.name
      );
      this.storageAdapter.addExperimentVariant(selectedVariant);
    });
  }

  // Выбор варианта
  selectVariant(variants: iVariant[], experimentName: string): iVariantSelect {
    const selectedVariant = this.weightedRandom(
      variants,
      variants.map(v => v.weight)
    );

    return {
      variant: selectedVariant,
      experimentName: experimentName
    };
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
