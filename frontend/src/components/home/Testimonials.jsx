import "./Testimonials.css";

const testimonials = [

    {
        name: "Sekhar",
        city: "Kadiri",
        image: "/images/users/ram.jpeg",
        review:
            "Very fresh rice and excellent packaging. Highly recommended.",
        rating: 5,
    },

    {
        name: "Mahi",
        city: "Kadiri",
        image: "/images/users/user2.jpg",
        review:
            "Fast delivery with Cash on Delivery. Great shopping experience.",
        rating: 5,
    },

    {
        name: "Ajay",
        city: "Kadiri",
        image: "/images/users/user3.jpg",
        review:
            "Excellent quality rice at a reasonable price. Will order again.",
        rating: 5,
    },
    {
        name: "Sunil",
        city: "Kadiri",
        image: "/images/users/user3.jpg",
        review:
            "Best customer support.",
        rating: 5,
    },

];

function getInitials(name) {

    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

}

export default function Testimonials() {

    function handleImageError(event, name) {

        // Hide the broken image and reveal the initials fallback next to it
        event.target.style.display = "none";
        const fallback = event.target.nextElementSibling;
        if (fallback) fallback.style.display = "flex";

    }

    return (

        <section className="testimonials-section">

            <div className="container">

                <div className="text-center section-heading">

                    <h2 className="section-title">
                        What Our Customers Say
                    </h2>

                    <p className="section-subtitle">
                        Trusted by hundreds of happy families across Andhra Pradesh.
                    </p>

                </div>

                <div className="row g-3 g-md-4">

                    {

                        testimonials.map((item, index) => (

                            <div
                                key={index}
                                className="col-lg-4 col-md-6 col-6"
                            >

                                <div className="testimonial-card">

                                    <div className="quote-icon">
                                        ❝
                                    </div>

                                    <div className="stars">

                                        {"⭐".repeat(item.rating)}

                                    </div>

                                    <p className="review">

                                        {item.review}

                                    </p>

                                    <div className="customer">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(e) => handleImageError(e, item.name)}
                                        />

                                        <div
                                            className="customer-avatar-fallback"
                                            aria-hidden="true"
                                        >
                                            {getInitials(item.name)}
                                        </div>

                                        <div>

                                            <h6>
                                                {item.name}
                                            </h6>

                                            <small>
                                                {item.city}
                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}