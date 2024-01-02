import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home
} from "./pages";
import './index.css';


function App() {
  return (
    <div className='flex justify-center flex-row'>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
