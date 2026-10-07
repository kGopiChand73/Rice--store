import api from "./api";

export const login = (username, password) => {

    return api.post("auth/login/", {

        username,

        password,

    });

};

export const register = (data) => {

    return api.post("auth/register/", data);

};

export const getProfile = () => {

    return api.get("auth/profile/");

};