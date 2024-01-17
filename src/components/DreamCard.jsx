import { centuryGothicFont } from "../constants";
import Chips from "./Chips";

import React from "react";
import { Card, Divider } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const demoTagData = ['Demo', 'Tag', 'Data'];

const DreamCard = () =>{

  return(
    <Card variant="outlined" className="min-w-320 h-200 p-2 m-2"> 
    <div className="flex justify-between">
      <p className="px-1">Title</p>
      <p className="px-1">Date</p>
    </div>
    <Divider className="py-1"></Divider>
    <div className="p-1 h-3/4 flex flex-col justify-between items-center">
      <p className="p-1">Description</p>
      <Chips items={demoTagData} readOnly={true}></Chips>
    </div>
    </Card>
  )
}

export default DreamCard;