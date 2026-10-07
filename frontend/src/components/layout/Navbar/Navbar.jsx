import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {

    const { user } = useAuth();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 15);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    useEffect(() => {

        if (menuOpen) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [menuOpen]);

    function closeMenu() {

        setMenuOpen(false);

    }

    return (

        <>

            {/* Overlay */}

            <div
                className={`mobile-overlay ${menuOpen ? "show" : ""}`}
                onClick={closeMenu}
            ></div>

            <nav
                className={`navbar navbar-expand-lg sticky-top ${
                    scrolled ? "navbar-scrolled" : ""
                }`}
            >

                <div className="container">

                    {/* Logo */}

                    <Link
                        className="navbar-brand"
                        to="/"
                    >

                        <span className="brand-icon">
                            🌾
                        </span>

                        <span className="brand-text">
                            Khadri Rice Store
                        </span>

                    </Link>

                    {/* Desktop Menu */}

                    <div className="desktop-menu d-none d-lg-flex">

                        <NavLink
                            to="/products"
                            className="nav-link"
                        >
                            Products
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className="nav-link"
                        >
                            Cart
                        </NavLink>

                        <NavLink
                            to="/orders"
                            className="nav-link"
                        >
                            Orders
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className="nav-link"
                        >
                            Profile
                        </NavLink>

                        {

                            user?.is_staff && (

                                <NavLink
                                    to="/admin"
                                    className="nav-link"
                                >
                                    Admin
                                </NavLink>

                            )

                        }

                    </div>

                    {/* Mobile Toggle */}

                    <button
                        className={`navbar-toggler ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </nav>

            {/* Mobile Drawer */}

            <aside
                className={`mobile-menu ${menuOpen ? "show" : ""}`}
            >

                {/* Drawer Header */}

                <div className="mobile-header">

                    <div className="mobile-logo">

                        <span className="logo-icon">
                            🌾
                        </span>

                        <div>

                            <h5>
                                Khadri Rice Store
                            </h5>

                            <small>
                                Premium Quality Rice
                            </small>

                        </div>

                    </div>

                    <button
                        className="close-menu"
                        onClick={closeMenu}
                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>

                {/* Navigation */}

                <ul className="navbar-nav">

                    <li className="nav-item">

                        <NavLink
                            to="/products"
                            className="nav-link"
                            onClick={closeMenu}
                        >

                            <i className="bi bi-grid"></i>

                            <span>
                                Products
                            </span>

                        </NavLink>

                    </li>

                    <li className="nav-item">

                        <NavLink
                            to="/cart"
                            className="nav-link"
                            onClick={closeMenu}
                        >

                            <i className="bi bi-cart3"></i>

                            <span>
                                Cart
                            </span>

                        </NavLink>

                    </li>

                    <li className="nav-item">

                        <NavLink
                            to="/orders"
                            className="nav-link"
                            onClick={closeMenu}
                        >

                            <i className="bi bi-bag-check"></i>

                            <span>
                                Orders
                            </span>

                        </NavLink>

                    </li>

                    <li className="nav-item">

                        <NavLink
                            to="/profile"
                            className="nav-link"
                            onClick={closeMenu}
                        >

                            <i className="bi bi-person-circle"></i>

                            <span>
                                Profile
                            </span>

                        </NavLink>

                    </li>

                    {

                        user?.is_staff && (

                            <li className="nav-item">

                                <NavLink
                                    to="/admin"
                                    className="nav-link"
                                    onClick={closeMenu}
                                >

                                    <i className="bi bi-speedometer2"></i>

                                    <span>
                                        Admin
                                    </span>

                                </NavLink>

                            </li>

                        )

                    }

                </ul>

                {/* Contact Section */}

                <div className="mobile-footer">

                    <h6>
                        Contact Us
                    </h6>

                    <p>

                        <i className="bi bi-telephone-fill"></i>

                        +91 97040 77705

                    </p>

                    <p>

                        <i className="bi bi-geo-alt-fill"></i>

                        Kadiri, Andhra Pradesh

                    </p>

                    <p>

                        <i className="bi bi-clock-fill"></i>

                        Mon - Sat | 9 AM - 8 PM

                    </p>

                    <div className="mobile-social">

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <i className="bi bi-facebook"></i>

                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <i className="bi bi-instagram"></i>

                        </a>

                        <a
                            href="https://wa.me/919704077705"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <i className="bi bi-whatsapp"></i>

                        </a>

                    </div>

                    <div className="drawer-badges">

                        <span>🌾 Farm Fresh</span>

                        <span>🚚 Fast Delivery</span>

                        <span>💰 Cash On Delivery</span>

                    </div>

                </div>

            </aside>

        </>

    );

}