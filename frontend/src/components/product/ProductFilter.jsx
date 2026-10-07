import "./ProductFilter.css";

export default function ProductFilter({

    categories,

    selected,

    onChange,

}){

    return(

        <div className="product-filter">

            <h5>

                Categories

            </h5>

            <ul>

                <li>

                    <button

                        className={
                            selected===""

                            ? "active"

                            : ""

                        }

                        onClick={()=>onChange("")}

                    >

                        All

                    </button>

                </li>

                {

                    categories.map(category=>(

                        <li key={category.id}>

                            <button

                                className={

                                    selected===category.slug

                                    ? "active"

                                    : ""

                                }

                                onClick={()=>

                                    onChange(category.slug)

                                }

                            >

                                {category.name}

                            </button>

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}