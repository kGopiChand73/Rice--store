import "./KPISection.css";

export default function KPISection({

stats,

}){

return(

<div className="kpi-grid">

<div className="kpi-card">

<h6>Total Revenue</h6>

<h2>

₹{stats.revenue}

</h2>

</div>

<div className="kpi-card">

<h6>Orders</h6>

<h2>

{stats.orders}

</h2>

</div>

<div className="kpi-card">

<h6>Customers</h6>

<h2>

{stats.customers}

</h2>

</div>

<div className="kpi-card">

<h6>Products</h6>

<h2>

{stats.products}

</h2>

</div>

</div>

);

}