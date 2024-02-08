import { centuryGothicFont } from "../constants";
import useAuth from "../hooks/useAuth";

import { React, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const SIGNIN_URL = '/signin';

const SignIn = () => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signInFormData, setSignInFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setSignInFormData({ ...signInFormData, [id]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!signInFormData.Email || !signInFormData.Password) {
      return;
    }
    try {
      const response = await axios.post(SIGNIN_URL, signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },/* withCredentials: true */
        }
      );
      const { Username, Email } = response.data.userData;
      setAuth({ email: Email, username: Username });
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        
      } else if (error.response && error.response.status === 404) {
        
      } else {
        
      }
    }
  }

  return(
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h3 className="md:text-5xl text-4xl text-slate-300 m-6">Reverie Journal</h3>
      <form onSubmit={handleSubmit} className="flex justify-center p-4 rounded md:w-1/3 w-4/5 bg-slate-300">
        <Box className="flex flex-col justify-around gap-4 w-full p-4">
          <p className="text-slate-700 text-2xl">Sign In</p>
          <TextField label='Email' id="Email" variant='outlined' className="place-self-center w-full" value={signInFormData.Email} onChange={handleChange}
          InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />

          <div className="relative">
            <TextField label='Password' id="Password" type={showPassword ? "text" : "password"} variant='outlined' className="place-self-center w-full" value={signInFormData.Password} onChange={handleChange}
            InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />
            <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-slate-400 "onClick={togglePasswordVisibility}>
              {showPassword ? <LuEye size={23} /> : <LuEyeOff size={23} />}
            </div>

          </div>

          <div className="flex space-x-2 justify-between pt-2 md:pt-0">
            <Button variant="outlined" color="secondary" sx={centuryGothicFont} className='w-1/2' >
              Sign Up
            </Button>
            <Button type="submit" variant="outlined" color="primary" sx={centuryGothicFont} className='w-1/2'>
              Sign In
            </Button>
          </div>

          <Button variant="text" color="primary" sx={centuryGothicFont} className='w-1/2'>
            Forgot Password?
          </Button>
        </Box>
      </form>
    </div>
)}

export default SignIn;