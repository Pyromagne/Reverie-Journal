import { useState, useEffect } from "react";
import LoadingScreenOverlay from "../components/LoadingScreenOverlay";
import DreamCard from "../components/DreamCard";
import useLocalContext from "../hooks/useLocalContext";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import ViewDreamModal from "../components/modals/ViewDreamModal";
import Masonry from '@mui/lab/Masonry';


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

  const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

  return (
    <div className="flex flex-1 flex-col w-full overflow-auto">
      <div className='flex flex-1 w-full md:flex-row flex-col-reverse'>
        <div className='gradient flex flex-col p-4 w-full rounded-md m-2 gap-4'>

          {loading ? <LoadingScreenOverlay style={`flex w-full h-full justify-center`} message={`Please Wait`} /> :
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
