import * as React from "react";
import { iReactVariant } from "../interfaces";

export const Variant: React.SFC<iReactVariant> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};
