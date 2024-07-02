import { React, useState } from "react";
import { useNavigate, } from "react-router-dom";

import { LuEye, LuEyeOff } from "react-icons/lu";

/* import { toast } from "react-toastify"; */
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import axios from '../api/axios';
import { sd1 } from "../data/strings";
/////////////////////////////////////////////////////////////

const SignUp = () => {

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  //FORM DATA//////////////////////////////////////////////////

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSignUpSubmission = async e => {

    e.preventDefault();

    //VALIDATION///////////////////////////////////////////////
    if (!signUpFormData.email || !signUpFormData.password) {
      toast.error("Please fill out all fields");
      return;
    }
    ///////////////////////////////////////////////////////////

    try {
      const response = await axios.post("/signup", signUpFormData,
        {
          headers: {
            "Content-Type": "application/json",
          }, withCredentials: true
        }
      );

      toast.success("Account successfully creted");
      navigate('/signin');

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
    setSignUpFormData({ ...signUpFormData, [id]: value });
  };

  /////////////////////////////////////////////////////////////

  return (
    <div>
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
            onSubmit={handleSignUpSubmission}
            className="flex flex-col p-14 rounded-3xl w-4/5 white-transparent-radial"
          >

            <div className="text-center mb-10">
              <p className="font-semibold text-2xl">Create an account</p>
              <p className="font-light">Already have an account? <a href="/signin" className=" font-normal">Sign In</a></p>
            </div>

            <div className="mb-5">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="mb-5 place-self-center w-full p-2 bg-transparent border border-gray-400  rounded-lg focus:outline-none font-light"
                value={signUpFormData.email}
                onChange={handleChange}
              />

              <input
                id="username"
                type="text"
                placeholder="Username"
                className="mb-5 place-self-center w-full p-2 bg-transparent border border-gray-400  rounded-lg focus:outline-none font-light"
                value={signUpFormData.username}
                onChange={handleChange}
              />

              <div className="relative mb-5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="place-self-center w-full p-2 bg-transparent border border-gray-400 text-black rounded-lg focus:outline-none font-light"
                  value={signUpFormData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-slate-400 select-none" onClick={togglePasswordVisibility}>
                  {showPassword ? <LuEye size={23} /> : <LuEyeOff size={23} />}
                </div>
              </div>

              <div className="relative">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="place-self-center w-full p-2 bg-transparent border border-gray-400 text-black rounded-lg focus:outline-none font-light"
                  value={signUpFormData.passwordConfirm}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-slate-400 select-none" onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <LuEye size={23} /> : <LuEyeOff size={23} />}
                </div>
              </div>
            </div>

            <p className="mb-10 font-light">
              By creating an account, you agree to our
              <a href="" className="font-normal">{` Privacy Policy `}</a>
              and
              <a href="" className="font-normal">{` Terms of Service`}</a>
            </p>

            <button className="p-2 rounded-lg bg-white">Sign Up</button>
          </form>
        </div>
      </div>
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

export default SignUp;