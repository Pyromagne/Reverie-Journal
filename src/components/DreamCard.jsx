import React from "react";
import { Card, Divider } from "@mui/material";
import Chip from "./Chip";
import dayjs from "dayjs";

const truncateDescription = (description, length = 200) => {
  return description.length > length ? description.substring(0, length) + '...' : description;
};

const formatDate = date => {
  return dayjs(date).format('MM-DD-YYYY');
}

export const inDreamCard = ({ data: { Title, Date, Description, Tags, Emotions } }) => (
  <Card variant="outlined" className="max-w-full h-auto p-2 m-2 shadow-md cursor-pointer hover:shadow-2xl">
    <div className="flex justify-between">
      <p className="px-1 w-4/6">{Title}</p>
      <p className="px-1 w-2/6">{formatDate(Date)}</p>
    </div>
    <Divider className="py-1" />
    <div className="flex flex-col">
      <p className="p-1 text-justify">{truncateDescription(Description, 275)}</p>
      <div className="flex flex-wrap">
        {
          Tags.slice(0, 3).map((tag, index) => (
            <Chip key={index} text={tag} readOnly={true} />
          ))
        }
        {
          Emotions.slice(0, 3).map((emotion, index) => (
            <Chip key={index} text={emotion} readOnly={true} />
          ))
        }
      </div>
    </div>
  </Card>
);

export const DreamCard2 = ({ dream, onCardClick }) => {
  const { Title, Date, Description, Tags, Emotions } = dream;

  return (
    <Card variant="outlined" onClick={onCardClick} className='w-full bg-white rounded-md shadow-sm hover:shadow-md h-auto p-2 cursor-pointer'>
      <div className="flex justify-between">
        <p>{Title}</p>
        <p className="px-1">{formatDate(Date)}</p>
      </div>
      <Divider className="py-1" />
      <p className="p-1 text-justify">{truncateDescription(Description, 500)}</p>
      {
        Tags.slice(0, 3).map((tag, index) => (
          <Chip key={index} text={tag} readOnly={true} />
        ))
      }
      {
        Emotions.slice(0, 3).map((emotion, index) => (
          <Chip key={index} text={emotion} readOnly={true} />
        ))
      }
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
