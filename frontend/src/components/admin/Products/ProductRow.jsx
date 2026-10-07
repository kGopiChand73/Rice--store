import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import "./ProductRow.css";

export default function ProductRow({
    product,
    onEdit,
    onDelete,
}){
    return(
        <tr>
            <td>
                <img
                    src={
                        product.image ||
                        "/images/default-rice.jpg"
                    }
                    alt={product.name}
                    className="product-thumb"
                />
            </td>

            <td>
                {product.name}
            </td>

            <td>
                {product.category_name}
            </td>

            <td>
                ₹{product.price}
            </td>

            <td>
                {product.stock}
            </td>

            <td>
                {
                    product.stock > 0 ?
                    <span className="badge bg-success">
                        In Stock
                    </span>
                    :
                    <span className="badge bg-danger">
                        Out of Stock
                    </span>
                }
            </td>

            <td>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(product)}
                >
                    <FaEdit/>
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(product)}
                >
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}