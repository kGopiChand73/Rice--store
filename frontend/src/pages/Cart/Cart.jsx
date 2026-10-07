import { useEffect, useState } from "react";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

import {
    getCart,
    updateCartItem,
    removeCartItem,
} from "../../services/cartService";

import "./Cart.css";

export default function Cart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCart();

    }, []);

    async function loadCart() {

        try {

            const response = await getCart();

            const data = response.data?.data || response.data;

            setCart(data);

        }

        catch (error) {

            console.log(error);

            setCart(null);

        }

        finally {

            setLoading(false);

        }

    }

    async function increase(item) {

        await updateCartItem(
            item.id,
            item.quantity + 1
        );

        loadCart();

    }

    async function decrease(item) {

        if (item.quantity === 1)
            return;

        await updateCartItem(
            item.id,
            item.quantity - 1
        );

        loadCart();

    }

    async function remove(id) {

        await removeCartItem(id);

        loadCart();

    }

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    if (!cart || !cart.items || cart.items.length === 0) {

        return <EmptyCart />;

    }

    return (

        <div className="container py-5">

            <h2 className="cart-title">

                Shopping Cart

            </h2>

            <div className="row">

                <div className="col-lg-8">

                    {

                        cart.items.map(item => (

                            <CartItem

                                key={item.id}

                                item={item}

                                onIncrease={increase}

                                onDecrease={decrease}

                                onRemove={remove}

                            />

                        ))

                    }

                </div>

                <div className="col-lg-4">

                    <CartSummary

                        subtotal={cart.total}

                        totalItems={cart.total_items}

                    />

                </div>

            </div>

        </div>

    );

}