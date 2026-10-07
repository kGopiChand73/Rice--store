import "./ProductCard.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../services/cartService";

export default function ProductCard({ product }) {

    async function handleAddToCart() {

        try {

            await addToCart(product.id, 1);

            alert("Product added to cart successfully.");

        }

        catch (error) {

            console.log(error);

            alert("Unable to add product.");

        }

    }

    return (

        <div className="product-card h-100">

            {

                product.discount_price &&

                <span className="discount-badge">

                    SALE

                </span>

            }

            <div className="product-image">

                <img
                    src={product.image}
                    alt={product.name}
                />

            </div>

            <div className="product-body">

                <p className="product-category">

                    {product.category_name}

                </p>

                <h5>

                    {product.name}

                </h5>

                <div className="price-section">

                    {

                        product.discount_price ?

                            <>

                                <span className="discount-price">

                                    ₹{product.discount_price}

                                </span>

                                <span className="old-price">

                                    ₹{product.price}

                                </span>

                            </>

                            :

                            <span className="discount-price">

                                ₹{product.price}

                            </span>

                    }

                </div>

                <div className="product-buttons">

                    <Link
                        to={`/products/${product.slug}`}
                        className="btn btn-outline-success"
                    >

                        View Details

                    </Link>

                    <button
                        className="btn btn-success"
                        onClick={handleAddToCart}
                    >

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

    );

}