import {

    FaBell,
    
    } from "react-icons/fa";
    
    import {
    
    useNotifications,
    
    } from "../../../context/NotificationContext";
    
    import "./NotificationBell.css";
    
    export default function NotificationBell({
    
    onClick,
    
    }){
    
    const{
    
    unread,
    
    }=
    
    useNotifications();
    
    return(
    
    <div
    
    className="notification-bell"
    
    onClick={onClick}
    
    >
    
    <FaBell/>
    
    {
    
    unread>0&&(
    
    <span
    
    className="badge-count"
    
    >
    
    {unread}
    
    </span>
    
    )
    
    }
    
    </div>
    
    );
    
    }