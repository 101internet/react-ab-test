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
  resolve?: () => {};
}

export interface iReactVariant {
  name: string;
}
