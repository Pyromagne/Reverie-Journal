import axios from "../api/axios";
import useAuth from "./useAuth";

const useSignout = () => {
    const {setAuth} = useAuth();

    const signout = async () => {
        setAuth({});

        try {
            const response = await axios('./signout' , {
                withCredentials: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    return signout;
}

export default useSignout;