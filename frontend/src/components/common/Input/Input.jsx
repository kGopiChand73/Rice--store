import "./Input.css";

export default function Input({

label,

type="text",

...props

}){

return(

<div className="mb-3">

<label className="form-label">

{label}

</label>

<input

className="form-control input-custom"

type={type}

{...props}

/>

</div>

);

}