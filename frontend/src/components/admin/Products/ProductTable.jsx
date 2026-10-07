import {
    useEffect,
    useState,
    useCallback,
} from "react";

import toast from "react-hot-toast";

import {
    getProducts,
    deleteProduct,
} from "../../../services/productService";

import {
    getCategories,
} from "../../../services/categoryService";

import ProductRow from "./ProductRow";
import ProductFilters from "./ProductFilters";
import ProductForm from "./ProductForm";
import DeleteProductModal from "./DeleteProductModal";

import "./ProductTable.css";

export default function ProductTable() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [deletingProduct, setDeletingProduct] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadProducts = useCallback(async () => {

        setLoading(true);

        try {

            const response = await getProducts({
                search: search || undefined,
                category: category || undefined,
                page_size: 100,
            });

            const data =
                response.data?.data?.results ||
                response.data?.results ||
                response.data ||
                [];

            setProducts(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch {

            toast.error(
                "Unable to load products."
            );

            setProducts([]);

        }

        finally {

            setLoading(false);

        }

    }, [search, category]);

    const loadCategories = useCallback(async () => {

        try {

            const response =
                await getCategories();

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

        catch {

            toast.error(
                "Unable to load categories."
            );

            setCategories([]);

        }

    }, []);

    useEffect(() => {

        loadCategories();

    }, [loadCategories]);

    useEffect(() => {

        loadProducts();

    }, [loadProducts]);

    function handleAddClick() {

        setEditingProduct(null);

        setShowForm(true);

    }

    function handleEditClick(product) {

        setEditingProduct(product);

        setShowForm(true);

    }

    function handleFormClose() {

        setShowForm(false);

        setEditingProduct(null);

    }

    async function handleFormSuccess() {

        setShowForm(false);

        setEditingProduct(null);

        await loadProducts();

    }

    function handleDeleteClick(product) {

        setDeletingProduct(product);

    }

    async function handleConfirmDelete() {

        setDeleting(true);

        try {

            await deleteProduct(
                deletingProduct.slug
            );

            toast.success(
                "Product deleted successfully"
            );

            setDeletingProduct(null);

            await loadProducts();

        }

        catch {

            toast.error(
                "Unable to delete product."
            );

        }

        finally {

            setDeleting(false);

        }

    }

    return (

        <>

            <div className="table-header">

                <h2>
                    Products
                </h2>

                <button
                    className="btn btn-success"
                    onClick={handleAddClick}
                >
                    + Add Product
                </button>

            </div>

            <ProductFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                categories={categories}
            />

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ?

                            <tr>

                                <td colSpan="7">

                                    Loading...

                                </td>

                            </tr>

                            :

                            products.length === 0 ?

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center"
                                    >

                                        No products found.

                                    </td>

                                </tr>

                                :

                                products.map(product => (

                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteClick}
                                    />

                                ))

                    }

                </tbody>

            </table>

            {

                showForm && (

                    <div className="modal show d-block">

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>

                                        {

                                            editingProduct

                                                ? "Edit Product"

                                                : "Add Product"

                                        }

                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleFormClose}
                                    />

                                </div>

                                <div className="modal-body">

                                    <ProductForm
                                        product={editingProduct}
                                        onSuccess={handleFormSuccess}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

            {

                deletingProduct && (

                    <DeleteProductModal
                        product={deletingProduct}
                        onDelete={handleConfirmDelete}
                        onClose={() =>
                            setDeletingProduct(null)
                        }
                        deleting={deleting}
                    />

                )

            }

        </>

    );

}