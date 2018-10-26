import React from "react";
import { Consumer } from "../utils/createContext";
import { AB_Test } from "../utils/AB_Test";
import { iReactVariant, iVariantSelect } from "../interfaces";
export interface SnackProps {
  name: string;
}

export class Experiment extends React.Component<SnackProps> {
  render() {
    const { children, name: experimentName } = this.props;
    return (
      <Consumer>
        {(value: AB_Test) => {
          const selectedVariant: iVariantSelect | undefined = value.getVariant(
            experimentName
          );

          if (selectedVariant != undefined) {
            const arrayChild = React.Children.toArray(
              children
            ) as React.ReactElement<iReactVariant>[];
            const renderChild = arrayChild.find(
              o => o.props.name == selectedVariant.variant.name
            );

            return renderChild;
          } else {
            return null;
          }
        }}
      </Consumer>
    );
  }
}
