import * as React from "react";
import { Provider } from "../utils/createContext";
import { AB_Test } from "../utils/AB_Test";

interface ABProps {
  children: React.ReactChildren;
  abTest: AB_Test;
}

const AB_Provider: React.SFC<ABProps> = ({ abTest, children }) => {
  return <Provider value={abTest}>{children}</Provider>;
};

export { AB_Provider };
