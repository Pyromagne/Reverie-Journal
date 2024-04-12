import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)
    const [logon, setLogon] = useState(JSON.parse(localStorage.getItem("logon")) || false)

    useEffect(()=>{
        localStorage.setItem("logon", logon);
    },[logon])

    return(
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, logon, setLogon }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;