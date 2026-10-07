import { useState, useEffect } from "react";
import {
    FaWhatsapp,
    FaPrint,
} from "react-icons/fa";

import { getOrder } from "../../../services/orderService";

import CustomerAddressCard from "./CustomerAddressCard";
import Invoice from "./Invoice";
import OrderedItemsTable from "./OrderedItemsTable";

import "./OrderDetailsModal.css";

export default function OrderDetailsModal({
    order: initialOrder,
    onClose,
}){

    const [order, setOrder] = useState(initialOrder);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!initialOrder) {
            return;
        }

        let isCancelled = false;

        async function fetchOrder(){
            setLoading(true);
            try {
                const response = await getOrder(initialOrder.id);
                if (!isCancelled) {
                    setOrder(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchOrder();

        return () => {
            isCancelled = true;
        };
    }, [initialOrder]);

    if(!order){
        return null;
    }

    return(
        <div className="modal-backdrop">
            <div className="order-modal">

                <div className="modal-header">
                    <h3>
                        Order #{order.id}
                    </h3>

                    <button
                        onClick={onClose}
                        className="btn-close"
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <p>Loading order details...</p>
                ) : (
                    <>
                        <CustomerAddressCard
                            address={order.address}
                        />

                        <OrderedItemsTable
                            items={order.items}
                        />

                        <div className="order-total">
                            <h4>
                                Total
                            </h4>
                            <h3>
                                ₹{order.total_amount}
                            </h3>
                        </div>
                    </>
                )}

                <div className="modal-actions">
                    <button
                        className="btn btn-success"
                    >
                        <FaWhatsapp/>
                        {" "}
                        WhatsApp
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={()=>window.print()}
                    >
                        <FaPrint/>
                        {" "}
                        Print Invoice
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div className="print-area">
                    <Invoice
                        order={order}
                    />
                </div>

            </div>
        </div>
    );
}