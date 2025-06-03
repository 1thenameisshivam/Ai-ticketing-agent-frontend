import { api } from "./http";

export const getSignUp = (userData) => api.post("/users/signup", userData);
export const getMe = () => api.get("/users/me");
