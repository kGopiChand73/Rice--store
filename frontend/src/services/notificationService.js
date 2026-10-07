import api from "./api";

export const getNotifications = () => {

    return api.get("/notifications/");

};

export const markAsRead = (id) => {

    return api.patch(

        `/notifications/${id}/`,

        {

            is_read: true,

        }

    );

};

export const markAllRead = () => {

    return api.post(

        "/notifications/read-all/"

    );

};