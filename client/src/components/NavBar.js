import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className='main_nav'>
      <ul className='link_list'>
        <li className='link'>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className='link'>
          <Link to="/pool">Daily Route</Link>
        </li>
        <li className='link'>
          <Link to="/client">Client Info</Link>
        </li>
        <li className='link'>
          <Link to="/help">App Help</Link>
        </li>
        <li className='link'>
          <Link to="/poolvisit">Pool Visit</Link>
        </li>
          <li className='link'>
            <button className='log_out' onClick={onLogout}>Logout</button>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
