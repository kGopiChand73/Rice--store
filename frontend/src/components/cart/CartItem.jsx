import "./CartItem.css";

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {

    const price =
        item.product.discount_price ||
        item.product.price;

    return (

        <div className="cart-item">

            <img
                src={item.product.image}
                alt={item.product.name}
            />

            <div className="cart-details">

                <h5>{item.product.name}</h5>

                <p>
                    ₹{price}
                </p>

            </div>

            <div className="cart-quantity">

                <button
                    onClick={() => onDecrease(item)}
                >
                    -
                </button>

                <span>
                    {item.quantity}
                </span>

                <button
                    onClick={() => onIncrease(item)}
                >
                    +
                </button>

            </div>

            <div className="cart-subtotal">

                ₹{item.subtotal}

            </div>

            <button
                className="btn btn-danger"
                onClick={() => onRemove(item.id)}
            >
                Remove
            </button>

        </div>

    );

}