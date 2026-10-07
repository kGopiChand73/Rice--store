import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCart } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadCart() {

        const token = localStorage.getItem("access");

        if (!token) {
            setCart(null);
            setLoading(false);
            return;
        }

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

    useEffect(() => {

        loadCart();

        // Re-check cart whenever auth state changes elsewhere in the app
        function handleAuthChange() {
            loadCart();
        }

        window.addEventListener("auth-changed", handleAuthChange);

        return () => {
            window.removeEventListener("auth-changed", handleAuthChange);
        };

    }, []);

    return (

        <CartContext.Provider

            value={{
                cart,
                setCart,
                loadCart,
                loading,
            }}

        >
            {children}
        </CartContext.Provider>

    );

}

export function useCart() {
    return useContext(CartContext);
}