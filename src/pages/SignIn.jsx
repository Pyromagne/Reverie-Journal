import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { LuEye, LuEyeOff } from "react-icons/lu";

import useAuth from "../hooks/useAuth";
import useLocalContext from "../hooks/useLocalContext";
import axios from '../api/axios';

import { generateProfile } from "../components/InitialProfile";

import { sd1 } from "../data/strings";

import { dotPulse } from 'ldrs'

dotPulse.register()

/////////////////////////////////////////////////////////////

const SignIn = () => {

  const { auth, setAuth, persist, setPersist } = useAuth();
  const { setProfileData } = useLocalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

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
  }, [auth.accessToken, persist])

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
      setLoading(true);
      const response = await axios.post("/signin", signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          }, withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const username = response?.data?.username;
      const email = response?.data?.email;
      const userID = response?.data?.userID;

      const profile = generateProfile(username);
      setProfileData(profile);
      localStorage.setItem('profileData', JSON.stringify(profile));

      setAuth({ email: email, username: username, userID: userID, accessToken });
      toast.success("Logged in successfully");
      setLoading(false);
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

      setLoading(false);
    }
  }

  //HANDLERS///////////////////////////////////////////////////

  const handleChange = e => {
    const { id, value } = e.target;
    setSignInFormData({ ...signInFormData, [id]: value });
  };

  /////////////////////////////////////////////////////////////

  return (
    <div>
      {auth.accessToken ? null :
        <div className="flex h-screen gradient-background p-28">
          <div className="flex flex-col w-1/2">
            <div className="font-bold text-6xl mb-10">
              <p>Reverie</p>
              <p>Journal</p>
            </div>

            {sd1.map((data, index) => {
              return (
                <div key={index} className="mb-5">
                  <Card data={data} />
                </div>
              )
            })}

          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <form
              onSubmit={handleSignInSubmission}
              className="flex flex-col p-14 rounded-3xl w-4/5 white-transparent-radial"
            >

              <div className="text-center mb-10">
                <p className="font-semibold text-2xl">Sign in your account</p>
                <p className="font-light">Do not have an account yet? <a href="/signup" className="font-normal">Sign Up</a></p>
              </div>

              <div className="mb-5">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="mb-5 place-self-center w-full p-2 bg-transparent border border-gray-400  rounded-lg focus:outline-none font-light"
                  value={signInFormData.email}
                  onChange={handleChange}
                />

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="place-self-center w-full p-2 bg-transparent border border-gray-400 text-black rounded-lg focus:outline-none font-light"
                    value={signInFormData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-slate-400 " onClick={togglePasswordVisibility}>
                    {showPassword ? <LuEye size={23} /> : <LuEyeOff size={23} />}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-28">
                <div className="flex gap-2 w-fit">
                  <input type="checkbox" id="persist" className="hover:cursor-pointer" onChange={togglePersist} checked={persist} />
                  <label htmlFor="persist" className="hover:cursor-pointer font-light">Trust This Device</label>
                </div>
                <a href="" className='w-fit font-light'>
                  Forgot Password?
                </a>
              </div>
              <button className="p-2 rounded-lg bg-white mb-5" disabled={loading}>
                {loading
                  ? <l-dot-pulse size="28" speed="1" color="black" /> 
                  : 'Sign In'}
              </button>

              <div className="flex gap-2 font-light justify-center">
                <a href="">Privacy Policy</a>
                <p>|</p>
                <a href="">Terms and Condition</a>
              </div>
            </form>
          </div>
        </div>
      }
    </div>

  )
}

const Card = ({ data }) => {
  const { icon: Icon, title, desc } = data;
  return (
    <div className="w-full flex">
      <Icon size={64} />
      <div className="w-4/5">
        <p className="font-bold text-xl">{title}</p>
        <p className="text-justify">{desc}</p>
      </div>
    </div>
  )
}

export default SignIn;