import React from "react";
import { Consumer } from "../utils/createContext";
import { AB_Test } from "../utils/AB_Test";
import { iReactVariant, iVariantSelect, iContext } from "../interfaces";
import queryString from "query-string";
import { History, Location } from "history";
import invariant from "invariant";
export interface SnackProps {
    name: string;
}

export class Experiment extends React.Component<SnackProps> {
    redirector(redirectQuery: string, history: History) {
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
                    context: iContext;
                    history: History;
                    location: Location;
                }) => {
                    invariant(
                        value.abTest,
                        "You should not use <Experiment> outside a <AB_Provider>"
                    );

                    const selectedVariant:
                        | iVariantSelect
                        | undefined = value.abTest.getVariant(experimentName);

                    //TODO проверить на правильность
                    if (selectedVariant == undefined) {
                        return null;
                    }

                    const arrayChild = React.Children.toArray(
                        children
                    ) as React.ReactElement<iReactVariant>[];

                    let renderChild = arrayChild.find(
                        o => o.props.name == selectedVariant.variant.name
                    );

                    // Проверяем правильность URL
                    let redirectQuery = "";
                    let isRedirect = false;
                    let location: any = null;

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
                        if (
                            !(selectedVariant.experimentName in parsed) ||
                            parsed[selectedVariant.experimentName] !=
                                selectedVariant.variant.name
                        ) {
                            parsed[selectedVariant.experimentName] =
                                selectedVariant.variant.name;
                            renderChild = arrayChild.find(
                                o => o.props.name == "Default"
                            );
                            isRedirect = true;
                            redirectQuery = queryString.stringify(parsed);
                        } else {
                            if (value.context) {
                                value.context.isCanonical = true;
                            }
                        }
                    } else {
                        if (selectedVariant.experimentName in parsed) {
                            delete parsed[selectedVariant.experimentName];
                            isRedirect = true;
                            redirectQuery = queryString.stringify(parsed);

                            if (value.context) {
                                value.context.isCanonical = true;
                            }
                        }
                    }

                    if (isRedirect) {
                        if (value.context) {
                            value.context.statusCode = 302;
                            value.context.queryPart = redirectQuery;
                        }
                        return (
                            <Lifecycle
                                path={redirectQuery}
                                onMount={() => {
                                    this.redirector(
                                        redirectQuery,
                                        value.history
                                    );
                                }}
                                onUpdate={(self: any, prevProps: any) => {
                                    this.redirector(
                                        self.props.path,
                                        value.history
                                    );
                                }}
                            >
                                {renderChild}
                            </Lifecycle>
                        );
                    } else {
                        return renderChild;
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

    componentDidUpdate(prevProps: any) {
        if (this.props.onUpdate)
            this.props.onUpdate.call(this, this, prevProps);
    }

    render() {
        return this.props.children;
    }
}
