import { createContext, useState, useEffect } from 'react';

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);

  const [profileData, setProfileData] = useState(() => {
    const savedProfileData = localStorage.getItem('profileData');
    return savedProfileData ? JSON.parse(savedProfileData) : {};
  });

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

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
        profileData,
        setProfileData
      }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContext;