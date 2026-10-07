import api from "./api";

export const getCategories = () => {
    return api.get("products/categories/");
};

export const createCategory = (formData) => {
    return api.post(
        "products/categories/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

export const updateCategory = (slug, formData) => {
    return api.patch(
        `products/categories/${slug}/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

export const deleteCategory = (slug) => {
    return api.delete(`products/categories/${slug}/`);
};