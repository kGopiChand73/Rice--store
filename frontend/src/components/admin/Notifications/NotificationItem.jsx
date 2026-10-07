import {

    FaShoppingCart,
    
    FaUser,
    
    FaBox,
    
    FaCheckCircle,
    
    } from "react-icons/fa";
    
    export default function NotificationItem({
    
    notification,
    
    }){
    
    const icons={
    
    order:
    
    <FaShoppingCart/>,
    
    customer:
    
    <FaUser/>,
    
    stock:
    
    <FaBox/>,
    
    delivery:
    
    <FaCheckCircle/>,
    
    };
    
    return(
    
    <div
    
    className={
    
    notification.is_read
    
    ?
    
    "notification-item"
    
    :
    
    "notification-item unread"
    
    }
    
    >
    
    <div>
    
    {
    
    icons[
    
    notification.type
    
    ]
    
    }
    
    </div>
    
    <div>
    
    <h6>
    
    {
    
    notification.title
    
    }
    
    </h6>
    
    <p>
    
    {
    
    notification.message
    
    }
    
    </p>
    
    <small>
    
    {
    
    notification.created_at
    
    }
    
    </small>
    
    </div>
    
    </div>
    
    );
    
    }