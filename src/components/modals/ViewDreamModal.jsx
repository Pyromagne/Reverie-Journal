import React from "react";
import dayjs from "dayjs";
import { Button, Divider, Modal, Box } from "@mui/material";
import toast from "react-hot-toast";

import { LuTrash2, LuFileEdit } from "react-icons/lu";

import useLocalContext from "../../hooks/useLocalContext";
import axios from "../../api/axios";

import Chip from "../Chip";

import { dps3 } from "../../constants";

const formatDate = date => {
  return dayjs(date).format('MM-DD-YYYY');
}

const formatTime = time => {
  const timeObject = dayjs(`1970-01-01T${time}:00`);
  return dayjs(timeObject).format('hh:mm A');
}

const ViewDreamModal = props => {

  const { dream } = props;
  const { openModal, setOpenModal } = props;
  const {setModal} = useLocalContext();

  const deleteDream = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`,{withCredentials: true});
      toast.success("Dream deleted successfully");
      props.onDelete();
      setOpenModal(false);
      setModal(false);
    } catch (error) {
      toast.error('Error deleting dream:', error);
    }
  }

  if (!dream) {
    return null;
  }

  return (
    <Modal open={openModal} onClose={() => {setOpenModal(false);setModal(false)}}>
      <Box sx={dps3} className='bg-white rounded-3xl w-2/3 flex flex-col gap-4 justify-between'>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <p>{dream.Title}</p>
              <p>{formatDate(dream.Date)}</p>
            </div>
            <p className="flex justify-end">{formatTime(dream.Time)}</p>
            <Divider className="py-1" />
            </div>
            <div className="flex flex-col">
              <p className="text-justify">{dream.Description}</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap gap-1">
              {dream.Tags.map((tag, index)=>{
                return (
                  <Chip text={tag} readOnly/>
                )
              })}
              {dream.Emotions.map((tag, index)=>{
                return (
                  <Chip text={tag} readOnly/>
                )
              })}
            </div>
            {props.delete && (
              <div className="place-self-end">
                <Button color="primary"><LuFileEdit size={24}/></Button>
                <Button onClick={() => {deleteDream(dream._id)}} color="error"><LuTrash2 size={24}/></Button>
              </div>
            )}
          </div>
      </Box>
    </Modal>
  )
}


export default ViewDreamModal;