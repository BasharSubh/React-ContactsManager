import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


function Utils({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    setLoggedIn(localStorage.getItem("accessToken") !== null);
  });

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("accessToken");
    navigate('/')
  };

  const authContextValue = {
    loggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
      
}

export default Utils

