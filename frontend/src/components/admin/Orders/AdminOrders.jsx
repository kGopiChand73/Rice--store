import {
    useEffect,
    useState,
} from "react";

import Loader from "../../common/Loader/Loader";

import {
    getOrders,
} from "../../../services/orderService";

import OrderStats from "./OrderStats";
import OrderFilters from "./OrderFilters";
import OrderRow from "./OrderRow";
import OrderDetailsModal from "./OrderDetailsModal";

export default function AdminOrders(){

    const[orders,setOrders]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[status,setStatus]=useState("");
    const[selectedOrder,setSelectedOrder]=useState(null);

    useEffect(()=>{
        loadOrders();
    },[]);

    async function loadOrders(){
        const response=
            await getOrders();
        setOrders(
            response.data.results||
            response.data
        );
        setLoading(false);
    }

    if(loading){
        return<Loader/>;
    }

    const stats={
        pending:
            orders.filter(
                o=>o.status==="Pending"
            ).length,
        confirmed:
            orders.filter(
                o=>o.status==="Confirmed"
            ).length,
        shipped:
            orders.filter(
                o=>o.status==="Shipped"
            ).length,
        delivered:
            orders.filter(
                o=>o.status==="Delivered"
            ).length,
        cancelled:
            orders.filter(
                o=>o.status==="Cancelled"
            ).length,
    };

    return(
        <>
            <OrderStats
                stats={stats}
            />

            <OrderFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
            />

            <table
                className="table table-hover"
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map(order=>(
                            <OrderRow
                                key={order.id}
                                order={order}
                                reload={loadOrders}
                                onView={setSelectedOrder}
                            />
                        ))
                    }
                </tbody>
            </table>

            <OrderDetailsModal
                order={selectedOrder}
                onClose={()=>setSelectedOrder(null)}
            />
        </>
    );
}