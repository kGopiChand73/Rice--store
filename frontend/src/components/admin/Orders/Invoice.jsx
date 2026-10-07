export default function Invoice({ order }) {
    if (!order) {
        return null;
    }

    return (
        <div className="invoice">
            <div className="invoice-header">
                <h2>🌾 Khadri RiceStore</h2>
                <p>Tax Invoice</p>
            </div>

            <div className="invoice-meta">
                <p>
                    <strong>Order #:</strong> {order.id}
                </p>
                <p>
                    <strong>Date:</strong> {order.created_at}
                </p>
                <p>
                    <strong>Customer:</strong> {order.user_name}
                </p>
                <p>
                    <strong>Phone:</strong> {order.phone}
                </p>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    {(order.items || []).map((item) => (
                        <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="invoice-total">
                <h4>Total: ₹{order.total_amount}</h4>
            </div>

            <p className="invoice-footer">
                Thank you for shopping with Khadri RiceStore 🌾
            </p>
        </div>
    );
}