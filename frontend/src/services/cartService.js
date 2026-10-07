import api from "./api";

export const getCart = () => {

    return api.get("cart/");

};

export const addToCart = (

    productId,

    quantity

)=>{

    return api.post(

        "cart/add/",

        {

            product_id: productId,

            quantity,

        }

    );

};

export const updateCartItem=(

    id,

    quantity

)=>{

    return api.put(

        `cart/item/${id}/`,

        {

            quantity,

        }

    );

};

export const removeCartItem=(id)=>{

    return api.delete(

        `cart/item/${id}/delete/`

    );

};