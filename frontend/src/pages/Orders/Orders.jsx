import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getOrders } from "../../services/orderService";

import OrderCard from "../../components/orders/OrderCard";

import "./Orders.css";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        try {

            const response = await getOrders();

            const data = response.data?.data?.results
                || response.data?.results
                || response.data?.data
                || response.data
                || [];

            setOrders(Array.isArray(data) ? data : []);

        }

        catch {

            toast.error("Unable to load orders.");

            setOrders([]);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    return (

        <div className="orders-page">

            <div className="container">

                <h2 className="page-title">

                    My Orders

                </h2>

                {

                    orders.length === 0

                    ?

                    (

                        <div className="empty-orders">

                            <h4>

                                No Orders Yet

                            </h4>

                            <p>

                                Start shopping to place your first order.

                            </p>

                        </div>

                    )

                    :

                    (

                        orders.map(order => (

                            <OrderCard

                                key={order.id}

                                order={order}

                                refreshOrders={loadOrders}

                            />

                        ))

                    )

                }

            </div>

        </div>

    );

}