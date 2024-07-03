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

  const btncls = "hover:cursor-pointer hover:bg-gray-200 px-1 rounded";

  return (
    <div className="font-light g-outline bg-white py-2 p-2 w-52 rounded-md flex flex-col">
      <div className="flex flex-col items-center text-center mb-6">
        <p className="font-semibold">{auth.username}</p>
        <p className="text-sm mb-2">{auth.email}</p>
        <p className="text-sm rounded-full p-1 g-outline w-fit px-2 hover:cursor-pointer hover:scale-105 duration-200">Edit Profile</p>
      </div>
      <hr className="mb-2"/>
      <div className="text-sm flex flex-col gap-1">
        <p className={btncls}>Themes</p>
        <p className={btncls}>Settings</p>
        <p className={btncls} onClick={handleSignout}>Sign Out</p>
      </div>
    </div>
  )
}

export default ProfileMenu;