import { Link } from "react-router-dom";

import "./EmptyCart.css";

export default function EmptyCart(){

    return(

        <div className="empty-cart">

            <h2>

                Your Cart is Empty

            </h2>

            <p>

                Add some delicious rice products.

            </p>

            <Link

                to="/products"

                className="btn btn-success"

            >

                Shop Now

            </Link>

        </div>

    );

}