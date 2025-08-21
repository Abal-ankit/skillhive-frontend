import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContextProvider";
import Login from "./Login";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const { userName } = useContext(GlobalContext);
  return <div>{userName ? <Outlet /> : <Login />}</div>;
}

export default AuthLayout;
