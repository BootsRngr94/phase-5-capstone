import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from "./DarkModeContext";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const { darkMode } = useContext(DarkModeContext);

  const navbarStyle = {
    backgroundColor: darkMode ? '#444' : '#fff',
  };
  const linkStyle = {
    color: darkMode ? '#fcfc0a' : '#000000', 
    textDecoration: 'none',
  };

  return (
    <div className='navbar' style={navbarStyle}>

      <div> 
    <nav>
      <ul className='link_list'>
        <li className='link'>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        </li>
        <li className='link'>
          <Link to="/pool" style={linkStyle}>Daily Route</Link>
        </li>
        <li className='link'>
          <Link to="/client" style={linkStyle}>Client Info</Link>
        </li>
        <li className='link'>
          <Link to="/help" style={linkStyle}>App Help</Link>
        </li>
        <li className='link'>
          <Link to="/poolvisit" style={linkStyle}>Pool Visit</Link>
        </li>
          <li className='link'>
            <button className='log_out' onClick={onLogout}>Logout</button>
          </li>
      </ul>
    </nav>
   </div>
   </div>
  );
};

export default Navbar;
