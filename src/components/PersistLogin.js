import {Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

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
                //console.error(error);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    /* useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]) */

    return (
        <> 
            {
                !persist 
                ? <Outlet /> 
                : isLoading 
                    ? <p>Loading...</p> 
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;