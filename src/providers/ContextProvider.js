import { React, createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  const setSidebarType = () => {
    setIsMiniSidebar(prev => !prev);
  }

  return (
    <StateContext.Provider
      value={{
        modal,
        setModal,
        isMiniSidebar,
        setIsMiniSidebar,
        setSidebarType,
      }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContext;