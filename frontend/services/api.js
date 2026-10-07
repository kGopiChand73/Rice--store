import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

// attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto-refresh on 401, retry original request once
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = localStorage.getItem("refresh");

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/refresh/",
          { refresh }
        );

        localStorage.setItem("access", data.access);
        api.defaults.headers.Authorization = `Bearer ${data.access}`;
        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        queue.forEach(({ resolve }) => resolve(data.access));
        queue = [];

        return api(originalRequest);
      } catch (refreshError) {
        queue.forEach(({ reject }) => reject(refreshError));
        queue = [];
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;