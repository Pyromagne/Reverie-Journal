import { centuryGothicFont } from "../constants";

import {React, useState} from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { LuEye, LuEyeOff } from "react-icons/lu";


const SignIn = () => {

const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

return(
  <div className="flex flex-col justify-center items-center w-full h-screen">
    <h3 className="md:text-5xl text-4xl text-slate-300 m-6">Reverie Journal</h3>
    <form action="" className="flex justify-center p-4 rounded md:w-1/3 w-4/5 bg-slate-300">
      <Box className="flex flex-col justify-around gap-4 w-full p-4">
        <p className="text-slate-700 text-2xl">Sign In</p>
        <TextField label='Email' variant='outlined' className="place-self-center w-full"
        InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />

        <div className="relative">
          <TextField label='Password' type={showPassword ? "text" : "password"} variant='outlined' className="place-self-center w-full"
          InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />
          <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-slate-400 "onClick={togglePasswordVisibility}>
            {showPassword ? <LuEye size={23} /> : <LuEyeOff size={23} />}
          </div>

        </div>

        <div className="flex space-x-2 justify-between pt-2 md:pt-0">
          <Button variant="outlined" color="secondary" sx={centuryGothicFont} className='w-1/2'>
            Sign Up
          </Button>
          <Button variant="outlined" color="primary" sx={centuryGothicFont} className='w-1/2'>
            Sign In
          </Button>
        </div>

        <Button variant="text" color="primary" sx={centuryGothicFont} className='w-1/2'>
          Forgot Password?
        </Button>
      </Box>
    </form>
  </div>
    )
}

export default SignIn;