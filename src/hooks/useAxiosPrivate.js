import { useEffect } from "react";

import useAuth from "./useAuth";
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    
    useEffect(() => {

        const requestIntercept =axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responeIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responeIntercept);
        }
    },[auth, refresh])

    return axiosPrivate;
    
}

export default useAxiosPrivate;