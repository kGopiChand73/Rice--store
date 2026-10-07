import "./WhyChooseUs.css";

const features = [

    {
        icon: "bi bi-truck",
        title: "Fast Delivery",
        description: "Fresh rice delivered quickly to your doorstep."
    },

    {
        icon: "bi bi-award",
        title: "Premium Quality",
        description: "Only carefully selected high-quality rice varieties."
    },

    {
        icon: "bi bi-cash-stack",
        title: "Cash On Delivery",
        description: "Pay only after your order is delivered."
    },

    {
        icon: "bi bi-whatsapp",
        title: "WhatsApp Ordering",
        description: "Place your order instantly through WhatsApp."
    }

];

export default function WhyChooseUs() {

    return (

        <section className="why-section">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="section-title">

                        Why Choose Rice Store

                    </h2>

                    <p className="section-subtitle">

                        Quality rice, trusted service and hassle-free shopping.

                    </p>

                </div>

                <div className="row g-3 g-md-4">

                    {

                        features.map((feature, index) => (

                            <div
                                className="col-lg-3 col-md-6 col-6"
                                key={index}
                            >

                                <div className="feature-card">

                                    <div className="feature-icon">

                                        <i className={feature.icon}></i>

                                    </div>

                                    <h5>

                                        {feature.title}

                                    </h5>

                                    <p>

                                        {feature.description}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}