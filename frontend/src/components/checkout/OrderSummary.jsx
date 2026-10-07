import { useCart } from "../../hooks/useCart";

import Button from "../common/Button/Button";

import "./OrderSummary.css";

export default function OrderSummary({

    onPlaceOrder,

    loading,

}){

    const{

        cart,

    }=useCart();

    if(!cart){

        return null;

    }

    return(

        <div className="summary-card">

            <h4>

                Order Summary

            </h4>

            <hr/>

            {

                cart.items.map(item=>(

                    <div

                        key={item.id}

                        className="summary-item"

                    >

                        <span>

                            {item.product.name}

                            ×

                            {item.quantity}

                        </span>

                        <span>

                            ₹{item.subtotal}

                        </span>

                    </div>

                ))

            }

            <hr/>

            <div className="summary-item">

                <strong>Total</strong>

                <strong>

                    ₹{cart.total_price}

                </strong>

            </div>

            <div className="payment-box">

                <strong>

                    Payment

                </strong>

                <p>

                    Cash On Delivery

                </p>

            </div>

            <Button

                loading={loading}

                onClick={onPlaceOrder}

            >

                Place Order

            </Button>

        </div>

    );

}