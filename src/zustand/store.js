import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const userStore = create(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) =>
        set(() => ({
          user: user,
        })),
      clearUser: () =>
        set(() => ({
          user: null,
        })),
    }),
    { name: "userStore" }
  )
);
