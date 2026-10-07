import { useState } from "react";

import toast from "react-hot-toast";

import {

    cancelOrder,

} from "../../services/orderService";

import OrderDetailsModal from "./OrderDetailsModal";

import "./OrderCard.css";

export default function OrderCard({

    order,

    refreshOrders,

}){

    const[show,setShow]=useState(false);

    async function handleCancel(){

        if(

            !window.confirm(

                "Cancel this order?"

            )

        ) return;

        try{

            await cancelOrder(order.id);

            toast.success(

                "Order cancelled."

            );

            refreshOrders();

        }

        catch{

            toast.error(

                "Unable to cancel."

            );

        }

    }

    const statusKey=order.status.toLowerCase();

    return(

        <>

            <div className="order-card">

                <div className="order-top">

                    <div>

                        <h5>

                            Order #{order.id}

                        </h5>

                        <small>

                            {order.created_at}

                        </small>

                    </div>

                    <span

                        className={`status-badge status-${statusKey}`}

                    >

                        {order.status}

                    </span>

                </div>

                <div className="order-middle">

                    <div>

                        <span className="order-total-label">Total</span>

                        <strong className="order-total">

                            ₹{order.total_amount}

                        </strong>

                    </div>

                    <span className="order-payment-tag">

                        {order.payment_method}

                    </span>

                </div>

                <div className="order-actions">

                    <button

                        className="btn-order btn-order--outline"

                        onClick={()=>setShow(true)}

                    >

                        View Details

                    </button>

                    {

                        order.status==="Pending"&&(

                            <button

                                className="btn-order btn-order--danger"

                                onClick={handleCancel}

                            >

                                Cancel Order

                            </button>

                        )

                    }

                </div>

            </div>

            {

                show&&(

                    <OrderDetailsModal

                        orderId={order.id}

                        onClose={()=>setShow(false)}

                    />

                )

            }

        </>

    );

}