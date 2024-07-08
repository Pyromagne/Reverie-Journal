import React from "react";
import dayjs from "dayjs";

import Chip from "./Chip";

const truncateDescription = (description, length = 200) => {
  return description.length > length ? description.substring(0, length) + '...' : description;
};

const formatDate = date => {
  return dayjs(date).format('MM-DD-YYYY');
}

const inDreamCard = ({ data: { Title, Date, Description, Tags, Emotions } }) => (
  <div className="max-w-full h-auto p-2 m-2 cursor-pointer g-outline rounded-md hover:bg-white/20 duration-300">
    <p className="mx-1 mb-2 font-semibold">{Title}</p>
    <p className="mx-1 font-light">{truncateDescription(Description, 275)}</p>
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-1">
        {
          Tags.slice(0, 3).map((tag, index) => (
            <Chip key={index} text={tag} readOnly={true}/>
          ))
        }
        {
          Emotions.slice(0, 3).map((emotion, index) => (
            <Chip key={index} text={emotion} readOnly={true} />
          ))
        }
      </div>
    </div>
  </div>
);

export const DreamCard = ({ dream, onCardClick }) => {
  const { Title, Date, Description, Tags, Emotions } = dream;

  return (
    <div variant="outlined" onClick={onCardClick} className='w-full rounded-md hover:outline hover:outline-gray-400 hover:outline-1 h-auto p-2 cursor-pointer'>
      <div className="mb-2">
        <p className="font-light">{formatDate(Date)}</p>
        <p className=" font-semibold">{Title}</p>
      </div>
      <p className="font-light">{truncateDescription(Description, 500)}</p>
      <div className="flex flex-wrap gap-1 mt-4">
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
  )
}

export const DreamCard2 = ({ dream, onCardClick }) => {
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
