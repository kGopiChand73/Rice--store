import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/v1/`,
    timeout: 30000,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => {
        const payload = response.data;

        if (
            payload &&
            typeof payload === "object" &&
            "data" in payload &&
            "success" in payload
        ) {
            response.data = payload.data;
        }

        return response;
    },
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        }

        return Promise.reject(error);
    }
);

export default api;