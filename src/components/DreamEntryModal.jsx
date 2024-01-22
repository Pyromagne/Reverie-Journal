import '../index.css';
import { centuryGothicFont, isMobile, dps3 } from "../constants";
import Chips from './Chips';
import { React, useState } from 'react';
import { Box, Modal, TextField, Button, Divider, MenuItem} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  } from '@mui/material';
import dayjs from 'dayjs';

const DreamEntryModal = props => {
  
  const { openModal, setOpenModal} = props;
  const [tagInput, setTagInput] = useState('');
  const [EmotionInput, setEmotionInput] = useState('');
  const [tags, setTags] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [dreamType, setDreamType] = useState('');
  const [tagCount, setTagCount] = useState(0);
  const [emotionCount, setEmotionCount] = useState(0);

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

  const handleTagCountChange = count => {
    setTagCount(count);
  };

  const handleEmotionCountChange = count => {
    setEmotionCount(count);
  };

  return (
    <div className="flex">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={dps3} className='bg-white rounded w-2/3 flex flex-col justify-between gap-4'>
            <p className='text-xl text-slate-600'>Dream Journal Entry</p>
            <form  action='' className="flex flex-col">
              <Box className="flex md:flex-row flex-col md:justify-between justify-center gap-4">
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
                      value={dayjs()}
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
            </form>
            <div className='w-full' style={tagCount ? {marginTop: '4px', marginBottom: '4px'} : {marginTop: '0px', marginBottom: '0px'}}>
              <Chips items={tags} onDelete={handleDeleteTag} onCountChange={handleTagCountChange}/>
            </div>
            <div className='w-full' style={tagCount ? {marginTop: '4px', marginBottom: '4px'} : {marginTop: '0px', marginBottom: '0px'}}>
              <Chips items={emotions} onDelete={handleDeleteEmotion} onCountChange={handleEmotionCountChange}/>
            </div>
            <div className="flex md:justify-between md:flex-row flex-col justify-center">
              <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont}>
                Save as draft
              </Button>
              <div className='flex space-x-2 justify-between pt-2 md:pt-0'>
                <Button variant="outlined" onClick={() => setOpenModal(false)} color="primary" sx={centuryGothicFont} className='w-1/2'>
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

export default DreamEntryModal;