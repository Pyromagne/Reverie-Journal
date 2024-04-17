import React from "react";
import { centuryGothicFont } from '../constants';
import {Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSignout from '../hooks/useSignout';
import {Button} from "@mui/material";
import { SiGithub } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const HomeLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const signout = useSignout();

  const handleSignout = async () => {
    await signout();

    navigate('/signin');
  }

  return(
    <div className="homeLayout flex flex-col h-screen">
      <div className='flex items-center justify-center md:justify-between w-full fixed bg-white z-10'>
        <div className='flex items-center justify-center md:justify-between'>
          <p className='font-normal md:text-4xl text-2xl padding md:p-4 p-2'>Reverie Journal </p>
          <p className=' font-normal md:text-2xl text-2xl'>{`[${auth?.username} | ${auth?.email}]`}</p>
        </div>
        <div className='md:flex p-4 hidden gap-2'>
          <Button variant='outlined' color='primary' href='https://github.com/Pyromagne/Reverie-Journal' target="_blank" 
          startIcon={<SiGithub />} sx={centuryGothicFont}>Github</Button>
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