import { Routes, Route } from "react-router-dom";
import PrivateAuth from "./components/PrivateAuth";
import Layout from "./components/Layout";
import HomeLayout from "./components/HomeLayout";
import PersistLogin from "./components/PersistLogin";

import {
  Home, SignIn
} from "./pages";
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route element={<PersistLogin />}>

          <Route path="/signin" element={<SignIn />}/>

          <Route element={<PrivateAuth />}>

            <Route element={<HomeLayout />}>

              <Route path="/" element={<Home />}/>

            </Route>

          </Route>
          
          <Route path="*" element={<SignIn />} />
        </Route>

      </Route>

    </Routes>
  );
}

export default App;