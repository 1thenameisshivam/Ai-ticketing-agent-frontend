import { Navigate, Outlet, useNavigate } from "react-router";
import { userStore } from "../zustand/store";

const Authenticated = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  if (user == null) {
    navigate("/login");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Authenticated;
