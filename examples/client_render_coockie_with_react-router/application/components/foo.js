import React from "react";
import { Experiment, Variant } from "../../../../dist";

export const Foo = () => {
  return (
    <Experiment name="MyExperiment">
      <Variant name="Default">
        <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
      </Variant>
      <Variant name="B">
        <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
      </Variant>
    </Experiment>
  );
};
