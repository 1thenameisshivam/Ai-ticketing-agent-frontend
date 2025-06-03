import { useQuery } from "@tanstack/react-query";
import { getMe } from "../axios/api";
import { Outlet } from "react-router";
import { userStore } from "../zustand/store";
import { useEffect } from "react";

const Root = () => {
  const { setUser } = userStore();
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.data);
    }
  }, [data, setUser, isError, isSuccess]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
