import {

    createContext,
    
    useContext,
    
    useEffect,
    
    useState,
    
    } from "react";
    
    import {
    
    getNotifications,
    
    } from "../services/notificationService";
    
    const NotificationContext=
    
    createContext();
    
    export function NotificationProvider({
    
    children,
    
    }){
    
    const[notifications,
    
    setNotifications]=
    
    useState([]);
    
    useEffect(()=>{
    
    loadNotifications();
    
    },[]);
    
    async function loadNotifications(){
    
    try{
    
    const res=
    
    await getNotifications();
    
    setNotifications(
    
    res.data.results||
    
    res.data
    
    );
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    }
    
    const unread=
    
    notifications.filter(
    
    n=>!n.is_read
    
    ).length;
    
    return(
    
    <NotificationContext.Provider
    
    value={{
    
    notifications,
    
    setNotifications,
    
    loadNotifications,
    
    unread,
    
    }}
    
    >
    
    {children}
    
    </NotificationContext.Provider>
    
    );
    
    }
    
    export function useNotifications(){
    
    return useContext(
    
    NotificationContext
    
    );
    
    }