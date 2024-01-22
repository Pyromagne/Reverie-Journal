import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingScreenOverlay = ({message}) => {

    return(
        <div className="flex absolute w-full h-screen bg-black bg-opacity-50 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
            <CircularProgress />
            <p className="text-slate-300 m-4 font-medium">{message}</p>
            </div>
        </div>
    )
}

export default LoadingScreenOverlay;