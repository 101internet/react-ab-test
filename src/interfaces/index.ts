export interface iVariant {
    name: string;
    weight: number;
}

export interface iVariantSelect {
    experimentName: string;
    variant: iVariant;
}

export interface iExperiment {
    name: string;
    variants: iVariant[];
    resolve?(variant: iVariantSelect): void;
}

export interface iReactVariant {
    name: string;
}

export interface iContext {
    isCanonical?: boolean;
    statusCode?: number;
    queryPart?: string;
}
