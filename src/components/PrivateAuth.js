import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken !== undefined
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default PrivateAuth;