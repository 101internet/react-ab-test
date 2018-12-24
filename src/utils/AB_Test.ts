import { iExperiment, iVariant, iVariantSelect } from "../interfaces";
import { StorageAdapter } from "../adapters/storageAdapter";
import invariant from "invariant";

export class AB_Test {
    selectedVariantsMap = [];
    storageAdapter: StorageAdapter;
    forceRefresh = true;

    constructor(experiments: iExperiment[], storageAdapter: StorageAdapter) {
        this.storageAdapter = storageAdapter;
        experiments.forEach(experiment => {
            let selectedVariant: iVariant;

            const restoredVariant = this.storageAdapter.restoreExperimentVariant(
                experiment.name
            );

            if (
                restoredVariant === null ||
                !experiment.variants.find(
                    variant => variant.name == restoredVariant.name
                )
            ) {
                selectedVariant = this.selectVariant(experiment.variants);
            } else {
                selectedVariant = restoredVariant;
            }

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
        variants.sort((a, b) => a.weight - b.weight);
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

        const rnd = Math.random() * totalWeight;

        let n = 0;

        for (let i = 0; i < values.length; i++) {
            n += weights[i];
            if (n >= rnd) {
                return values[i];
            }
        }
    }

    // Получение варинта по имени эксперимента
    getVariant(experimentName?: string) {
        // TODO maybe select first in list variants, or append <VariantDefault>
        if (!experimentName) {
            experimentName = "Default";
        }

        let selectedVariant = this.storageAdapter.getVariant(experimentName);

        return selectedVariant;
    }
}
