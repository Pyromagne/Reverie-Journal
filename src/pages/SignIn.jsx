import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { centuryGothicFont } from "../constants";
import "react-toastify/dist/ReactToastify.css";

import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Button, Box, TextField } from "@mui/material";
import { toast } from "react-toastify";

/////////////////////////////////////////////////////////////

const SignIn = () => {

  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /////////////////////////////////////////////////////////////

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /////////////////////////////////////////////////////////////

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/');
    }
    
    localStorage.setItem("persist", persist)
  },[auth.accessToken, persist])

  //FORM DATA//////////////////////////////////////////////////

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignInSubmission = async e => {

    e.preventDefault();

    //VALIDATION///////////////////////////////////////////////
    if (!signInFormData.email || !signInFormData.password) {
      toast.error("Please fill out all fields");
      return;
    }
    ///////////////////////////////////////////////////////////

    try {
      const response = await axios.post("/signin", signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },withCredentials: true
        }
      );
      
      const accessToken = response?.data?.accessToken;
      const username = response?.data?.username;
      const email = response?.data?.email;
      const userID = response?.data?.userID;

      setAuth({ email: email, username: username, userID: userID, accessToken });
      
      toast.success("Logged in successfully");
      navigate(from, { replace: true });

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.data.message || 'An error occurred');
      }
      else if (error.response && error.response.status >= 500) {
        toast.error('Server error. Please try again later');
      }
      else {
        toast.error('An error occurred');
      }
    }
  }

  //HANDLERS///////////////////////////////////////////////////

  const handleChange = e => {
    const { id, value } = e.target;
    setSignInFormData({ ...signInFormData, [id]: value });
  };

  /////////////////////////////////////////////////////////////

  return(
    <div>
      {auth.accessToken ? <></> :
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <h3 className="md:text-5xl text-4xl text-slate-300 m-6">Reverie Journal</h3>
          <form onSubmit={handleSignInSubmission} className="flex justify-center p-4 rounded md:w-1/3 w-4/5 bg-slate-300">
            <Box className="flex flex-col justify-around gap-4 w-full p-4">
              <p className="text-slate-700 text-2xl">Sign In</p>
              <TextField label='Email' id="email" type="email" variant='outlined' className="place-self-center w-full" value={signInFormData.email} onChange={handleChange}
              InputProps={{style: centuryGothicFont}} InputLabelProps={{ style: centuryGothicFont}} />

              <div className="relative">
                <TextField label='Password' id="password" type={showPassword ? "text" : "password"} variant='outlined' className="place-self-center w-full" value={signInFormData.password} onChange={handleChange}
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
      }
    </div>
    
)}

export default SignIn;