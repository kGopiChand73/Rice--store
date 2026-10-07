import {
    useEffect,
    useState,
    useCallback,
} from "react";

import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

import ProductCard from "../../components/product/ProductCard";
import ProductFilter from "../../components/product/ProductFilter";

import "./Products.css";

export default function Products() {

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory =
        searchParams.get("category") || "";

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadCategories = useCallback(async () => {

        try {

            const response = await getCategories();

            const data =
                response.data?.results ||
                response.data ||
                [];

            setCategories(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.log(error);

            setCategories([]);

        }

    }, []);

    const loadProducts = useCallback(async () => {

        setLoading(true);

        try {

            const params =
                selectedCategory
                    ? { category: selectedCategory }
                    : {};

            const response =
                await getProducts(params);

            const data =
                response.data.data?.results ||
                response.data.results ||
                response.data ||
                [];

            setProducts(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.log(error);

            setProducts([]);

        }

        finally {

            setLoading(false);

        }

    }, [selectedCategory]);

    useEffect(() => {

        loadCategories();

    }, [loadCategories]);

    useEffect(() => {

        loadProducts();

    }, [loadProducts]);

    function handleCategoryChange(slug) {

        if (slug) {

            setSearchParams({
                category: slug,
            });

        }

        else {

            setSearchParams({});

        }

    }

    return (

        <section className="products-page container py-4 py-lg-5">

            <div className="products-header">

                <h2>
                    Our Rice Collection
                </h2>

                <p>
                    Fresh, premium quality rice directly from trusted farmers.
                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-3">

                    <ProductFilter
                        categories={categories}
                        selected={selectedCategory}
                        onChange={handleCategoryChange}
                    />

                </div>

                <div className="col-lg-9">

                    {

                        loading ?

                            <div className="text-center py-5">

                                <div className="spinner-border text-success" />

                            </div>

                            :

                            products.length === 0 ?

                                <div className="text-center py-5">

                                    <h5>No Products Found</h5>

                                    <p className="text-muted">

                                        Try selecting another category.

                                    </p>

                                </div>

                                :

                                <div className="row g-4">

                                    {

                                        products.map(product => (

                                            <div
                                                key={product.id}
                                                className="
                                                col-6
                                                col-md-6
                                                col-lg-4
                                                "
                                            >

                                                <ProductCard
                                                    product={product}
                                                />

                                            </div>

                                        ))

                                    }

                                </div>

                    }

                </div>

            </div>

        </section>

    );

}