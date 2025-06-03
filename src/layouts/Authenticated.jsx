import { Navigate, Outlet } from "react-router";
import { userStore } from "../zustand/store";

const Authenticated = () => {
  const { user } = userStore();
  if (user == null) {
    return <Navigate to={"/signup"} replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Authenticated;
