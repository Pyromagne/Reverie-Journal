import { useState, useEffect } from "react";
import {Outlet} from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

import LoadingScreenOverlay from "./LoadingScreenOverlay";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist } = useAuth();

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

    return (
        <> 
            {
                !persist 
                ? <Outlet /> 
                : isLoading 
                    ? <LoadingScreenOverlay />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;