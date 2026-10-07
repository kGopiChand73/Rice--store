import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../common/Button/Button";

import "./StoreSettings.css";

export default function StoreSettings() {
    const [settings, setSettings] = useState({
        storeName: "Khadri RiceStore",
        contactEmail: "",
        contactPhone: "",
        address: "",
        deliveryCharge: "",
        codEnabled: true,
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSave(e) {
        e.preventDefault();
        // TODO: wire up to a real settings API endpoint when available
        toast.success("Settings saved successfully");
    }

    return (
        <div className="store-settings">
            <h2>Store Settings</h2>

            <form onSubmit={handleSave}>
                <div className="row">
                    <div className="col-md-6">
                        <label>Store Name</label>
                        <input
                            className="form-control"
                            name="storeName"
                            value={settings.storeName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="contactEmail"
                            value={settings.contactEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Contact Phone</label>
                        <input
                            className="form-control"
                            name="contactPhone"
                            value={settings.contactPhone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Delivery Charge (₹)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="deliveryCharge"
                            value={settings.deliveryCharge}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <label>Store Address</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-check mt-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="codEnabled"
                        checked={settings.codEnabled}
                        onChange={handleChange}
                    />
                    <label>Enable Cash on Delivery</label>
                </div>

                <Button type="submit">Save Settings</Button>
            </form>
        </div>
    );
}