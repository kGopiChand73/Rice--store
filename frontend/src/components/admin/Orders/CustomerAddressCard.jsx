import "./OrderDetailsModal.css";

export default function CustomerAddressCard({
    address,
}) {

    if (!address) {
        return null;
    }

    return (
        <div className="address-card">
            <h5>
                Delivery Address
            </h5>
            <p>
                <strong>
                    {address.full_name}
                </strong>
            </p>
            <p>
                {address.address_line_1}
            </p>
            {
                address.address_line_2 &&
                <p>
                    {address.address_line_2}
                </p>
            }
            <p>
                {address.city},
                {" "}
                {address.state}
            </p>
            <p>
                {address.pincode}
            </p>
            <p>
                📞
                {" "}
                {address.phone}
            </p>
        </div>
    );
}