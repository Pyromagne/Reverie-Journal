import '../index.css';
import { centuryGothicFont } from '../constants';
import EllipseButton from '../components/EllipseButton';
import DreamEntryModal from '../components/DreamEntryModal';
import DigitalClock from '../components/DigitalClock';
import DreamCard from '../components/DreamCard';
import useAuth from '../hooks/useAuth';
import useSignout from '../hooks/useSignout';
import { useNavigate } from 'react-router-dom';

import { LuPlus } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, DateCalendar} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Home = () => {
  const navigate = useNavigate();
  const [openDreamEntryModal, setOpenDreamEntryModal] = useState(false);
  const { auth } = useAuth();

  console.log(auth);

  const signout = useSignout();

  const handleSignout = async () => {
    await signout();
    navigate('/signin');
  }

  return (
    <div className='flex flex-col w-full bg-slate-700'>
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
      <div className='flex w-full h-dvh md:flex-row flex-col-reverse mt-20'>
        {/* <div className='flex md:w-3/4 w-full md:mb-0 mb-4 p-5 overflow-scroll justify-center flex-wrap'> */}
        <div className='flex md:w-3/4 w-full md:mb-0 mb-4 p-5'>
          <Grid container>
            <Grid item>
              <DreamCard></DreamCard>
            </Grid>
          </Grid>
        </div>
        <div className='flex md:w-1/4 w-full md:mb-0 mb-4 p-5 flex-col items-center justify-center md:justify-start'>
          <p className='text-2xl mb-4 text-slate-100'>Dream Calendar</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className='bg-slate-100 rounded' readOnly/>
            <span className='m-4'><DigitalClock /></span>
          </LocalizationProvider>
          {/* <Button variant='outlined' color='primary' className='w-1/2' sx={centuryGothicFont} style={{ marginTop: '20px' }}>Analysis</Button> */}
        </div>
      </div>
      
      <div>
        <DreamEntryModal 
          openModal={openDreamEntryModal}
          setOpenModal={setOpenDreamEntryModal}
        />
      </div>
      <span className='fixed z-10 bottom-5 right-5 md:bottom-10 md:right-10'>
        <EllipseButton name='Add' color='primary' isIcon={true} icon={<LuPlus size={28} />} 
          onClick={() => { setOpenDreamEntryModal(true); }}
        />
      </span>
    </div>
  );
}

export default Home;
