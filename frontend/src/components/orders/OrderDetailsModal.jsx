import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    getOrderDetails,
} from "../../services/orderService";

import OrderTimeline from "./OrderTimeline";

import "./OrderDetailsModal.css";

export default function OrderDetailsModal({
    orderId,
    onClose,
}){

    const[order,setOrder]=useState(null);

    useEffect(()=>{

        async function loadOrder(){
            try{
                const response=
                await getOrderDetails(orderId);
                setOrder(response.data);
            }
            catch{
                toast.error(
                    "Unable to load order."
                );
            }
        }

        loadOrder();

    },[orderId]);

    if(!order){
        return(
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-card modal-card--loading" onClick={e=>e.stopPropagation()}>
                    <div className="spinner-border text-success"/>
                    <p>Loading order…</p>
                </div>
            </div>
        );
    }

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e=>e.stopPropagation()}>

                <div className="modal-header">
                    <div>
                        <span className="modal-kicker">Order Details</span>
                        <h3>
                            Order #{order.id}
                        </h3>
                    </div>
                    <button
                        type="button"
                        className="btn-close-modal"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                <div className="modal-section">

                    <h5 className="modal-section-title">Products</h5>

                    <div className="product-list">

                        {
                            order.items?.map(item=>(
                                <div
                                    key={item.id}
                                    className="product-row"
                                >
                                    <div className="product-info">
                                        <strong>
                                            {item.product?.name ?? "Unknown product"}
                                        </strong>
                                        <span className="product-qty">
                                            Qty {item.quantity}
                                        </span>
                                    </div>
                                    <strong className="product-subtotal">
                                        ₹{item.subtotal}
                                    </strong>
                                </div>
                            ))
                        }

                    </div>

                </div>

                <div className="modal-section">

                    <h5 className="modal-section-title">Delivery Address</h5>

                    {order.address ? (
                        <div className="address-block">
                            <p className="address-name">{order.address.full_name}</p>
                            <p>
                                {order.address.house_no},
                                {" "}
                                {order.address.street}
                            </p>
                            <p>
                                {order.address.city},
                                {" "}
                                {order.address.state}
                            </p>
                            <p>{order.address.pincode}</p>
                        </div>
                    ) : (
                        <p className="no-address">No address on file.</p>
                    )}

                </div>

                <div className="modal-summary">
                    <div className="summary-row">
                        <span>Payment</span>
                        <strong>{order.payment_method}</strong>
                    </div>
                    <div className="summary-row summary-row--total">
                        <span>Total</span>
                        <strong>₹{order.total_amount}</strong>
                    </div>
                </div>

                <div className="modal-section modal-section--timeline">
                    <h5 className="modal-section-title">Track Order</h5>
                    <OrderTimeline
                        status={order.status}
                    />
                </div>

            </div>
        </div>
    );
}