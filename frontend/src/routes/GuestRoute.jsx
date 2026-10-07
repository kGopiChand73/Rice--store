import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    if (user) {

        return <Navigate to="/" replace />;

    }

    return children;

}