import { Link } from "react-router-dom";

import {

    FaWhatsapp,

    FaCheckCircle,

} from "react-icons/fa";

import "./SuccessCard.css";

export default function SuccessCard({

    order,

    whatsappUrl,

}){

    return(

        <div className="success-card">

            <FaCheckCircle

                className="success-icon"

            />

            <h2>

                Order Placed Successfully

            </h2>

            <p>

                Thank you for shopping with Rice Store.

            </p>

            <div className="order-box">

                <h4>

                    Order Details

                </h4>

                <p>

                    Order ID

                    <strong>

                        #{order.id}

                    </strong>

                </p>

                <p>

                    Amount

                    <strong>

                        ₹{order.total_amount}

                    </strong>

                </p>

                <p>

                    Payment

                    <strong>

                        Cash On Delivery

                    </strong>

                </p>

            </div>

            <div className="button-group">

                <a

                    href={whatsappUrl}

                    target="_blank"

                    rel="noreferrer"

                    className="btn btn-success"

                >

                    <FaWhatsapp/>

                    Contact on WhatsApp

                </a>

                <Link

                    to="/orders"

                    className="btn btn-outline-success"

                >

                    View Orders

                </Link>

                <Link

                    to="/products"

                    className="btn btn-dark"

                >

                    Continue Shopping

                </Link>

            </div>

        </div>

    );

}