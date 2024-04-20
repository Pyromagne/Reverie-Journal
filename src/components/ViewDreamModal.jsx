import useAuth from "../hooks/useAuth";
import useLocalContext from "../hooks/useLocalContext";
import { dps3 } from "../constants";
import Chips from "./Chip";

import React from "react";
import { Divider, Modal, Box } from "@mui/material";
import dayjs from "dayjs";

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

  if (!dream) {
    return null;
  }

  return (
    <Modal open={openModal} onClose={() => {setOpenModal(false);setModal(false)}}>
      <Box sx={dps3} className='bg-white rounded w-2/3 flex flex-col gap-4 justify-between'>
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
        <div className="flex">
          <Chips items={dream.Tags} readOnly />
          <Chips items={dream.Emotions} readOnly />
        </div>
      </Box>
    </Modal>
  )
}


export default ViewDreamModal;