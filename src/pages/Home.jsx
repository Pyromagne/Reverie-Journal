import SubmitDreamModal from '../components/modals/SubmitDreamModal';
import { DreamCard2 } from '../components/DreamCard';
import { LuPlus } from "react-icons/lu";
import { React, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { toast } from "react-toastify";
import useLocalContext from '../hooks/useLocalContext';
import ViewDreamModal from '../components/modals/ViewDreamModal';
import LoadingScreenOverlay from '../components/LoadingScreenOverlay';
import illustration from '../assets/illustrations/Dreamer-rafiki.svg';

const Home = () => {
  const [openSubmitDreamModal, setOpenSubmitDreamModal] = useState(false);
  const [openViewDreamModal, setOpenViewDreamModal] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const { setModal } = useLocalContext();
  const currentUserID = auth.userID;

  const fetchDreams = async () => {
    try {
      const response = await axios.get(`/fetch/${currentUserID}`, { withCredentials: true });
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
    <div className='flex overflow-hidden h-full'>
      <div className='relative flex w-4/6 g-outline rounded-3xl overflow-y-auto m-2'>
        <div className='absolute z-10 bottom-8 right-8 hover:cursor-pointer bg-white rounded-full w-12 h-12 flex justify-center items-center shadow-lg g-outline' onClick={() => { setOpenSubmitDreamModal(true); setModal(true) }}>
          <LuPlus size={24} />
        </div>
        <div className='relative overflow-y-auto mr-2 my-4 w-full'>
          <div className='flex flex-col p-4 gap-4 h-full'>
            {loading ? <LoadingScreenOverlay style={`flex w-full justify-center h-full`} message={`Please Wait`} />
              : dreams.length === 0
                ?
                <div className='flex flex-col items-center mt-20'>
                  <img src={illustration} alt="no dream found" className='w-1/2' />
                  <p className='font-light text-center text-2xl'>Start your journey by creating your first dream entry!</p>
                </div>
                : dreams.map((dream, index) => (
                  <div key={index}>
                    <DreamCard2 dream={dream} onCardClick={() => { setOpenViewDreamModal(true); setModal(true); setSelectedDream(dream) }} />
                  </div>
                ))
            }
          </div>
        </div>
      </div>

      <div className='flex w-2/6 g-outline rounded-3xl overflow-y-auto m-2'>
        <div className='relative overflow-y-auto mr-2 my-4'>
          <div className='flex flex-col p-4'>

          </div>
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
          onDelete={fetchDreams}
          delete={true}
        />
      </div>
    </div>
  );
}

export default Home;
