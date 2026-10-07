import "./Button.css";

export default function Button({

    children,

    type = "button",

    variant = "primary",

    loading = false,

    ...props

}){

    return(

<button

type={type}

className={`btn-custom ${variant}`}

disabled={loading}

{...props}

>

{

loading

?

<span
className="spinner-border spinner-border-sm"
/>

:

children

}

</button>

);

}