import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Masonry from '@mui/lab/Masonry';

import useAuth from "../hooks/useAuth";
import useLocalContext from "../hooks/useLocalContext";
import axios from "../api/axios";

import DreamCard from "../components/DreamCard";
import ViewDreamModal from "../components/modals/ViewDreamModal";
import LoadingScreenOverlay from "../components/LoadingScreenOverlay";


const DreamBoard = () => {
  const [loading, setLoading] = useState(true);
  const [dreams, setDreams] = useState([]);
  const [selectedDream, setSelectedDream] = useState(null);
  const [openViewDreamModal, setOpenViewDreamModal] = useState(false);
  const { setModal } = useLocalContext();
  const { auth } = useAuth();
  const currentUserID = auth.userID;

  const closeModal = () => {
    setSelectedDream(null);
  };

  const fetchDreams = async () => {
    try {
      const response = await axios.get(`/fetch/${currentUserID}`, { withCredentials: true });
      setDreams(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching dreams:', error);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);


  return (
    <div className="flex overflow-hidden h-full">
      <div className='flex w-full g-outline rounded-3xl overflow-y-auto m-2'>
        <div className='relative overflow-y-auto mr-2 my-4 w-full'>
          <div className='flex flex-col p-6 w-full h-full rounded-md gap-4'>
            {loading ? <LoadingScreenOverlay style={`flex w-full justify-center h-full`} message={`Please Wait`} /> :
              dreams.length === 0
                ? <p className='text-black text-center text-4xl'>No Dream found</p>
                :
                <Masonry columns={3} spacing={1}>
                  {dreams.map((dream, index) => (
                    <DreamCard key={index} dream={dream} onclose={closeModal} onCardClick={() => { setOpenViewDreamModal(true); setModal(true); setSelectedDream(dream) }} />
                  ))}
                </Masonry>
            }
          </div>
        </div>
      </div>

      <div>
        <ViewDreamModal
          openModal={openViewDreamModal}
          setOpenModal={setOpenViewDreamModal}
          dream={selectedDream}
          onDelete={fetchDreams}
          delete={true}
        />
      </div>
    </div>
  )
};

export default DreamBoard;
