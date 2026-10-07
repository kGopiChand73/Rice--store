import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { getAddresses } from "../../services/addressService";
import { checkout } from "../../services/orderService";

import AddressCard from "../../components/checkout/AddressCard";
import AddressForm from "../../components/checkout/AddressForm";
import OrderSummary from "../../components/checkout/OrderSummary";

import "./Checkout.css";

export default function Checkout() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadAddresses();

    }, []);

    async function loadAddresses() {

        try {

            const response = await getAddresses();

            setAddresses(response.data);

            const defaultAddress = response.data.find(
                address => address.is_default
            );

            if (defaultAddress) {

                setSelectedAddress(defaultAddress.id);

            }

        }

        catch {

            toast.error("Unable to load addresses.");

        }

    }

    async function handlePlaceOrder() {

        if (!selectedAddress) {

            toast.error("Please select a delivery address.");

            return;

        }

        setLoading(true);

        try {

            const response = await checkout(selectedAddress);

            toast.success("Order placed successfully.");

            if (response.data.whatsapp_url) {

                navigate(

                    "/order-success",

                    {

                        state: {

                            order: response.data.order,

                            whatsappUrl: response.data.whatsapp_url,

                        }

                    }

                );

            }

        }

        catch {

            toast.error("Unable to place order.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="checkout-page">

            <div className="container">

                <h2 className="checkout-title">

                    Checkout

                </h2>

                <div className="row g-4">

                    <div className="col-lg-7">

                        <div className="checkout-card">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h4>

                                    Delivery Address

                                </h4>

                                <button

                                    className="btn btn-success"

                                    onClick={() =>

                                        setShowForm(!showForm)

                                    }

                                >

                                    {

                                        showForm

                                        ?

                                        "Close"

                                        :

                                        "+ Add Address"

                                    }

                                </button>

                            </div>

                            {

                                addresses.length === 0 && !showForm && (

                                    <div className="empty-address">

                                        <h5>

                                            No address found

                                        </h5>

                                        <p>

                                            Please add your delivery address.

                                        </p>

                                    </div>

                                )

                            }

                            {

                                addresses.map(address => (

                                    <AddressCard

                                        key={address.id}

                                        address={address}

                                        selected={

                                            selectedAddress === address.id

                                        }

                                        onSelect={setSelectedAddress}

                                    />

                                ))

                            }

                            {

                                showForm && (

                                    <AddressForm

                                        onSuccess={() => {

                                            setShowForm(false);

                                            loadAddresses();

                                        }}

                                    />

                                )

                            }

                        </div>

                    </div>

                    <div className="col-lg-5">

                        <OrderSummary

                            loading={loading}

                            onPlaceOrder={handlePlaceOrder}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}