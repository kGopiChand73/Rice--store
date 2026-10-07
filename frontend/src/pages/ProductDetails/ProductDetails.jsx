import {
    useEffect,
    useState,
    useCallback,
} from "react";

import { useParams } from "react-router-dom";

import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";

import "./ProductDetails.css";

export default function ProductDetails() {

    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const loadProduct = useCallback(async () => {

        try {

            const response = await getProduct(slug);

            const data = response.data.data || response.data;

            setProduct(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }, [slug]);

    useEffect(() => {

        loadProduct();

    }, [loadProduct]);

    async function handleAddToCart() {

        try {

            await addToCart(product.id, quantity);

            alert("Product added to cart.");

        } catch (error) {

            console.log(error);

            alert("Unable to add product.");

        }

    }

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    if (!product) {

        return (

            <div className="container py-5 text-center">

                <h3>Product not found</h3>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <div className="row">

                <div className="col-lg-6">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded"
                    />

                </div>

                <div className="col-lg-6">

                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <h3>
                        ₹{product.discount_price || product.price}
                    </h3>

                    {product.discount_price && (
                        <del>₹{product.price}</del>
                    )}

                    <h5 className="mt-3">
                        Stock : {product.stock}
                    </h5>

                    <div className="d-flex align-items-center my-4">

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                quantity > 1 &&
                                setQuantity(quantity - 1)
                            }
                        >
                            -
                        </button>

                        <span className="mx-3">

                            {quantity}

                        </span>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                setQuantity(quantity + 1)
                            }
                        >
                            +
                        </button>

                    </div>

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