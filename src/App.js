import { Routes, Route } from "react-router-dom";
import PrivateAuth from "./components/PrivateAuth";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import DreamBoard from "./pages/DreamBoard";

import './index.css';


function App() {
  return (
    <Routes>

      <Route element={<PersistLogin />}>

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
  );
}

export default App;