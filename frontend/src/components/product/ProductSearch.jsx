import "./ProductSearch.css";

export default function ProductSearch({

    value,

    onChange,

}){

    return(

        <div className="product-search">

            <input

                type="text"

                className="form-control"

                placeholder="Search rice..."

                value={value}

                onChange={(e)=>onChange(e.target.value)}

            />

        </div>

    );

}