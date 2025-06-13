import { Navigate, Outlet, useNavigate } from "react-router";
import userStore from "../zustand/store";
import { useEffect } from "react";

const NonAuth = () => {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
