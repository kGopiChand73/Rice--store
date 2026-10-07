import "./TopProducts.css";

export default function TopProducts(){

const items=[

{

name:"Basmati Rice",

sold:128,

},

{

name:"Brown Rice",

sold:96,

},

{

name:"Sona Masuri",

sold:82,

},

];

return(

<div className="analytics-card">

<h4>

Top Selling Rice

</h4>

{

items.map(item=>(

<div

className="top-product"

key={item.name}

>

<span>

{item.name}

</span>

<strong>

{item.sold}

Sold

</strong>

</div>

))

}

</div>

);

}