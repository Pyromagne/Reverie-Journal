import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { useEffect, useState } from "react";
import LoadingScreenOverlay from "./LoadingScreenOverlay";

const PrivateAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth } = useAuth();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

  if (isLoading) {
    return <LoadingScreenOverlay />
  }

  if (auth?.accessToken === undefined) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateAuth;
