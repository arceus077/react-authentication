import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Application from './Components/Application';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    setIsLoggedIn(authToken && refreshToken); // Ensure you compare with a string 'true'
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? <Application setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
