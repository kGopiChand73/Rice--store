import {

    Bar
    
    } from "react-chartjs-2";
    
    import{
    
    Chart as ChartJS,
    
    CategoryScale,
    
    LinearScale,
    
    BarElement,
    
    Title,
    
    Tooltip,
    
    Legend,
    
    }from"chart.js";
    
    ChartJS.register(
    
    CategoryScale,
    
    LinearScale,
    
    BarElement,
    
    Title,
    
    Tooltip,
    
    Legend
    
    );
    
    export default function SalesChart(){
    
    const data={
    
    labels:[
    
    "Jan",
    
    "Feb",
    
    "Mar",
    
    "Apr",
    
    "May",
    
    "Jun",
    
    ],
    
    datasets:[
    
    {
    
    label:"Orders",
    
    data:[
    
    18,
    
    24,
    
    15,
    
    28,
    
    35,
    
    42,
    
    ],
    
    backgroundColor:"#2E7D32",
    
    },
    
    ],
    
    };
    
    return(
    
    <Bar
    
    data={data}
    
    />
    
    );
    
    }