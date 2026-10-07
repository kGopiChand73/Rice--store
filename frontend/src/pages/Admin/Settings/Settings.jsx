import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/common/Button/Button";

import StoreInfoCard from "../../components/admin/Settings/StoreInfoCard";
import DeliverySettings from "../../components/admin/Settings/DeliverySettings";
import WhatsAppSettings from "../../components/admin/Settings/WhatsAppSettings";
import AppearanceSettings from "../../components/admin/Settings/AppearanceSettings";
import BusinessHours from "../../components/admin/Settings/BusinessHours";

import {
    getSettings,
    updateSettings,
} from "../../services/settingsService";

import "./Settings.css";

export default function Settings() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        store_name: "",
        email: "",
        phone: "",
        delivery_charge: 0,
        minimum_order: 500,
        cod_enabled: true,
        whatsapp: "",
        message: "Hello, I want to place an order.",
        theme: "Light",
        primary_color: "Green",
        opening_time: "09:00",
        closing_time: "20:00",
        logo: null,
    });

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            const res = await getSettings();
            setForm({ ...form, ...res.data });
        } catch {
            toast.error("Unable to load settings.");
        }
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    }

    function handleLogo(e) {
        setForm({
            ...form,
            logo: e.target.files[0],
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const data = new FormData();

        Object.keys(form).forEach(key => {
            if (form[key] !== null) {
                data.append(key, form[key]);
            }
        });

        try {
            await updateSettings(data);

            toast.success(
                "Settings updated successfully."
            );
        } catch {
            toast.error(
                "Unable to update settings."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className="settings-page"
            onSubmit={handleSubmit}
        >
            <h2>Store Settings</h2>

            <StoreInfoCard
                form={form}
                handleChange={handleChange}
                handleLogo={handleLogo}
            />

            <DeliverySettings
                form={form}
                handleChange={handleChange}
            />

            <WhatsAppSettings
                form={form}
                handleChange={handleChange}
            />

            <AppearanceSettings
                form={form}
                handleChange={handleChange}
            />

            <BusinessHours
                form={form}
                handleChange={handleChange}
            />

            <Button
                loading={loading}
                type="submit"
            >
                Save Changes
            </Button>
        </form>
    );
}