import "./CartSummary.css";
import { Link } from "react-router-dom";

export default function CartSummary({

    subtotal,

    totalItems,

}){

    return(

        <div className="cart-summary">

            <h4>

                Order Summary

            </h4>

            <hr/>

            <p>

                Items

                <span>

                    {totalItems}

                </span>

            </p>

            <p>

                Delivery

                <span>

                    FREE

                </span>

            </p>

            <h5>

                Total

                <span>

                    ₹{subtotal}

                </span>

            </h5>

            <Link

                to="/checkout"

                className="btn btn-success w-100"

            >

                Proceed To Checkout

            </Link>

        </div>

    );

}