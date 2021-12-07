import React from "react";
import Home from "./core/Home";
import { Route, Switch } from "react-router";
import PrivateRoute from "./auth/PrivateRoute";
import Register from "./user/Register";
import Signin from "./user/Signin";
import Final from "./user/Final";
import { Router, Routes } from "react-router-dom";

export default function MainRouter() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </div>
  );
}
