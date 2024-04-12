import axios from "../api/axios";
import useAuth from "./useAuth";

const useSignout = () => {
    const {setAuth, setLogon} = useAuth();

    const signout = async () => {
        setAuth({});
        setLogon(false);
        
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