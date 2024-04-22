import React from "react";
import { centuryGothicFont } from '../constants';
import {Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSignout from '../hooks/useSignout';
import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import useLocalContext from "../hooks/useLocalContext";

const HomeLayout = () => {
  const { auth } = useAuth();
  const { modal } = useLocalContext();
  const navigate = useNavigate();

  const signout = useSignout();

  const handleSignout = async () => {
    await signout();

    navigate('/signin');
  }

  return(
    <div className={`homeLayout flex flex-col h-screen`}>
    {/* TEMPORARY REMOVED : BLUR EFFECT CANCEL FIXED ELEMENT */}
    {/* <div className={`homeLayout flex flex-col h-screen ${modal? 'blur-sm': 'blur-none'}`}> */}

      <div className='flex items-center justify-center md:justify-between w-full fixed bg-white pb-4 z-50'>
        <div className='flex items-center justify-center md:justify-between'>
          <p className='font-normal md:text-4xl text-2xl padding md:p-4 p-2'>Reverie Journal </p>
          <p className=' font-normal md:text-2xl text-2xl'>{`[${auth?.username} | ${auth?.email}]`}</p>
        </div>
        <div className='md:flex p-4 hidden gap-2'>
          <Button variant='outlined' color='primary' onClick={handleSignout}>Sign Out</Button>
        </div>
      </div>

      <div className='flex-1 flex flex-col w-full mt-20'>
        <Outlet />
      </div>
      
    </div>
  )
}

export default HomeLayout;