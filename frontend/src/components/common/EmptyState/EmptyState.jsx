import "./EmptyState.css";

export default function EmptyState({

image,

title,

subtitle,

}){

return(

<div className="empty-state">

<img

src={image}

alt="Empty"

/>

<h3>

{title}

</h3>

<p>

{subtitle}

</p>

</div>

);

}