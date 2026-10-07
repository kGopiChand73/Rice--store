import api from "./api";

export const getAddresses = () => {

    return api.get("auth/addresses/");

};

export const createAddress = (data) => {

    return api.post("auth/addresses/", data);

};

export const updateAddress = (id, data) => {

    return api.put(`auth/addresses/${id}/`, data);

};

export const deleteAddress = (id) => {

    return api.delete(`auth/addresses/${id}/`);

};