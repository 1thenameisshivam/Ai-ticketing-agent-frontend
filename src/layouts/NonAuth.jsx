import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { userStore } from "../zustand/store";

const NonAuth = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  if (user !== null) {
    navigate("/");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
