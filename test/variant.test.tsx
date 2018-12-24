import * as React from "react";
import { render } from "enzyme";
import { Variant } from "../src/components/variant";

describe("Variant", () => {
    test("render simpe variant", () => {
        const wrapper = render(
            <Variant name="Default">
                <div id="mainVariant">123</div>
            </Variant>
        );

        expect(wrapper.attr("id")).toEqual("mainVariant");
    });
});
