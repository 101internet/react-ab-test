import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Foo } from "./foo";
import { Bar } from "./bar";
export class MyApplication extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/foo">foo</Link>
          </li>
          <li>
            <Link to="/bar">bar</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/foo" component={Foo} />
          <Route path="/bar" component={Bar} />
          <Route path="/" />
        </Switch>
      </div>
    );
  }
}
