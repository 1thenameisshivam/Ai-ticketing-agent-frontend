import { useQuery } from "@tanstack/react-query";
import { getMe } from "../axios/api";
import { Outlet } from "react-router";
import useUserStore from "../zustand/store";
import { useEffect } from "react";

const Root = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.data);
    }
  }, [data, isSuccess, isError, setUser]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
