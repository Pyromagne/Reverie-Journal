import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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

