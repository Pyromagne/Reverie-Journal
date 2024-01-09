import React from "react";
import { Button, Fab } from "@mui/material";

const EllipseButton = ({name, color, isIcon=false, icon, onClick}) => {
  return (
    <Fab size="large" color={`${color}`} onClick={onClick}>
      <div className="flex justify-center items-center">
        {isIcon ? icon : name}
      </div>
    </Fab>
  );
};

export default EllipseButton;
