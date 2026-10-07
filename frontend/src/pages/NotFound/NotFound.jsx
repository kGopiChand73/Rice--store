import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {

    return (

        <div className="not-found-page">

            <div className="container py-5 text-center">

                <h1 className="display-1">

                    404

                </h1>

                <h4>

                    Page Not Found

                </h4>

                <p>

                    The page you are looking for doesn't exist.

                </p>

                <Link

                    to="/"

                    className="btn btn-success mt-3"

                >

                    Go Back Home

                </Link>

            </div>

        </div>

    );

}