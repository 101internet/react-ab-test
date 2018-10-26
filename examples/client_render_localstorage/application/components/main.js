import React from "react";
import { Experiment, Variant } from "../../../../dist";
export class MyApplication extends React.Component {
  render() {
    return (
      <div>
        <Experiment name="MyExperiment">
          <Variant name="A">
            <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
          </Variant>
          <Variant name="B">
            <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
          </Variant>
          <Variant name="C">
            <div>CCCCCCCCCCCCCCCCCCCCCCCC</div>
          </Variant>
        </Experiment>
      </div>
    );
  }
}
