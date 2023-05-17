import React from "react";
import { Navigate } from "react-router-dom";
import { checkCookieExistence } from "./components/Api/loginApi";

const PrivateRoute = ({ children }) => {
  if (!checkCookieExistence()) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/`} />;
  }
  return children;
};

export default PrivateRoute;
