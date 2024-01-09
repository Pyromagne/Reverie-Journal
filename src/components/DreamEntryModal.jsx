import { centuryGothicFont, dynamicPopupStyle } from "../constants";
import React from "react";
import { Box, Modal, TextField, Button, Divider } from "@mui/material";


const DreamEntryModal = props => {

  const { openModal, setOpenModal} = props;

  return (
    <div className="flex">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={dynamicPopupStyle} className='bg-white rounded-md w-2/3 h-auto'>
            <p className='mb-5 text-xl text-slate-600'>Dream Entry</p>
            <form className="flex flex-col">
            <TextField label='Title' variant='outlined' className="place-self-center" sx={{width: '100%'}}
              InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />
            <Divider sx={{margin: '20px 0px', width: '100%'}}/>
            <TextField label='Description' variant='outlined' multiline rows={4} className="place-self-center" sx={{width: '100%'}}
              InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} /> 
            </form>
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