import '../index.css';
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
    <div className='flex flex-1 flex-col w-full overflow-auto'>
      <div className='flex flex-1 w-full md:flex-row flex-col-reverse'>
        <div className='flex flex-col p-4 w-full bg-gray-400 rounded-md m-2 gap-4'>

          {loading ? <LoadingScreenOverlay style={`flex w-full h-full justify-center`} message={`Please Wait`} />
            : dreams.length === 0
              ? <p className='text-black text-center text-4xl'>No Dream found</p>
              : dreams.map((dream, index) => (
                <DreamCard2 key={index} dream={dream} onCardClick={() => { setOpenViewDreamModal(true); setModal(true); setSelectedDream(dream) }} />
              ))
          }

        </div>
      </div>
      <div className='fixed z-10 bottom-8 right-8 hover:cursor-pointer bg-white rounded-lg w-12 h-12 flex justify-center items-center shadow-lg g-outline' onClick={() => { setOpenSubmitDreamModal(true); setModal(true) }}>
        <LuPlus size={24} />
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
