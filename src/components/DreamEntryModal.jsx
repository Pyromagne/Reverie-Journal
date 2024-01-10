import '../index.css';
import { centuryGothicFont, dynamicPopupStyle, dynamicPopupStyle2, isMobile } from "../constants";
import TagChips from './TagChips';
import { React, useState } from 'react';
import { Box, Modal, TextField, Button, Divider} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DreamEntryModal = props => {
  
  const { openModal, setOpenModal} = props;
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
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

  const handleDelete = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
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
            <p className='md:mb-20 mb-10 text-xl text-slate-600'>Dream Entry</p>
            <form className="flex flex-col">
            <Box className="flex md:flex-row flex-col md:justify-between justify-center">
              <div className="md:mb-0 mb-6 place-self-center w-full md:w-3/5">
                <TextField label='Title' variant='outlined' className="place-self-center w-full"
                  InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />
              </div>
              <div className="md:mb-0 mb-6 place-self-center w-full md:w-1/3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker label='Date' variant='outlined' className="place-self-center w-full"
                    sx={{
                      '& .MuiInputBase-input': centuryGothicFont,
                      '& .MuiInputLabel-root': centuryGothicFont,
                  }}/>
                </LocalizationProvider>
              </div>
            </Box>
            <Divider sx={{margin: '20px 0px', width: '100%'}}/>
            <TextField label='Description' variant='outlined' multiline rows={4} className="place-self-center" sx={{width: '100%'}}
              InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} /> 
            </form>
            <div className='w-full md:w-1/2 mt-6'>
              <TextField label="Add Tags" variant="standard" value={tagInput} onChange={handleInputChange}
                sx={{width: '100%'}} InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}}
              />
            </div>
            <div className='w-full my-4'>
              <TagChips tags={tags} onDelete={handleDelete}/>
            </div>
            <div className="pt-6 flex justify-end space-x-2">
              <Button variant="outlined" onClick={() => setOpenModal(false)} color="primary" sx={centuryGothicFont}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setOpenModal(false)} color="secondary" sx={centuryGothicFont}>
                Cancel
              </Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DreamEntryModal;