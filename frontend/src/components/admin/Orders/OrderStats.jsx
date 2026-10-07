import "./OrderStats.css";

export default function OrderStats({

stats,

}){

return(

<div className="order-stats">

<div className="stat">

<h6>

Pending

</h6>

<h2>

{stats.pending}

</h2>

</div>

<div className="stat">

<h6>

Confirmed

</h6>

<h2>

{stats.confirmed}

</h2>

</div>

<div className="stat">

<h6>

Shipped

</h6>

<h2>

{stats.shipped}

</h2>

</div>

<div className="stat">

<h6>

Delivered

</h6>

<h2>

{stats.delivered}

</h2>

</div>

<div className="stat">

<h6>

Cancelled

</h6>

<h2>

{stats.cancelled}

</h2>

</div>

</div>

);

}