import '../index.css';
import { centuryGothicFont } from '../constants';
import EllipseButton from '../components/EllipseButton';
import DreamEntryModal from '../components/DreamEntryModal';

import { LuPlus } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { useState } from 'react';
import { Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, DateCalendar} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Home() {
  const [openDreamEntryModal, setOpenDreamEntryModal] = useState(false);

  return (
    <div className='flex'>
      <div className='flex items-center justify-between w-full'>
        <p className='text-slate-300 font-normal text-4xl padding p-4'>Reverie Journal</p>
        <div className=' p-4'>
          <Button variant='outlined' color='primary' href='https://github.com/Pyromagne/Reverie-Journal' target="_blank" startIcon={<SiGithub />} sx={centuryGothicFont}>Github</Button>
        </div>
      </div>
      <div>
        <DreamEntryModal 
          openModal={openDreamEntryModal}
          setOpenModal={setOpenDreamEntryModal}
        />
      </div>
      <span className='absolute z-10 bottom-5 right-5 md:bottom-10 md:right-10'>
        <EllipseButton name='Add' color='primary' isIcon={true} icon={<LuPlus size={28} />} 
          onClick={() => { setOpenDreamEntryModal(true); }}
        />
      </span>
    </div>
  );
}

export default Home;
