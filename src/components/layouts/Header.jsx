import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Utils';
import { ApiUser } from '../../Api';

function Header() {
  const { loggedIn, logout } = useContext(AuthContext);
  const [user, setUser] = useState('')

  useEffect(() => {
    if (loggedIn) {
      const fetchData = async () => {
        try {
          const res = await ApiUser();
          setUser(res.data.username)
        } catch (error) {
          
        }
      };
      fetchData();
    }
  
   


  }, [loggedIn]);

  const activeStyle = {
    fontWeight: "bold",
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          Contact Management System
        </Link>
        <ul className="nav-links">
        {loggedIn ? (
          <>
            <li>
              <NavLink
                to="/contacts"
                className="nav-link"
                  style={({ isActive }) => isActive ? activeStyle : null}
              >
                Contacts
              </NavLink>
              </li>
              {user && (
              <li className="user-greeting">
                Hello {user}
              </li>
            )}
            <li>
              <button className="logout-button" onClick={() => logout()}>
                Logout
              </button>
            </li>
   
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className="nav-link"
                style={({ isActive }) => isActive ? activeStyle : null}
                >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="nav-link"
                style={({ isActive }) => isActive ? activeStyle : null}
                >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      </nav>
    </header>
  );
}

export default Header;
