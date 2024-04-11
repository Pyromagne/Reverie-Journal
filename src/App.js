import { Routes, Route } from "react-router-dom";
import PrivateAuth from "./components/PrivateAuth";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";

import {
  Home, SignIn
} from "./pages";
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/signin" element={<SignIn />} />
        
        <Route element={<PersistLogin />}>
          <Route element={<PrivateAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

      </Route>

      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

export default App;