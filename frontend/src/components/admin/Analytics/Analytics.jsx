import KPISection from "./KPISection";

import SalesChart from "./SalesChart";

import RevenueChart from "./RevenueChart";

import TopProducts from "./TopProducts";

import "./Analytics.css";

export default function Analytics(){

const stats={

revenue:124500,

orders:248,

customers:95,

products:42,

};

return(

<>

<h2>

Analytics Dashboard

</h2>

<KPISection

stats={stats}

/>

<div className="analytics-grid">

<div>

<SalesChart/>

</div>

<div>

<RevenueChart/>

</div>

</div>

<div className="analytics-bottom">

<TopProducts/>

</div>

</>

);

}