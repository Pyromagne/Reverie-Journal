import { React, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Divider } from "@mui/material";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuMenu } from "react-icons/lu";
import ProfileMenu from "./popoverMenu/ProfileMenu";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigate } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import useLocalContext from "../hooks/useLocalContext";

const Sidebar = () => {
  const [anchor, setAnchor] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isMiniSidebar } = useLocalContext();

  const [placement, setPlacement] = useState("bottom-end");
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
      icon: <LuHome size={18} />
    },
    {
      name: 'Dream Board',
      action: () => navigate('/dreamboard'),
      icon: <LuLayoutDashboard size={18} />
    },
  ]

  useEffect(() => {
    if (isMiniSidebar) {
      setPlacement('right-start');
    } else setPlacement('bottom-end');
  }, [isMiniSidebar]);

  return (
    <aside className={`g-outline flex flex-col bg-white ${isMiniSidebar ? 'w-16' : 'w-52'} rounded-xl mx-3 my-2 shadow-lg items-center py-4 px-2`}>
      <div className="w-full flex flex-col items-center">
        <div className={`flex w-full items-center ${isMiniSidebar ? 'justify-center' : 'justify-between'} mb-2`}>
          {
            isMiniSidebar ? <></> : <p>Reverie&nbsp;Journal</p>
          }
          <span className="hover:cursor-pointer select-none" onClick={handleProfileMenuClick}><LuMenu size={24} /></span>
        </div>
        <div className="w-full flex flex-col items-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gka0l1ZzNvolZQoaOUCZLAegXtk_mom0DA&s" alt="profile" className={`rounded-full w-32`} />
          <div className="w-full my-2">
            {
              isMiniSidebar ? <></> : <p className="text-center text-ellipsis overflow-hidden">{auth.username}</p>
            }
          </div>
        </div>
        <Divider className="w-11/12" />
        <div className="w-full flex flex-col items-center gap-1 mt-2">
          {actions.map((button, index) => {
            return (
              <button key={index} onClick={button.action} className="hover:bg-gray-200 rounded py-1 w-11/12">
                <div className={`flex items-center gap-2 p-2 ${isMiniSidebar ? 'justify-center' : 'justify-start'}`}>
                  {button.icon}
                  {
                    isMiniSidebar ? <></> : <p>{button.name}</p>
                  }
                </div>
              </button>
            )
          })}
        </div>
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