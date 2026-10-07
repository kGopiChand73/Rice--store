export default function OrderedItemsTable({ items = [] }) {
    return (
        <div className="ordered-items">
            <h5>Items</h5>

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
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="4">No items found.</td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}