import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Modal, ModalDialog } from '@mui/joy';
import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';
import useLocalContext from '../../hooks/useLocalContext';
import axios from '../../api/axios';

import Chip from '../Chip';

import { dps3 } from "../../constants";

import { ring } from 'ldrs'

ring.register()

const dreamType = [
  {
    name: 'Normal',
    value: 'dt000'
  },
  {
    name: 'Lucid',
    value: 'dt001'
  },
  {
    name: 'Nightmare',
    value: 'dt002'
  },
  {
    name: 'Dream Within a Dream',
    value: 'dt003'
  },
]

/////////////////////////////////////////////////////////////

const SubmitDreamModal = props => {

  const { openModal, setOpenModal } = props;
  const { auth } = useAuth();
  const { setModal } = useLocalContext();
  const [loading, setLoading] = useState(false);

  //DATE FIELD HANDLERS////////////////////////////////////////

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());

  const handleDateChange = (e) => {
    setSelectedDate(dayjs(e.target.value));
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':');
    const newTime = selectedTime.hour(hours).minute(minutes);
    setSelectedTime(newTime);
    setSelectedDate(selectedDate.hour(newTime.hour()).minute(newTime.minute()));
  };

  //TAG FIELD HANDLERS/////////////////////////////////////////
  //TODO: CHANGE WHOLE TAG IMPLEMENTATION

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagCount, setTagCount] = useState(0);

  const handleTagInputChange = (e) => {
    const inputValue = e.target.value;
    setTagInput(inputValue);

    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      const newTag = inputValue?.trim();
      if (newTag !== '') {
        setTags((prevTags) => [...prevTags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTagCountChange = count => {
    setTagCount(count);
  };

  //EMOTION FIELD HANDLERS/////////////////////////////////////
  //TODO: CHANGE WHOLE EMOTION IMPLEMENTATION

  const [emotions, setEmotions] = useState([]);
  const [EmotionInput, setEmotionInput] = useState('');
  const [emotionCount, setEmotionCount] = useState(0);

  const handleEmotionInputChange = (e) => {
    const inputValue = e.target.value;
    setEmotionInput(inputValue);

    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      const newEmotion = inputValue?.trim();
      if (newEmotion !== '') {
        setEmotions((prevEmotions) => [...prevEmotions, newEmotion]);
        setEmotionInput('');
      }
    }
  };

  const handleDeleteEmotion = (index) => {
    const newEmotions = [...emotions];
    newEmotions.splice(index, 1);
    setEmotions(newEmotions);
  };

  const handleEmotionCountChange = count => {
    setEmotionCount(count);
  };

  /////////////////////////////////////////////////////////////

  const [userID, setUserID] = useState(auth.userID);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("normal");
  const [description, setDescription] = useState("");

  const cleanForm = () => {
    setTitle("");
    setType("normal");
    setSelectedDate(dayjs());
    setSelectedTime(dayjs());
    setDescription("");
    setTags([]);
    setEmotions([]);
  }

  const handleSubmitDream = async e => {
    e.preventDefault();

    const dreamFormData = {
      UserID: userID,
      Title: title,
      Type: type,
      Date: selectedDate.startOf("day").format("MM-DD-YYYY"),
      Time: selectedTime.format("HH:mm"),
      Description: description,
      Tags: tags,
      Emotions: emotions,
    }

    //VALIDATION///////////////////////////////////////////////
    if (Object.values(dreamFormData).some(value => !value)
      || dreamFormData.Tags.length === 0
      || dreamFormData.Emotions.length === 0) {
      toast.error("Please fill out all fields");
      return;
    }
    /////////////////////////////////////////////////////////////

    try {
      setLoading(true);
      const response = await axios.post("/submit", dreamFormData,
        {
          headers: {
            "Content-Type": "application/json",
          }, withCredentials: true
        }
      );

      toast.success(response.data.message);
      cleanForm();
      props.onSubmit();
      setModal(false);
      setOpenModal(false);
      setLoading(false);

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.data.message || 'An error occurred');
      }
      else if (error.response && error.response.status >= 500) {
        toast.error('Server error. Please try again later');
      }
      else {
        toast.error('An error occurred');
      }

      setLoading(false);
    }
  }

  /////////////////////////////////////////////////////////////
  //FOR TAG AND EMOTION FIELD//////////////////////////////////
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        const activeInput = document.activeElement;

        if (activeInput.id === "tagInput") {
          handleTagInputChange(e);
        } else if (activeInput.id === "emotionInput") {
          handleEmotionInputChange(e);
        }
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  return (
    <Modal open={openModal} onClose={() => { setOpenModal(false); setModal(false); }}>
      <ModalDialog sx={dps3}>
        <p className='font-semibold text-lg text-[#267E66] mb-5'>Dream Journal Entry</p>
        <form>
          <div className="flex md:flex-row flex-col md:justify-between justify-center gap-4 mb-6">
            <div className="md:mb-0 mb-6 place-self-center w-full md:w-3/5">
              <div className="md:mb-2 mb-6 place-self-center w-full">
                <input
                  id="Text"
                  type='text'
                  placeholder='Title'
                  className="h-10 border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="md:mb-0 mb-4 place-self-center w-full">
                <select
                  id="Type"
                  className="h-10 border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none"
                  onChange={(e) => setType(e.target.value)}
                >
                  {dreamType.map((type, index) => {
                    return <option key={index} value={type.value}>{type.name}</option>
                  })}
                </select>
              </div>
            </div>

            <div className="md:mb-0 mb-6 place-self-center w-full md:w-1/3">
              <div className="md:mb-2 mb-6 place-self-center w-full">
                <input
                  type="date"
                  value={selectedDate.format('YYYY-MM-DD')}
                  onChange={handleDateChange}
                  className="h-10 border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none"
                />
              </div>
              <div className="md:mb-0 mb-4 place-self-center w-full">
                <input
                  type="time"
                  value={selectedTime.format('HH:mm')}
                  onChange={handleTimeChange}
                  className="h-10 border border-gray-400 rounded-lg w-full p-2 font-light focus:outline-none"
                />
              </div>
            </div>
          </div>

          <textarea
            rows="4"
            id="Description"
            placeholder="Description..."
            className="mb-6 place-self-center w-full p-2 border border-gray-400 rounded-lg font-light focus:outline-none resize-none"
            onChange={(e) => setDescription(e.target.value)} />
          <div className='flex w-full'>
            <div className='w-full md:w-1/2'>
              <input
                id='tagInput'
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder='Tag'
                className='w-full p-2 border-b border-b-gray-400 font-light focus:outline-none resize-none'
              />
            </div>
            <div className='w-full md:w-1/2'>
              <input
                id='emotionInput'
                value={EmotionInput}
                onChange={handleEmotionInputChange}
                placeholder='Emotion'
                className='w-full p-2 border-b border-b-gray-400 font-light focus:outline-none resize-none'
              />
            </div>
          </div>
        </form>
        
        <div className={`flex w-full overflow-scroll overflow-y-hidden gap-1 ${tagCount ? 'mt-1 mb-1' : 'm-0'}`}>
          {tags.map((tag, index) => {
            return (
              <Chip text={tag} chipKey={index} onDelete={handleDeleteTag} onCountChange={handleTagCountChange} />
            )
          })}
        </div>
        <div className={`flex w-full overflow-scroll overflow-y-hidden gap-2 ${tagCount ? 'mt-1 mb-1' : 'm-0'}`}>
          {emotions.map((emotion, index) => {
            return (
              <Chip text={emotion} chipKey={index} onDelete={handleDeleteEmotion} onCountChange={handleEmotionCountChange} color='#00A36C' />
            )
          })}
        </div>

        <div className='mt-auto ml-auto flex w-1/3'>
          <button
            onClick={handleSubmitDream}
            className='flex items-center justify-center w-1/2 bg-[#267E66] text-white px-3 py-1 rounded-lg mr-2 font-medium'
            disabled={loading}
          >
            {loading
                  ? <l-ring size="16" speed="1" color="white" stroke="2"/> 
                  : 'Submit'}
          </button>
          <button
            onClick={() => { setOpenModal(false); setModal(false); cleanForm() }}
            className='w-1/2 text-[#790000] outline-2 outline outline-[#790000] px-3 py-1 rounded-lg font-medium -outline-offset-1'>
            Cancel
          </button>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default SubmitDreamModal;