import "./AddressCard.css";

export default function AddressCard({

    address,

    selected,

    onSelect,

}) {

    return (

        <div
            className={`address-card ${
                selected ? "selected" : ""
            }`}
            onClick={() => onSelect(address.id)}
        >

            <div className="address-header">

                <h5>

                    🏠 {address.address_type || "Address"}

                </h5>

                {
                    address.is_default && (

                        <span className="default-badge">

                            Default

                        </span>

                    )
                }

            </div>

            <p>

                <strong>

                    {address.full_name}

                </strong>

            </p>

            <p>{address.phone_number}</p>

            <p>{address.house_no}</p>

            <p>{address.street}</p>

            {
                address.landmark && (

                    <p>{address.landmark}</p>

                )
            }

            <p>

                {address.city},

                {" "}

                {address.state}

            </p>

            <p>{address.pincode}</p>

            <button

                className={`btn ${
                    selected
                        ? "btn-success"
                        : "btn-outline-success"
                } mt-3`}

            >

                {

                    selected

                        ? "Selected"

                        : "Select Address"

                }

            </button>

        </div>

    );

}