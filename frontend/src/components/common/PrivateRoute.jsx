import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return <Loader />;

    }

    return user ? children : <Navigate to="/" replace />;

}