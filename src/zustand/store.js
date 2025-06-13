import { create } from "zustand";
import { devtools } from "zustand/middleware";

const userStore = create(
  devtools((set) => ({
    user: null,
    loadingUser: true,
    setUser: (user) =>
      set(() => ({
        user: user,
        loadingUser: false,
      })),
    clearUser: () =>
      set(() => ({
        user: null,
        loadingUser: false,
      })),
  }))
);

export default userStore;
