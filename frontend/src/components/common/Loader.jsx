import Spinner from "react-bootstrap/Spinner";

export default function Loader() {

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >

            <Spinner
                animation="border"
                variant="success"
            />

        </div>

    );

}