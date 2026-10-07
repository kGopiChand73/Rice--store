import "./ProductSort.css";

export default function ProductSort({

    value,

    onChange,

}){

    return(

        <select

            className="form-select"

            value={value}

            onChange={(e)=>onChange(e.target.value)}

        >

            <option value="">

                Latest

            </option>

            <option value="price">

                Price Low to High

            </option>

            <option value="-price">

                Price High to Low

            </option>

            <option value="name">

                Name A-Z

            </option>

            <option value="-created_at">

                Newest

            </option>

        </select>

    );

}