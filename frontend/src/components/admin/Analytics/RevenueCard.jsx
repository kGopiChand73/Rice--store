import{

    Line
    
    }from"react-chartjs-2";
    
    import{
    
    Chart as ChartJS,
    
    CategoryScale,
    
    LinearScale,
    
    PointElement,
    
    LineElement,
    
    Tooltip,
    
    Legend,
    
    }from"chart.js";
    
    ChartJS.register(
    
    CategoryScale,
    
    LinearScale,
    
    PointElement,
    
    LineElement,
    
    Tooltip,
    
    Legend
    
    );
    
    export default function RevenueChart(){
    
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
    
    label:"Revenue",
    
    data:[
    
    12000,
    
    18000,
    
    14000,
    
    26000,
    
    22000,
    
    30000,
    
    ],
    
    borderColor:"#2E7D32",
    
    backgroundColor:"#A5D6A7",
    
    fill:true,
    
    },
    
    ],
    
    };
    
    return(
    
    <Line
    
    data={data}
    
    />
    
    );
    
    }