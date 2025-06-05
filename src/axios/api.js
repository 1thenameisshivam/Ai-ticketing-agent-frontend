import { api } from "./http";

export const getSignUp = (userData) => api.post("/users/signup", userData);
export const getLogin = (userData) => api.post("/users/login", userData);
export const getMe = () => api.get("/users/me");
export const getAllUser = () => api.get("/users/allUsers");
export const updateUser = (userData) => api.patch("/users/update", userData);
export const getLogout = () => api.get("/users/logout");
export const createTicket = (ticketData) => api.post("/tickets", ticketData);
export const getTickets = () => api.get("/tickets");
