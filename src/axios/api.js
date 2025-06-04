import { api } from "./http";

export const getSignUp = (userData) => api.post("/users/signup", userData);
export const getLogin = (userData) => api.post("/users/login", userData);
export const getMe = () => api.get("/users/me");
export const getLogout = () => api.get("/users/logout");
