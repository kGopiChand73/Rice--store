import "./ProductForm.css";

export default function ProductFilters({
    search,
    setSearch,
    category,
    setCategory,
    categories = [],
}) {
    return (
        <div className="row mb-4">
            <div className="col-md-5">
                <input
                    className="form-control"
                    placeholder="Search rice..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="col-md-4">
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-3">
                <button className="btn btn-success w-100">Search</button>
            </div>
        </div>
    );
}