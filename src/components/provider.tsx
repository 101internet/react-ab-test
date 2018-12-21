import * as React from "react";
import { Provider } from "../utils/createContext";
import { AB_Test } from "../utils/AB_Test";
import { History, Location } from "history";

interface ABProps {
  children: React.ReactChildren;
  abTest: AB_Test;
  history?: History;
  context?: any;
  location?: Location;
}

const AB_Provider: React.SFC<ABProps> = ({
  abTest,
  context,
  history,
  location,
  children
}) => {
  return (
    <Provider
      value={{
        abTest: abTest,
        context: context,
        history: history,
        location: location
      }}
    >
      {children}
    </Provider>
  );
};

export { AB_Provider };
