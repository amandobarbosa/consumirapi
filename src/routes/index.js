import React from "react";
import { Switch } from "react-router-dom";
import MyRoute from "./MyRoute";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";
import { toast } from "react-toastify";


export default function Routes() {
  toast.success('oie')
  return (
      <Switch>
        <MyRoute exact path="/" component={Login}/>
        <MyRoute path="*" component={Page404} />
      </Switch>
  );
}
