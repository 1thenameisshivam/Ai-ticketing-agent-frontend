import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import userStore from "../zustand/store";

const Authenticated = () => {
  const { user, setUser } = userStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/users/me",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          navigate("/non-auth/login", { replace: true });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/non-auth/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate, setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Authenticated;
