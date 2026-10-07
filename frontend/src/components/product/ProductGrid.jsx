import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {

    if (!products.length) {

        return (

            <p className="text-center text-muted">

                No products found.

            </p>

        );

    }

    return (

        <div className="row">

            {

                products.map(product => (

                    <div
                        key={product.id}
                        className="col-lg-4 col-md-6 mb-4"
                    >

                        <ProductCard
                            product={product}
                        />

                    </div>

                ))

            }

        </div>

    );

}