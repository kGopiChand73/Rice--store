import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../services/categoryService";

import "./Categories.css";

const SKELETON_COUNT = 8;

export default function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {

        try {

            const response = await getCategories();

            const data =
                response.data?.results ||
                response.data ||
                response.results ||
                response ||
                [];

            setCategories(Array.isArray(data) ? data : []);

        }

        catch (error) {

            console.log(error);

            setCategories([]);

        }

        finally {

            setLoading(false);

        }

    }

    function handleCategoryClick(category) {

        navigate(`/products?category=${category.slug}`);

    }

    function handleCategoryKeyDown(event, category) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            handleCategoryClick(category);

        }

    }

    function handleImageError(event) {

        event.target.src = "/placeholder-category.png";

    }

    return (

        <section className="category-section">

            <div className="container">

                <div className="section-header">

                    <span className="section-badge">
                        Premium Categories
                    </span>

                    <h2 className="section-title">

                        Shop By Category

                    </h2>

                    <p>

                        Explore our premium collection of fresh rice varieties.

                    </p>

                </div>

                {

                    loading ?

                        <div className="row justify-content-center g-4">

                            {

                                Array.from({ length: SKELETON_COUNT }).map((_, i) => (

                                    <div
                                        className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                                        key={i}
                                    >

                                        <div className="category-card skeleton-card">

                                            <div className="category-image-wrapper skeleton-shimmer" />

                                            <div className="card-body">

                                                <div className="skeleton-line skeleton-shimmer" />

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    : categories.length === 0 ?

                        <div className="empty-category">

                            <h5>No Categories Found</h5>

                            <p>Please add categories from Admin Panel.</p>

                        </div>

                        :

                        <div className="row justify-content-center g-4">

                            {

                                categories.map(category => (

                                    <div

                                        className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"

                                        key={category.id}

                                    >

                                        <div

                                            className="category-card"

                                            role="button"
                                            tabIndex={0}

                                            onClick={() => handleCategoryClick(category)}
                                            onKeyDown={(e) => handleCategoryKeyDown(e, category)}

                                            aria-label={`Shop ${category.name}`}

                                        >

                                            <div className="category-image-wrapper">

                                                <img

                                                    src={category.image}

                                                    alt={category.name}

                                                    className="category-image"

                                                    loading="lazy"

                                                    onError={handleImageError}

                                                />

                                            </div>

                                            <div className="card-body">

                                                <h5>{category.name}</h5>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                }

            </div>

        </section>

    );

}