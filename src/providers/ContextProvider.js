import { React, createContext, useContext, useState, useEffect  } from 'react';

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [modal, setModal] = useState(false);

    return(
        <StateContext.Provider 
        value={{
            modal,
            setModal
        }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateContext;