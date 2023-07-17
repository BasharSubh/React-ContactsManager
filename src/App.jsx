import {Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Contacts from './components/pages/Contacts';
import Register from './components/pages/Register';
import ContactDetails from './components/pages/ContactDetails';

import Layouts from './components/layouts/Layouts';
import PageNotFound from './components/pages/PageNotFound';
import './App.css';

import React from 'react';

import { AuthContext } from './Utils';

function App() {
  
  const { loggedIn } = React.useContext(AuthContext);
  const location = useLocation()

  

  return (
    <div className="App">
      <Routes>
        <Route element={<Layouts />}>  
            <Route
              path="/" 
              element={<Home />}
              loader={<h1>hello world</h1>}
            />
            <Route
              path="/login"
              element={!loggedIn ? <Login /> : <Contacts />}
            />
            <Route
              path="/register"
              element={<Register />}
          />
          <Route path="/contacts" element={loggedIn ? <Contacts /> : <Login />} />
            <Route
              path="/contacts/:id"
              element={loggedIn ? <ContactDetails /> : <Navigate to="/login" replace
              state={{
                message: "Please log in first.",
                prevLocation: location.pathname

              }} />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
