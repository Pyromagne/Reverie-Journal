import '../index.css';
import { centuryGothicFont } from '../constants';
import EllipseButton from '../components/EllipseButton';
import DreamEntryModal from '../components/DreamEntryModal';
import DigitalClock from '../components/DigitalClock';

import { LuPlus } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { useState } from 'react';
import { Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, DateCalendar} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Home() {
  const [openDreamEntryModal, setOpenDreamEntryModal] = useState(false);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-center md:justify-between w-full fixed left-0 top-0 bg-slate-800'>
        <p className='text-slate-100 font-normal md:text-4xl text-2xl padding md:p-4 p-2'>Reverie Journal</p>
        <div className=' p-4 hidden md:block'>
          <Button variant='outlined' color='primary' href='https://github.com/Pyromagne/Reverie-Journal' target="_blank" 
          startIcon={<SiGithub />} sx={centuryGothicFont}>Github</Button>
        </div>
      </div>
      <div className='flex w-full h-dvh md:flex-row flex-col mt-20'>
        <div className='flex md:w-3/4 w-full md:mb-0 mb-4 p-5'>
          <p className='text-2xl mb-4 text-slate-100'>No Dream Entry</p>
        </div>
        <div className='flex md:w-1/4 w-full md:mb-0 mb-4 p-5 flex-col items-center'>
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
