import "./RecentOrders.css";

export default function RecentOrders({
    orders = [],
    loading = false,
}){

    return(

        <div className="dashboard-card">

            <h4>

                Recent Orders

            </h4>

            <table className="table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Customer</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        loading ? (
                            <tr>
                                <td colSpan="3">
                                    Loading...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="3">
                                    No orders yet.
                                </td>
                            </tr>
                        ) : (
                            orders.map(order=>(

                                <tr key={order.id}>

                                    <td>

                                        #{order.id}

                                    </td>

                                    <td>

                                        {
                                            order.user?.username ||
                                            order.customer_name ||
                                            order.address?.full_name ||
                                            "—"
                                        }

                                    </td>

                                    <td>

                                        {order.status}

                                    </td>

                                </tr>

                            ))
                        )
                    }

                </tbody>

            </table>

        </div>

    );

}