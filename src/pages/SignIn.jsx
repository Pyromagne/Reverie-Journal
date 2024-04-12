import { centuryGothicFont } from "../constants";
import useAuth from "../hooks/useAuth";

import { React, useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIGNIN_URL = '/signin';

const SignIn = () => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  console.log(auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const response = await axios.post(SIGNIN_URL, signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },withCredentials: true
        }
      );
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const Username = response?.data?.Username;
      const Email = response?.data?.Email;

      setAuth({ email: Email, username: Username, accessToken });
      
      toast.success("Logged in successfully");
      navigate(from, { replace: true });

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.response && error.response.status >= 500) {
        toast.error('Server error. Please try again later');
      } else {
        toast.error('An error occurred');
      }
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    if (auth.accessToken || persist) {
      navigate('/');
    }
    
    localStorage.setItem("persist", persist)
  },[auth.accessToken])

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
          <div className="flex gap-2">
            <input type="checkbox" id="persist" onChange={togglePersist} checked={persist}/>
            <label htmlFor="persist">Trust This Device</label>
          </div>
          <Button variant="text" color="primary" sx={centuryGothicFont} className='w-1/2'>
            Forgot Password?
          </Button>
        </Box>
      </form>
    </div>
)}

export default SignIn;