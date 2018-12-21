import React from "react";
import { Consumer } from "../utils/createContext";
import { AB_Test } from "../utils/AB_Test";
import { iReactVariant, iVariantSelect } from "../interfaces";
import queryString from "query-string";
import { History, Location } from "history";
export interface SnackProps {
  name: string;
}

export class Experiment extends React.Component<SnackProps> {
  redirector(redirectQuery: string, abTest: AB_Test, history: History) {
    if (typeof window != "undefined") {
      if (history) {
        history.replace({
          search: redirectQuery
        });
      } else {
        window.location.search = redirectQuery;
      }
    }
  }

  render() {
    const { children, name: experimentName } = this.props;
    return (
      <Consumer>
        {(value: {
          abTest: AB_Test;
          context: any;
          history: History;
          location: Location;
        }) => {
          const selectedVariant:
            | iVariantSelect
            | undefined = value.abTest.getVariant(experimentName);

          if (selectedVariant != undefined) {
            const arrayChild = React.Children.toArray(
              children
            ) as React.ReactElement<iReactVariant>[];

            let renderChild = arrayChild.find(
              o => o.props.name == selectedVariant.variant.name
            );

            // Проверяем правильность URL
            let redirectQuery = "";
            let isRedirect = false;

            let location = null;
            if (value.location) {
              location = value.location;
            } else if (typeof window != "undefined") {
              location = window.location;
            } else {
              throw new Error(
                "Location not defined, use createLocation from package History and set this on AB_Provider"
              );
            }

            const parsed = queryString.parse(location.search);
            if (selectedVariant.variant.name != "Default") {
              if (value.context) {
                value.context.isCanonical = true;
              }

              if (
                !(selectedVariant.experimentName in parsed) ||
                parsed[selectedVariant.experimentName] !=
                  selectedVariant.variant.name
              ) {
                parsed[selectedVariant.experimentName] =
                  selectedVariant.variant.name;
                renderChild = arrayChild.find(o => o.props.name == "Default");
                isRedirect = true;
                redirectQuery = queryString.stringify(parsed);
              }
            } else {
              if (selectedVariant.experimentName in parsed) {
                delete parsed[selectedVariant.experimentName];
                isRedirect = true;
                redirectQuery = queryString.stringify(parsed);
              }
            }

            if (isRedirect) {
              if (value.context) {
                value.context.statusCode = 302;
                value.context.queryPart = redirectQuery;
              }
              return (
                <Lifecycle
                  onMount={() => {
                    this.redirector(redirectQuery, value.abTest, value.history);
                  }}
                >
                  {renderChild}
                </Lifecycle>
              );
            } else {
              return renderChild;
            }
          } else {
            return null;
          }
        }}
      </Consumer>
    );
  }
}

class Lifecycle extends React.Component<any> {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  render() {
    return this.props.children;
  }
}
