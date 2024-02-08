import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/* import LoadingScreenOverlay from './components/LoadingScreenOverlay';

import { React, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [persistedState, setPersistedState] = useState({});

  useEffect(() => {
    // Simulate async operation (loading from local storage)
    const loadPersistedState = async () => {
      try {
        const storedState = JSON.parse(localStorage.getItem("appState"));
        setPersistedState(storedState || {});
      } finally {
        setLoading(false);
      }
    };

    loadPersistedState();
  }, []);

  if (loading) {
    return <LoadingScreenOverlay message="Please Wait" />;
  }

  return <App />;
};

const root = createRoot(document.getElementById('root')); // Use createRoot instead of ReactDOM.render
root.render(<AppWrapper />); */

/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */