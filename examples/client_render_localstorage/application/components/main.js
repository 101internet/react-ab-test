import React from "react";
import { Experiment, Variant } from "../../../../dist";
export class MyApplication extends React.Component {
    render() {
        return (
            <div>
                <Experiment name="MyExperiment">
                    <Variant name="Default">
                        <div>AAAAAAAAAAAAAAAAAAAAAAAA</div>
                    </Variant>
                    <Variant name="B">
                        <div>BBBBBBBBBBBBBBBBBBBBBBBB</div>
                    </Variant>
                </Experiment>
            </div>
        );
    }
}
