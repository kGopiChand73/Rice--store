import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatCard from "./StatCard";
import RecentOrders from "./RecentOrders";
import LowStockProducts from "./LowStockProducts";

import { getProducts } from "../../../services/productService";
import { getOrders } from "../../../services/orderService";
import { getCustomers } from "../../../services/customerService";

import "./Dashboard.css";

const LOW_STOCK_THRESHOLD = 10;

export default function Dashboard(){

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customersCount, setCustomersCount] = useState(0);

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData(){
        try {
            const [
                productsRes,
                ordersRes,
                customersRes,
            ] = await Promise.all([
                getProducts(),
                getOrders(),
                getCustomers(),
            ]);

            setProducts(
                productsRes.data.results || productsRes.data || []
            );

            setOrders(
                ordersRes.data.results || ordersRes.data || []
            );

            const customersData =
                customersRes.data.results || customersRes.data || [];

            setCustomersCount(customersData.length);
        }
        catch {
            toast.error("Unable to load dashboard data.");
        }
        finally {
            setLoading(false);
        }
    }

    const revenue = orders.reduce(
        (sum, order) => sum + Number(order.total_amount || 0),
        0
    );

    const lowStockProducts = products.filter(
        product => product.stock <= LOW_STOCK_THRESHOLD
    );

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return(

        <>

            <h2 className="dashboard-title">

                Dashboard

            </h2>

            <p className="dashboard-subtitle">

                Welcome back 👋

            </p>

            <div className="stats-grid">

                <StatCard
                    title="Revenue"
                    value={
                        loading
                            ? "…"
                            : `₹${revenue.toLocaleString("en-IN")}`
                    }
                    color="green"
                />

                <StatCard
                    title="Orders"
                    value={loading ? "…" : orders.length}
                    color="blue"
                />

                <StatCard
                    title="Products"
                    value={loading ? "…" : products.length}
                    color="orange"
                />

                <StatCard
                    title="Customers"
                    value={loading ? "…" : customersCount}
                    color="purple"
                />

            </div>

            <div className="dashboard-grid">

                <RecentOrders
                    orders={recentOrders}
                    loading={loading}
                />

                <LowStockProducts
                    products={lowStockProducts}
                    loading={loading}
                />

            </div>

        </>

    );

}