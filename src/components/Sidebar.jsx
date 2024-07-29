import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import { LuArrowLeft } from "react-icons/lu";
import { LuArrowRight } from "react-icons/lu";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdHome, MdDashboard } from "react-icons/md";

import useAuth from "../hooks/useAuth";
import useLocalContext from "../hooks/useLocalContext";
import InitialProfile from "./InitialProfile";

import ProfileMenu from "./popoverMenus/ProfileMenu";

const Sidebar = () => {
  const [anchor, setAnchor] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isMiniSidebar, setSidebarType, profileData } = useLocalContext();

  const [placement, setPlacement] = useState("top-end");
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  const handleProfileMenuClick = event => {
    setIsProfileMenuOpen(prev => !prev);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setIsProfileMenuOpen(false);
  };

  const actions = [
    {
      name: 'Home',
      action: () => navigate('/'),
      icon: <MdHome size={24} />
    },
    {
      name: 'Dream\u00A0Board',
      action: () => navigate('/dreamboard'),
      icon: <MdDashboard size={24} />
    },
  ]

  useEffect(() => {
    if (isMiniSidebar) {
      setPlacement('top-start');
    } else setPlacement('top-end');
    console.log(profileData);
  }, [isMiniSidebar]);

  return (
    <aside className={`duration-200 g-outline flex flex-col ${isMiniSidebar ? 'w-20 px-4 py-6' : 'w-64 p-6'} rounded-3xl mx-3 my-2 shadow-lg`}>
      <div className="w-full flex flex-col h-full">
        <div className={`font-bold text-3xl flex ${isMiniSidebar ? 'justify-center' : 'justify-between'} items-center mb-10 h-20`}>
          {isMiniSidebar ? null :
            <div>
              <p>Reverie</p>
              <p>Journal</p>
            </div>
          }

          <div className="hover:cursor-pointer" onClick={setSidebarType}>
            {isMiniSidebar ? <LuArrowRight /> : <LuArrowLeft size={24} />}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {actions.map((button, index) => {
            return (
              <button key={index} onClick={button.action}>
                <div className={`flex items-center gap-3 ${isMiniSidebar ? 'justify-center' : 'justify-start'}`}>
                  {button.icon}
                  {
                    isMiniSidebar ? null : <p className="text-lg">{button.name}</p>
                  }
                </div>
              </button>
            )
          })}
        </div>
        {isMiniSidebar ?
          <div className="mt-auto flex justify-center mb-2" onClick={handleProfileMenuClick}>
            <InitialProfile data={profileData}/>
          </div>
          :
          <div className="flex justify-between items-end mt-auto mb-2">
            <div className="w-1/4">
              <InitialProfile data={profileData}/>
            </div>
            <div className="ml-2 overflow-hidden">
              <p className="font-semibold">{auth.username}</p>
              <p className="font-light text-sm truncate">{auth.email}</p>
            </div>
            <IoEllipsisHorizontalSharp size={24} className="hover:cursor-pointer select-none" onClick={handleProfileMenuClick} />
          </div>
        }

      </div>

      {isProfileMenuOpen &&
        <ClickAwayListener onClickAway={handleClose}>
          <BasePopup
            id={id}
            open={isProfileMenuOpen}
            anchor={anchor}
            placement={placement}
            offset={4}
          >
            <ProfileMenu />
          </BasePopup>
        </ClickAwayListener>
      }
    </aside>
  )
}

export default Sidebar;

{/* <div className="w-full">
  <div className={`flex w-full items-center ${isMiniSidebar ? 'justify-center' : 'justify-between'} mb-2`}>
    {
      isMiniSidebar ? <></> : <p className="font-bold text-lg tracking-wider">Reverie&nbsp;Journal</p>
    }
    <span className="hover:cursor-pointer select-none" onClick={handleProfileMenuClick}><LuMenu size={24} /></span>
  </div>
  <div className="w-full flex flex-col items-center">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gka0l1ZzNvolZQoaOUCZLAegXtk_mom0DA&s" alt="profile" className={`rounded-full w-32`} />
    <div className="w-full mt-2">
      {
        isMiniSidebar ? <></> : <p className="text-center text-ellipsis overflow-hidden text-xl tracking-wider">{auth.username}</p>
      }
    </div>
    <div className="w-full">
      {
        isMiniSidebar ? <></> : <p className="text-center text-ellipsis overflow-hidden text-gray-500 text-sm">{auth.email}</p>
      }
    </div>
  </div>
  <Divider className="w-full" />
  <div className="w-full flex flex-col items-center gap-1 mt-2">
    {actions.map((button, index) => {
      return (
        <button key={index} onClick={button.action} className="hover:bg-gray-200 rounded py-1 w-11/12">
          <div className={`flex items-center gap-2 p-2 ${isMiniSidebar ? 'justify-center' : 'justify-start'} text-gray-800`}>
            {button.icon}
            {
              isMiniSidebar ? <></> : <p className="font-semibold tracking-wider text-gray-600">{button.name}</p>
            }
          </div>
        </button>
      )
    })}
  </div>
</div> */}

{/* <div className="relative w-11/12 m-auto mb-4">
  <Divider />
  <div className="absolute inset-0 flex justify-center items-center" onClick={setSidebarType}>
    <span className="flex justify-center items-center w-8 h-8 bg-white rounded-full g-outline hover:bg-gray-200 hover:cursor-pointer hover:scale-110">
      {isMiniSidebar ? <LuArrowRight /> : <LuArrowLeft size={24} />}
    </span>
  </div>
</div> */}