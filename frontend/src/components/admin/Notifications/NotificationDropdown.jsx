import {

    useNotifications,
    
    } from "../../../context/NotificationContext";
    
    import NotificationItem from "./NotificationItem";
    
    export default function NotificationDropdown(){
    
    const{
    
    notifications,
    
    }=
    
    useNotifications();
    
    return(
    
    <div
    
    className="notification-dropdown"
    
    >
    
    <h5>
    
    Notifications
    
    </h5>
    
    {
    
    notifications.length===0?
    
    <p>
    
    No notifications.
    
    </p>
    
    :
    
    notifications.map(
    
    item=>(
    
    <NotificationItem
    
    key={item.id}
    
    notification={item}
    
    />
    
    )
    
    )
    
    }
    
    </div>
    
    );
    
    }