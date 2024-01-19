import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
    return null; // You can replace this with a loading spinner or any other loading indicator
  }

  return <App />;
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

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