import React from "react";
import { Experiment, Variant } from "../../../../dist";

export const Bar = () => (
  <Experiment name="MyExperiment2">
    <Variant name="Default">
      <div>AAAAAAAAAAAAAAAAAAAAAAAA2</div>
    </Variant>
    <Variant name="B">
      <div>BBBBBBBBBBBBBBBBBBBBBBBB2</div>
    </Variant>
  </Experiment>
);
