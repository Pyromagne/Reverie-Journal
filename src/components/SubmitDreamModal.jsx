import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { centuryGothicFont, dps3 } from "../constants";
import Chips from './Chip';
import '../index.css';

import { React, useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Divider, MenuItem} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { toast } from "react-toastify";

/////////////////////////////////////////////////////////////

const SubmitDreamModal = props => {

  const {openModal, setOpenModal} = props;
  const { auth } = useAuth();

  //DATE FIELD HANDLERS////////////////////////////////////////
  
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleTimeChange = (time) => {
    const timeObject = dayjs(time).format("HH:mm")
    setSelectedTime(timeObject);
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

  const handleDeleteEmotion = (index)   => {
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
    setSelectedTime("");
    setDescription("");
    setTags([]);
    setEmotions([]);
  }

  const handleSubmitDream = async e => {
    e.preventDefault();

    const dreamFormData  = {
      UserID: userID,
      Title: title,
      Type: type,
      Date: selectedDate.startOf("day").format("MM-DD-YYYY"),
      Time: selectedTime,
      Description: description,
      Tags: tags,
      Emotions: emotions,
    }
    
    //VALIDATION///////////////////////////////////////////////
    if(Object.values(dreamFormData).some(value => !value) 
      || dreamFormData.Tags.length === 0
      || dreamFormData.Emotions.length === 0){
      toast.error("Please fill out all fields");
      return;
    }
    /////////////////////////////////////////////////////////////

    try {
      const response = await axios.post("/submit", dreamFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },withCredentials: true
        }
      );

      toast.success(response.data.message);
      cleanForm();
      props.onSubmit();
      setOpenModal(false);

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
    <div className="flex">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={dps3} className='bg-white rounded w-2/3 flex flex-col justify-between gap-4'>
            <p className='text-xl text-slate-600'>Dream Journal Entry</p>
            <form  action='' className="flex flex-col">
              <Box className="flex md:flex-row flex-col md:justify-between justify-center gap-4">
                <div className="md:mb-0 mb-6 place-self-center w-full md:w-3/5">
                  <div className="md:mb-2 mb-6 place-self-center w-full">
                    <TextField label='Dream Title' id="Title" variant='outlined' className="place-self-center w-full"
                      InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="md:mb-0 mb-4 place-self-center w-full">
                    <TextField
                      label="Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="place-self-center w-full"
                      InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
                      select
                    >
                      <MenuItem value={'normal'}>Normal</MenuItem>
                      <MenuItem value={'lucid'}>Lucid</MenuItem>
                      <MenuItem value={'nightmare'}>Nightmare</MenuItem>
                      <MenuItem value={'dwad'}>Dream Within a Dream</MenuItem>
                    </TextField>
                  </div>
                </div>
                <div className="md:mb-0 mb-6 place-self-center w-full md:w-1/3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="md:mb-2 mb-6 place-self-center w-full">
                      <DesktopDatePicker label='Date' variant='outlined' className="place-self-center w-full"
                      value={selectedDate}
                      onChange={handleDateChange}
                        sx={{
                          '& .MuiInputBase-input': centuryGothicFont,
                          '& .MuiInputLabel-root': centuryGothicFont,
                      }}/>
                    </div>
                    <div className="md:mb-0 mb-4 place-self-center w-full">
                      <TimePicker label="Time" variant='outlined' className="place-self-center w-full"
                      onChange={handleTimeChange}
                      sx={{
                        '& .MuiInputBase-input': centuryGothicFont,
                        '& .MuiInputLabel-root': centuryGothicFont,
                      }}/>
                    </div>
                  </LocalizationProvider>
                </div>
              </Box>
              <Divider sx={{margin: '15px 0px', width: '100%'}}/>
              <TextField label='Description' id="Description" variant='outlined' multiline rows={4} className="place-self-center" sx={{width: '100%'}}
                InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} onChange={(e) => setDescription(e.target.value)} /> 
              <div className='flex w-full mt-6'>
                <div className='w-full md:w-1/2'>
                  <TextField id='tagInput' label="Add Tag" variant="standard" value={tagInput} onChange={handleTagInputChange}
                    sx={{width: '100%'}} InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <TextField id='emotionInput' label="Add Emotion" variant="standard" value={EmotionInput} onChange={handleEmotionInputChange}
                    sx={{width: '100%'}} InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
                  />
                </div>
              </div>
            </form>
            <div className='w-full' style={tagCount ? {marginTop: '4px', marginBottom: '4px'} : {marginTop: '0px', marginBottom: '0px'}}>
              <Chips items={tags} onDelete={handleDeleteTag} onCountChange={handleTagCountChange}/>
            </div>
            <div className='w-full' style={emotionCount ? {marginTop: '4px', marginBottom: '4px'} : {marginTop: '0px', marginBottom: '0px'}}>
              <Chips items={emotions} onDelete={handleDeleteEmotion} onCountChange={handleEmotionCountChange}/>
            </div>
            <div className="flex md:justify-between md:flex-row flex-col justify-center">
              <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont} disabled>
                Save as draft
              </Button>
              <div className='flex space-x-2 justify-between pt-2 md:pt-0'>
                <Button variant="outlined" onClick={handleSubmitDream} color="primary" sx={centuryGothicFont} className='w-1/2'>
                  Submit
                </Button>
                <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont} className='w-1/2'>
                  Cancel
                </Button>
              </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmitDreamModal;