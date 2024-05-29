import { useState, useEffect } from "react";
import LoadingScreenOverlay from "../components/LoadingScreenOverlay";
import { Masonry } from 'masonic';
import DreamCard from "../components/DreamCard";
import useLocalContext from "../hooks/useLocalContext";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import ViewDreamModal from "../components/ViewDreamModal";


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
    /* toast.success('Fetch Succesfully'); */
  }, []);

  return (
    <div className="flex flex-1 flex-col w-full overflow-auto">
      <div className='flex flex-1 w-full md:flex-row flex-col-reverse'>
        <div className='gradient flex flex-col p-4 w-full rounded-md m-2 gap-4'>

          {loading ? <LoadingScreenOverlay style={`flex w-full h-full justify-center`} message={`Please Wait`} /> :
            dreams.length === 0
              ? <p className='text-black text-center text-4xl'>No Dream found</p>
              : <Masonry
                items={dreams}
                columnGutter={8}
                columnWidth={300}
                overscanBy={5}
                render={({ index, data: dream }) => (
                  <DreamCard key={index} dream={dream} onclose={closeModal} onCardClick={() => { setOpenViewDreamModal(true); setModal(true); setSelectedDream(dream) }} />
                )}
              />
          }
        </div>
      </div>

      <div>
        <ViewDreamModal
          openModal={openViewDreamModal}
          setOpenModal={setOpenViewDreamModal}
          dream={selectedDream}
          onDelete={fetchDreams}
          delete={false}
        />
      </div>
    </div>
  )
};

export default DreamBoard;
