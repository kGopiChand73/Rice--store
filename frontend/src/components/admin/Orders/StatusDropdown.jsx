import {

    updateOrderStatus,
    
    } from "../../../services/orderService";
    
    import toast from "react-hot-toast";
    
    export default function StatusDropdown({
    
    order,
    
    reload,
    
    }){
    
    async function changeStatus(e){
    
    try{
    
    await updateOrderStatus(
    
    order.id,
    
    e.target.value,
    
    );
    
    toast.success(
    
    "Status updated"
    
    );
    
    reload();
    
    }
    
    catch{
    
    toast.error(
    
    "Unable to update status"
    
    );
    
    }
    
    }
    
    return(
    
    <select
    
    className="form-select"
    
    value={order.status}
    
    onChange={changeStatus}
    
    >
    
    <option>
    
    Pending
    
    </option>
    
    <option>
    
    Confirmed
    
    </option>
    
    <option>
    
    Shipped
    
    </option>
    
    <option>
    
    Delivered
    
    </option>
    
    <option>
    
    Cancelled
    
    </option>
    
    </select>
    
    );
    
    }