import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingScreenOverlay = ({message, style}) => {

    const defaultStyle = 'flex absolute w-full h-screen bg-black bg-opacity-50 justify-center items-center'
    const customStyle = style;

    return(
        <div className={`${style ? customStyle : defaultStyle}`}>
            <div className="flex flex-col justify-center items-center">
            <CircularProgress />
            <p className="m-4 font-medium">{message}</p>
            </div>
        </div>
    )
}

export default LoadingScreenOverlay;