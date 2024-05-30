import React from "react";
import useSignout from "../../hooks/useSignout";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useLocalContext from "../../hooks/useLocalContext";

const ProfileMenu = () => {
  const { auth } = useAuth();
  const signout = useSignout();
  const navigate = useNavigate();
  const {isMiniSidebar, setSidebarType} = useLocalContext();

  const handleSignout = async () => {
    await signout();

    navigate('/signin');
  }

  const btncls = "hover:cursor-pointer text-sm hover:bg-gray-200 px-1 rounded";

  return (
    <div className="g-outline bg-white py-2 p-2 w-32 rounded-md flex flex-col gap-1">
      <p className={btncls} onClick={handleSignout}>Sign Out</p>
      <p className={btncls} onClick={setSidebarType}>{isMiniSidebar?`Show`:`Hide`}</p>
    </div>
  )
}

export default ProfileMenu;