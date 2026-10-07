import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../services/productService";

import "./FeaturedProducts.css";

const SKELETON_COUNT = 8;
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x400?text=Rice";

export default function FeaturedProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    async function loadProducts() {

        try {

            const response = await getProducts({ page_size: 100 });

            const data =
                response.data?.results ||
                response.data ||
                [];

            setProducts(Array.isArray(data) ? data : []);

        }

        catch (error) {

            console.log(error);

            setProducts([]);

        }

        finally {

            setLoading(false);

        }

    }

    function handleImageError(event) {

        event.target.src = PLACEHOLDER_IMAGE;

    }

    function getDiscountPercent(price, discountPrice) {

        if (!discountPrice) return null;

        const percent = Math.round(
            ((price - discountPrice) / price) * 100
        );

        return percent > 0 ? percent : null;

    }

    return (

        <section className="featured-section">

            <div className="container">

                <div className="section-header">

                    <span className="section-badge">
                        Best Selling Rice
                    </span>

                    <h2 className="section-title">
                        Featured Products
                    </h2>

                    <p>
                        Freshly selected premium quality rice for your family.
                    </p>

                </div>

                {

                    loading ?

                        <div className="row justify-content-center g-4">

                            {

                                Array.from({ length: SKELETON_COUNT }).map((_, i) => (

                                    <div
                                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                                        key={i}
                                    >

                                        <div className="featured-card skeleton-card">

                                            <div className="featured-image skeleton-shimmer" />

                                            <div className="featured-body">

                                                <div className="skeleton-line skeleton-shimmer skeleton-line-sm" />
                                                <div className="skeleton-line skeleton-shimmer skeleton-line-lg" />
                                                <div className="skeleton-line skeleton-shimmer skeleton-line-md" />

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    : products.length === 0 ?

                        <div className="empty-products">

                            <h5>No Products Found</h5>

                            <p>Please add products from Admin Panel.</p>

                        </div>

                        :

                        <div className="row justify-content-center g-4">

                            {

                                products.map(product => {

                                    const discountPercent = getDiscountPercent(
                                        product.price,
                                        product.discount_price
                                    );

                                    return (

                                        <div
                                            className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                                            key={product.id}
                                        >

                                            <div className="featured-card">

                                                {

                                                    discountPercent &&

                                                    <span className="discount-badge">

                                                        {discountPercent}% OFF

                                                    </span>

                                                }

                                                <Link
                                                    to={`/products/${product.slug}`}
                                                    className="featured-image"
                                                    aria-label={`View ${product.name}`}
                                                >

                                                    <img
                                                        src={product.image || PLACEHOLDER_IMAGE}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        onError={handleImageError}
                                                    />

                                                </Link>

                                                <div className="featured-body">

                                                    <small className="category-name">

                                                        {product.category_name || "Premium Rice"}

                                                    </small>

                                                    <h5>

                                                        <Link
                                                            to={`/products/${product.slug}`}
                                                            className="product-title-link"
                                                        >
                                                            {product.name}
                                                        </Link>

                                                    </h5>

                                                    <div className="price-wrapper">

                                                        {

                                                            product.discount_price ?

                                                                <>

                                                                    <span className="new-price">

                                                                        ₹{product.discount_price}

                                                                    </span>

                                                                    <span className="old-price">

                                                                        ₹{product.price}

                                                                    </span>

                                                                </>

                                                                :

                                                                <span className="new-price">

                                                                    ₹{product.price}

                                                                </span>

                                                        }

                                                    </div>

                                                    <Link
                                                        to={`/products/${product.slug}`}
                                                        className="btn btn-success"
                                                    >

                                                        View Details

                                                    </Link>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })

                            }

                        </div>

                }

            </div>

        </section>

    );

}