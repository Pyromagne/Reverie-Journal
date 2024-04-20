import '../index.css';
import EllipseButton from '../components/EllipseButton';
import SubmitDreamModal from '../components/SubmitDreamModal';
import DigitalClock from '../components/DigitalClock';
import { DreamCard } from '../components/DreamCard';
import { LuPlus } from "react-icons/lu";
import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { LocalizationProvider, DateCalendar} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { toast } from "react-toastify";
import { Masonry } from 'masonic';
import useLocalContext from '../hooks/useLocalContext';
import ViewDreamModal from '../components/ViewDreamModal';
import LoadingScreenOverlay from '../components/LoadingScreenOverlay';

const Home = () => {
  const [openSubmitDreamModal, setOpenSubmitDreamModal] = useState(false);
  const [openViewDreamModal, setOpenViewDreamModal] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  const {auth} = useAuth();
  const {setModal} = useLocalContext();
  const currentUserID = auth.userID;

  const fetchDreams = async () => {
    try {
      const response = await axios.get(`/fetch/${currentUserID}`,{withCredentials: true});
      setDreams(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching dreams:', error);
    }
  };

  const closeModal = () => {
    setSelectedDream(null);
  };

  useEffect(() => {
    fetchDreams();
    toast.success('Fetch Succesfully');
  }, []);

  return (
    <div className='flex flex-1 flex-col w-full'>
      <div className='flex flex-1 w-full md:flex-row flex-col-reverse'>
        <div className='flex flex-col p-4 sm:w-full md:w-1/2 lg:w-1/2 xl:w-3/4 bg-gray-400 rounded-md m-2'>
          {loading ? <LoadingScreenOverlay style={`flex w-full h-full justify-center`} message={`Please Wait`}/>:
          dreams.length === 0
          ? <p className='text-black text-center text-4xl'>No Dream found</p>
          : <Masonry 
              items={dreams}
              columnGutter={8}
              columnWidth={300}
              overscanBy={5}
              render={({ index, data: dream }) => (
                <DreamCard key={index} dream={dream} onclose={closeModal} onCardClick={() => {setOpenViewDreamModal(true);setModal(true);setSelectedDream(dream) }}/>
              )}
            />
          }
        </div>
        <div className='flex flex-col p-4 items-center bg-gray-400 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/4 m-2 rounded'>
          <p className='text-2xl mb-4'>Dream Calendar</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className='bg-slate-100 rounded' readOnly/>
            <span className='m-4'><DigitalClock /></span>
          </LocalizationProvider>
          <Button variant='outlined' color='primary' onClick={() => { setOpenSubmitDreamModal(true);setModal(true) }}>Add Dream</Button>
        </div>
      </div>
      
      <div>
        <SubmitDreamModal 
          openModal={openSubmitDreamModal}
          setOpenModal={setOpenSubmitDreamModal}
          onSubmit={fetchDreams}
        />
        <ViewDreamModal 
          openModal={openViewDreamModal}
          setOpenModal={setOpenViewDreamModal}
          dream={selectedDream}
        />
      </div>

      <span className='fixed z-10 bottom-5 right-5 md:bottom-10 md:right-10 sm:hidden block'>
        <EllipseButton name='Add' color='primary' isIcon={true} icon={<LuPlus size={28} />} 
          onClick={() => { setOpenSubmitDreamModal(true);setModal(true) }}
        />
      </span>
    </div>
  );
}

export default Home;
