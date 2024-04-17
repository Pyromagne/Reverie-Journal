import '../index.css';
import EllipseButton from '../components/EllipseButton';
import SubmitDreamModal from '../components/SubmitDreamModal';
import DigitalClock from '../components/DigitalClock';
import { inDreamCard } from '../components/DreamCard';
import { LuPlus } from "react-icons/lu";
import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { LocalizationProvider, DateCalendar} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { toast } from "react-toastify";
import { Masonry } from 'masonic';

const Home = () => {
  const [openSubmitDreamModal, setOpenSubmitDreamModal] = useState(false);
  const [dreams, setDreams] = useState([]);
  const {auth} = useAuth();
  const currentUserID = auth.userID;

  const fetchDreams = async () => {
    try {
      const response = await axios.get(`/fetch/${currentUserID}`,{withCredentials: true});
      setDreams(response.data);
      toast.success('Fetch Succesfully');
    } catch (error) {
      toast.error('Error fetching dreams:', error);
    }
  };
  useEffect(() => {
    console.log(dreams);
    fetchDreams();
  }, [openSubmitDreamModal]);

  return (
    <div className='flex flex-1 flex-col w-full'>
      <div className='flex flex-1 w-full md:flex-row flex-col-reverse'>
        <div className='flex flex-col p-4 w-3/4 bg-gray-400 rounded-md m-2'>
          {dreams.length === 0
          ? <p className='text-black text-center text-4xl'>No Dream found</p>
          : <Masonry 
            items={dreams}
            columnGutter={8}
            columnWidth={300}
            overscanBy={5}
            render={inDreamCard}
          />
          }
        </div>
        <div className='flex flex-col p-4 fixed right-0'>
          <p className='text-2xl mb-4'>Dream Calendar</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className='bg-slate-100 rounded' readOnly/>
            <span className='m-4'><DigitalClock /></span>
          </LocalizationProvider>
          <Button variant='outlined' color='primary' onClick={() => { setOpenSubmitDreamModal(true); }}>Add Dream</Button>
        </div>
      </div>
      
      <div>
        <SubmitDreamModal 
          openModal={openSubmitDreamModal}
          setOpenModal={setOpenSubmitDreamModal}
        />
      </div>

      <span className='fixed z-10 bottom-5 right-5 md:bottom-10 md:right-10 md:hidden block'>
        <EllipseButton name='Add' color='primary' isIcon={true} icon={<LuPlus size={28} />} 
          onClick={() => { setOpenSubmitDreamModal(true); }}
        />
      </span>
    </div>
  );
}

export default Home;
