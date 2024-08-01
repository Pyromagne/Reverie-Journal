import React from "react";
import dayjs from "dayjs";
import { Modal, ModalDialog } from "@mui/joy";
import toast from "react-hot-toast";

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
  const { setModal } = useLocalContext();

  const deleteDream = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`, { withCredentials: true });
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
    <Modal open={openModal} onClose={() => { setOpenModal(false); setModal(false) }}>
      <ModalDialog sx={dps3}>
        <div className="mb-6">
          <p className="font-semibold text-[#267E66]">{dream.Title}</p>
          <span className="flex text-gray-500 font-light text-sm">
            <p>{`${formatDate(dream.Date)} at ${formatTime(dream.Time)}`}</p>
          </span>
        </div>

        <p className="mb-11 text-pretty font-light">{dream.Description}</p>

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-1">
            {dream.Tags.map((tag, index) => {
              return (
                <Chip text={tag} readOnly />
              )
            })}
            {dream.Emotions.map((tag, index) => {
              return (
                <Chip text={tag} readOnly />
              )
            })}
          </div>
        </div>

        {props.delete && (
            <div className="mt-auto ml-auto">
              <button className="bg-[#267E66] text-white px-3 py-1 rounded-lg mr-2 font-medium">Edit</button>
              <button className="text-[#790000] outline-2 outline outline-[#790000] px-3 py-1 rounded-lg font-medium -outline-offset-1" onClick={() => {deleteDream(dream._id)}}>
                Delete
              </button>
            </div>
          )}
      </ModalDialog>
    </Modal>
  )
}

export default ViewDreamModal;