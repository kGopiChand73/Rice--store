import "./Hero.css";
import { Link } from "react-router-dom";
import heroRice from "../../assets/images/hero-rice.png";

export default function Hero() {
    return (
        <section className="hero">
            <div className="container">

                <div className="row align-items-center">

                    {/* Hero Image */}
                    <div className="col-lg-6 col-md-6 col-12 text-center order-1 order-lg-2">

                        <img
                            src={heroRice}
                            className="hero-image img-fluid"
                            alt="Premium Rice"
                        />

                    </div>

                    {/* Hero Content */}
                    <div className="col-lg-6 col-md-6 col-12 order-2 order-lg-1">

                        <span className="hero-badge">
                            🌾 Premium Quality Rice
                        </span>

                        <h1>
                            Farm-Fresh Rice,
                            <br />
                            Delivered To
                            <span className="text-success"> Your Doorstep</span>
                        </h1>

                        <p className="hero-description">
                            100% Natural Rice sourced directly from trusted
                            farmers. Fresh, healthy and delivered safely to
                            your home.
                        </p>

                        <div className="hero-trust">
                            ✅ Not Satisfied? Free Return Pickup — Kadiri Area Only
                        </div>

                        <div className="hero-buttons">

                            <Link
                                to="/products"
                                className="btn btn-warning btn-lg"
                            >
                                Shop Now
                            </Link>

                        </div>
                        <div className="hero-stats">

    <div className="hero-stat">
        <h3>25+</h3>
        <span>Rice Varieties</span>
    </div>

    <div className="hero-stat">
        <h3>1000+</h3>
        <span>Happy Customers</span>
    </div>

    <div className="hero-stat">
        <h3>24H</h3>
        <span>Fast Delivery</span>
    </div>

</div>

                        <div className="hero-telugu">

                            <h2 lang="te">
                                తాజా వరి బియ్యం,
                                <br />
                                మీ ఇంటికి నేరుగా
                            </h2>

                            <p lang="te">
                                100% సహజమైన బియ్యం —
                                రైతుల నుండి నేరుగా
                                మీ వంటగదికి.
                            </p>

                            <div
                                className="hero-trust telugu"
                                lang="te"
                            >
                                ✅ నచ్చకపోతే ఉచిత రిటర్న్
                                — కదిరి ప్రాంతంలో మాత్రమే
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}