import { useState } from "react";

import toast from "react-hot-toast";

import {
    createCategory,
    updateCategory,
} from "../../../services/categoryService";

import "./CategoryForm.css";

export default function CategoryForm({ category, onClose, onSaved }) {

    const isEdit = Boolean(category);

    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [isActive, setIsActive] = useState(category ? category.is_active : true);
    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (!name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("is_active", isActive);

        if (image) {
            formData.append("image", image);
        }

        setSubmitting(true);

        try {

            if (isEdit) {
                await updateCategory(category.slug, formData);
                toast.success("Category updated.");
            }
            else {
                await createCategory(formData);
                toast.success("Category created.");
            }

            onSaved();

        }
        catch (error) {
            console.log(error);
            toast.error(
                isEdit ? "Unable to update category." : "Unable to create category."
            );
        }
        finally {
            setSubmitting(false);
        }

    }

    return (
        <div className="category-modal-backdrop" onClick={onClose}>

            <div
                className="category-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <h4>{isEdit ? "Edit Category" : "Add Category"}</h4>

                <form onSubmit={handleSubmit}>

                    <label className="category-field">
                        <span>Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className="category-field">
                        <span>Description</span>
                        <textarea
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <label className="category-field">
                        <span>Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>

                    <label className="category-field category-field--checkbox">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <span>Active</span>
                    </label>

                    <div className="category-form-actions">
                        <button
                            type="button"
                            className="btn-category btn-category--outline"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-category btn-category--primary"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save"}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );

}