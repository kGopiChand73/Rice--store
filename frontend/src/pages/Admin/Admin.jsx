import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar/AdminSidebar";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import ProductTable from "../../components/admin/Products/ProductTable";
import AdminOrders from "../../components/admin/Orders/AdminOrders";
import CustomerTable from "../../components/admin/Orders/Customers/CustomerTable";
import SalesChart from "../../components/admin/Analytics/SalesChart";
import StoreSettings from "../../components/admin/Settings/StoreSettings";
import CategoryTable from "../../components/admin/Categories/CategoryTable";

import "./Admin.css";

export default function Admin() {
    const [page, setPage] = useState("dashboard");

    return (
        <div className="admin-layout">
            <AdminSidebar
                page={page}
                setPage={setPage}
            />

            <div className="admin-content">
                {page === "dashboard" && <Dashboard />}
                {page === "products" && <ProductTable />}
                {page === "orders" && <AdminOrders />}
                {page === "customers" && <CustomerTable />}
                {page === "analytics" && <SalesChart />}
                {page === "categories" && <CategoryTable />}
                {page === "settings" && <StoreSettings />}
            </div>
        </div>
    );
}