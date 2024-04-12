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
    <div className="homeLayout">
       <div className='flex items-center justify-center md:justify-between w-full fixed left-0 top-0 bg-slate-800'>
        <div className='flex items-center justify-center md:justify-between'>
          <p className='text-slate-100 font-normal md:text-4xl text-2xl padding md:p-4 p-2'>Reverie Journal </p>
          <p className='text-slate-100 font-normal md:text-2xl text-2xl'>{`[${auth?.username} | ${auth?.email}]`}</p>
        </div>
        <div className='md:flex p-4 hidden gap-2'>
          <Button variant='outlined' color='primary' href='https://github.com/Pyromagne/Reverie-Journal' target="_blank" 
          startIcon={<SiGithub />} sx={centuryGothicFont}>Github</Button>
          <Button variant='outlined' color='primary' onClick={handleSignout}>Sign Out</Button>
        </div>
      </div>

      <Outlet />
      
    </div>
  )
}

export default HomeLayout;