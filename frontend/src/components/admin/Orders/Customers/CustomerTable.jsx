import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import Loader from "../../../common/Loader/Loader";

import {
    getCustomers,
    deleteCustomer,
} from "../../../../services/customerService";

import CustomerStats from "./CustomerStats";
import CustomerFilters from "./CustomerFilters";
import CustomerRow from "./CustomerRow";
import CustomerDetailsModal from "./CustomerDetailsModal";

export default function CustomerTable(){

    const[customers,setCustomers]=useState([]);
    const[selected,setSelected]=useState(null);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");

    useEffect(()=>{
        loadCustomers();
    },[]);

    async function loadCustomers(){
        try {
            const response = await getCustomers();
            setCustomers(
                response.data.results ||
                response.data
            );
        } catch (error) {
            console.error("Failed to load customers:", error);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(customer){

        const confirmed = window.confirm(
            `Remove ${customer.full_name}? This cannot be undone.`
        );

        if(!confirmed){
            return;
        }

        try {
            await deleteCustomer(customer.id);

            setCustomers(prev=>
                prev.filter(c=>c.id!==customer.id)
            );

            toast.success("Customer removed successfully.");
        } catch (error) {
            console.error("Failed to delete customer:", error);
            toast.error("Unable to remove customer.");
        }
    }

    if(loading){
        return<Loader/>;
    }

    const stats={
        total:customers.length,
        active:customers.filter(
            c=>c.total_orders>0
        ).length,
        newCustomers:customers.filter(
            c=>{
                const d=new Date(c.date_joined);
                return d.getMonth()===new Date().getMonth();
            }
        ).length,
        vip:customers.filter(
            c=>c.total_spent>10000
        ).length,
    };

    return(
        <>
            <CustomerStats stats={stats}/>

            <CustomerFilters
                search={search}
                setSearch={setSearch}
            />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Orders</th>
                        <th>Spent</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer=>(
                            <CustomerRow
                                key={customer.id}
                                customer={customer}
                                onView={setSelected}
                                onDelete={handleDelete}
                            />
                        ))
                    }
                </tbody>
            </table>

            <CustomerDetailsModal
                customer={selected}
                onClose={()=>setSelected(null)}
            />
        </>
    );
}