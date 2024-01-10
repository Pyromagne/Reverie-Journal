import '../index.css';
import { centuryGothicFont, dynamicPopupStyle, dynamicPopupStyle2, isMobile } from "../constants";
import Chips from './Chips';
import { React, useState } from 'react';
import { Box, Modal, TextField, Button, Divider, MenuItem} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  } from '@mui/material';

const DreamEntryModal = props => {
  
  const { openModal, setOpenModal} = props;
  const [tagInput, setTagInput] = useState('');
  const [EmotionInput, setEmotionInput] = useState('');
  const [tags, setTags] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [dreamType, setDreamType] = useState('');

  const handleTagInputChange = (e) => {
    const inputValue = e.target.value;
    setTagInput(inputValue);

    if (inputValue.includes(' ') ) {
      const newTag = inputValue.trim();
      if (newTag !== '') {
        setTags((prevTags) => [...prevTags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleEmotionInputChange = (e) => {
    const inputValue = e.target.value;
    setEmotionInput(inputValue);

    if (inputValue.includes(' ') ) {
      const newEmotion = inputValue.trim();
      if (newEmotion !== '') {
        setEmotions((prevEmotions) => [...prevEmotions, newEmotion]);
        setEmotionInput('');
      }
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  const handleDeleteEmotion = (index) => {
    const newEmotions = [...emotions];
    newEmotions.splice(index, 1);
    setEmotions(newEmotions);
  };

  const handleDreamTypeChange = (event) => {
    setDreamType(event.target.value);
  };

  return (
    <div className="flex">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={dynamicPopupStyle2} className='bg-white rounded-md w-2/3 mt-10'
          style={
            isMobile || window.innerWidth <= window.innerHeight * 2
            ? dynamicPopupStyle
            : null
        }>
            <p className='md:mb-15 mb-10 text-xl text-slate-600'>Dream Journal Entry</p>
            <form className="flex flex-col">
            <Box className="flex md:flex-row flex-col md:justify-between justify-center">
              <div className="md:mb-0 mb-6 place-self-center w-full md:w-3/5">
                <div className="md:mb-2 mb-6 place-self-center w-full">
                  <TextField label='Dream Title' variant='outlined' className="place-self-center w-full"
                    InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />
                </div>
                <div className="md:mb-0 mb-4 place-self-center w-full">
                  <TextField
                    label="Type"
                    value={dreamType}
                    onChange={handleDreamTypeChange}
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
                      sx={{
                        '& .MuiInputBase-input': centuryGothicFont,
                        '& .MuiInputLabel-root': centuryGothicFont,
                    }}/>
                  </div>
                  <div className="md:mb-0 mb-4 place-self-center w-full">
                    <TimePicker label="Time" variant='outlined' className="place-self-center w-full"
                    sx={{
                      '& .MuiInputBase-input': centuryGothicFont,
                      '& .MuiInputLabel-root': centuryGothicFont,
                    }}/>
                  </div>
                </LocalizationProvider>
              </div>
            </Box>
            <Divider sx={{margin: '15px 0px', width: '100%'}}/>
            <TextField label='Description' variant='outlined' multiline rows={4} className="place-self-center" sx={{width: '100%'}}
              InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} /> 
            </form>
            <div className='flex w-full mt-6'>
              <div className='w-full md:w-1/2'>
                <TextField label="Add Tags" variant="standard" value={tagInput} onChange={handleTagInputChange}
                  sx={{width: '100%'}} InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
                />
              </div>
              <div className='w-full md:w-1/2'>
                <TextField label="Add Emotions" variant="standard" value={EmotionInput} onChange={handleEmotionInputChange}
                  sx={{width: '100%'}} InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
                />
              </div>
            </div>
            <div className='w-full my-4'>
              <Chips items={tags} onDelete={handleDeleteTag}/>
            </div>
            <div className='w-full my-4'>
              <Chips items={emotions} onDelete={handleDeleteEmotion}/>
            </div>
            <div className="pt-6 flex justify-between space-x-2">
              <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont}>
                Save as draft
              </Button>
              <div className='space-x-2'>
                <Button variant="outlined" onClick={() => setOpenModal(false)} color="primary" sx={centuryGothicFont}>
                  Submit
                </Button>
                <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont}>
                  Cancel
                </Button>
              </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DreamEntryModal;