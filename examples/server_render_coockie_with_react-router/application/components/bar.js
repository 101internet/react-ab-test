import React from "react";
import { Experiment, Variant } from "../../../../dist";

export const Bar = () => (
    <React.Fragment>
        <Experiment name="MyExperiment2">
            <Variant name="Default">
                <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
            </Variant>
            <Variant name="B">
                <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
            </Variant>
        </Experiment>
        <hr />
        <Experiment name="MyExperiment">
            <Variant name="Default">
                <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
            </Variant>
            <Variant name="B">
                <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
            </Variant>
        </Experiment>
    </React.Fragment>
);
