import React from "react";
import Home from "./core/Home";
import { Route, Switch } from "react-router";
import PrivateRoute from "./auth/PrivateRoute";
import Register from "./user/Register";
import Signin from "./user/Signin";
import Final from "./user/Final";

export default function MainRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute path="/final" component={Final} />
      </Switch>
    </div>
  );
}
