import "./ProductStats.css";

export default function ProductStats({

    stats,

}){

    return(

        <div className="product-stats">

            <div className="stat-box">

                <h6>Total Products</h6>

                <h2>{stats.total}</h2>

            </div>

            <div className="stat-box">

                <h6>Available</h6>

                <h2>{stats.available}</h2>

            </div>

            <div className="stat-box">

                <h6>Out of Stock</h6>

                <h2>{stats.outOfStock}</h2>

            </div>

            <div className="stat-box">

                <h6>Categories</h6>

                <h2>{stats.categories}</h2>

            </div>

        </div>

    );

}