import api from "./api";

export const login = (username, password) =>
  api.post("/auth/login/", { username, password });

export const register = (data) =>
  api.post("/auth/register/", data);

export const getProfile = () =>
  api.get("/auth/profile/");

export const refreshToken = (refresh) =>
  api.post("/auth/refresh/", { refresh });