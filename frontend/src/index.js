import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./assets/css/global.css";
import "./assets/css/animations.css";
import "./assets/css/responsive.css";

import AOS from "aos";
import "aos/dist/aos.css";

import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

AOS.init({
    duration: 800,
    once: true,
});

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>

        <AuthProvider>

            <CartProvider>

                <App />

                <Toaster position="top-right" />

            </CartProvider>

        </AuthProvider>

    </React.StrictMode>
);