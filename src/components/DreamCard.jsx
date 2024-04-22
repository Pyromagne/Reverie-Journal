import React from "react";
import { Card, Divider } from "@mui/material";
import Chips from "./Chip";
import dayjs from "dayjs";

const truncateDescription = (description, length=200) => {
  return description.length > length ? description.substring(0, length) + '...' : description;
};

const formatDate = date => {
  return dayjs(date).format('MM-DD-YYYY');
}

export const inDreamCard = ({ data: { Title, Date, Description, Tags, Emotions } }) => (
  <Card variant="outlined" className="max-w-full h-auto p-2 m-2 shadow-md cursor-pointer hover:shadow-2xl">
    <div className="flex justify-between">
      <p className="px-1">{Title}</p>
      <p className="px-1">{formatDate(Date)}</p>
    </div>
    <Divider className="py-1" />
    <div className="flex flex-col">
      <p className="p-1 text-justify">{truncateDescription(Description, 275)}</p>
      <div className="flex">
        <Chips items={Tags} readOnly={true}></Chips>
        <Chips items={Emotions} readOnly={true}></Chips>
      </div>
    </div>
  </Card>
);

export const DreamCard2 = ({dream, onCardClick}) => {
  const { Title, Date, Description, Tags, Emotions } = dream;

  return (
    <Card variant="outlined" onClick={onCardClick} className='w-full bg-white rounded-md shadow-md h-auto p-2 cursor-pointer hover:shadow-2xl'>
      <div className="flex justify-between">
        <p>{Title}</p>
        <p className="px-1">{formatDate(Date)}</p>
      </div>
      <Divider className="py-1" />
      <p className="p-1 text-justify">{truncateDescription(Description, 275)}</p>
      <Chips items={Tags} readOnly={true}></Chips>
      <Chips items={Emotions} readOnly={true}></Chips>
    </Card>
  )
}

export const DreamCard = ({ dream, onCardClick }) => {
  const { Title, Date, Description, Tags, Emotions } = dream;
  const truncDesc = truncateDescription(Description, 275);
  const formattedDate = formatDate(Date);

  return (
    <div onClick={onCardClick}>
      {inDreamCard({ data: { Title: Title, Date: formattedDate, Description: truncDesc, Tags: Tags, Emotions: Emotions } })}
    </div>
  )
};

export default DreamCard;
