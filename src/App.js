import { Routes, Route } from "react-router-dom";
import PrivateAuth from "./components/PrivateAuth";
import Layout from "./components/Layout";

import {
  Home, SignIn
} from "./pages";
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      <Route element={<PrivateAuth />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

export default App;

/* import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  SignIn
} from "./pages";
import './index.css';

const App= ({ persistedState }) => {
  const [state, setState] = useState(persistedState);

  const handleChange = (event) => {
    // Update the state when the input changes
    setState({ data: event.target.value });
  };
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; */

/* import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home
} from "./pages";
import './index.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; */

