import {

    FaHome,
    
    FaBox,
    
    FaShoppingCart,
    
    FaUsers,
    
    FaChartLine,
    
    FaCog,
    
    FaTags,
    
    } from "react-icons/fa";
    
    import "./AdminSidebar.css";
    
    export default function AdminSidebar({
    
    page,
    
    setPage,
    
    }){
    
    const menu=[
    
    {
    
    id:"dashboard",
    
    icon:<FaHome/>,
    
    title:"Dashboard",
    
    },
    
    {
    
    id:"products",
    
    icon:<FaBox/>,
    
    title:"Products",
    
    },
    
    {
    
    id:"categories",
    
    icon:<FaTags/>,
    
    title:"Categories",
    
    },
    
    {
    
    id:"orders",
    
    icon:<FaShoppingCart/>,
    
    title:"Orders",
    
    },
    
    {
    
    id:"customers",
    
    icon:<FaUsers/>,
    
    title:"Customers",
    
    },
    
    {
    
    id:"analytics",
    
    icon:<FaChartLine/>,
    
    title:"Analytics",
    
    },
    
    {
    
    id:"settings",
    
    icon:<FaCog/>,
    
    title:"Settings",
    
    },
    
    ];
    
    return(
    
    <div className="sidebar">
    
    <h3>
    
    🌾 Rice Store
    
    </h3>
    
    {
    
    menu.map(item=>(
    
    <button
    
    key={item.id}
    
    className={
    
    page===item.id
    
    ?
    
    "active"
    
    :
    
    ""
    
    }
    
    onClick={()=>
    
    setPage(item.id)
    
    }
    
    >
    
    {item.icon}
    
    <span>
    
    {item.title}
    
    </span>
    
    </button>
    
    ))
    
    }
    
    </div>
    
    );
    
    }