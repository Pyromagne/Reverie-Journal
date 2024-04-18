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
  <Card variant="outlined" className="max-w-full h-auto p-2 m-2 shadow-md">
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

export const DreamCard = ({ dream }) => {
  const { Title, Date, Description, Tags, Emotions } = dream;
  const truncDesc = truncateDescription(Description, 275);
  const formattedDate = formatDate(Date);

  return inDreamCard({ data: { Title, Date: formattedDate, Description: truncDesc, Tags, Emotions } });
};

export default DreamCard;
