import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
    getCategories,
    deleteCategory,
} from "../../../services/categoryService";

import CategoryForm from "./CategoryForm";

import "./CategoryTable.css";

export default function CategoryTable() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);

    async function loadCategories() {

        setLoading(true);

        try {
            const response = await getCategories();
            setCategories(response.data || []);
        }
        catch (error) {
            console.log(error);
            toast.error("Unable to load categories.");
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadCategories();
    }, []);

    function openCreate() {
        setEditing(null);
        setShowForm(true);
    }

    function openEdit(category) {
        setEditing(category);
        setShowForm(true);
    }

    async function handleDelete(category) {

        if (!window.confirm(`Delete category "${category.name}"?`)) return;

        try {
            await deleteCategory(category.slug);
            toast.success("Category deleted.");
            loadCategories();
        }
        catch (error) {
            console.log(error);
            toast.error("Unable to delete category.");
        }

    }

    if (loading) {
        return <p className="category-loading">Loading categories...</p>;
    }

    return (
        <div className="category-panel">

            <div className="category-panel-header">
                <h3>Categories</h3>
                <button
                    className="btn-category btn-category--primary"
                    onClick={openCreate}
                >
                    + Add Category
                </button>
            </div>

            <table className="category-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td>
                                    {
                                        category.image
                                            ? <img
                                                src={category.image}
                                                alt={category.name}
                                                className="category-thumb"
                                              />
                                            : <div className="category-thumb category-thumb--empty" />
                                    }
                                </td>
                                <td>{category.name}</td>
                                <td className="category-slug">{category.slug}</td>
                                <td>
                                    <span
                                        className={
                                            category.is_active
                                                ? "category-status category-status--active"
                                                : "category-status category-status--inactive"
                                        }
                                    >
                                        {category.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="category-actions">
                                    <button
                                        className="btn-category btn-category--outline"
                                        onClick={() => openEdit(category)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-category btn-category--danger"
                                        onClick={() => handleDelete(category)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        categories.length === 0 && (
                            <tr>
                                <td colSpan="5" className="category-empty">
                                    No categories yet.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {
                showForm && (
                    <CategoryForm
                        category={editing}
                        onClose={() => setShowForm(false)}
                        onSaved={() => {
                            setShowForm(false);
                            loadCategories();
                        }}
                    />
                )
            }

        </div>
    );

}