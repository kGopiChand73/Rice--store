import api from "./api";

export const getOrders=(params={})=>{

    return api.get(

        "orders/",

        {

            params,

        }

    );

};

export const getOrder=(id)=>{

    return api.get(

        `orders/${id}/`

    );

};

export const getOrderDetails = getOrder;

export const checkout = (addressId) => {

    return api.post(

        "orders/checkout/",

        {

            address_id: addressId,

        }

    );

};

export const cancelOrder = (id) => {

    return api.post(

        `orders/${id}/cancel/`

    );

};

export const updateOrderStatus=(

    id,

    status,

)=>{

    return api.patch(

        `orders/${id}/`,

        {

            status,

        }

    );

};