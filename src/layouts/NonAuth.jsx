import React from "react";
import { Navigate, Outlet } from "react-router";
import { userStore } from "../zustand/store";

const NonAuth = () => {
  const { user } = userStore();
  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
