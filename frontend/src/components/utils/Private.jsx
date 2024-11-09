import React from "react";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  let auth = localStorage.getItem("token");

  // If token exists, render the children
  return auth ? children : <Navigate to="/" />;
};

export default Private;
