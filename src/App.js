import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PrivateAuth from "./components/PrivateAuth";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import DreamBoard from "./pages/DreamBoard";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
      <Route element={<PersistLogin />}>

      <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<PrivateAuth />}>

          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/dreamboard" element={<DreamBoard />}/>

          </Route>

        </Route>

        <Route path="*" element={<SignIn />} />
      </Route>


    </Routes>
    </>
  );
}

export default App;