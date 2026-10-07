import "./LowStockProducts.css";

export default function LowStockProducts({
    products = [],
    loading = false,
}){

    return(

        <div className="dashboard-card">

            <h4>

                Low Stock

            </h4>

            {
                loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No low stock products.</p>
                ) : (
                    products.map(product=>(

                        <div

                            className="stock-item"

                            key={product.id}

                        >

                            <strong>

                                {product.name}

                            </strong>

                            <span>

                                {product.stock}

                                {" "}left

                            </span>

                        </div>

                    ))
                )
            }

        </div>

    );

}