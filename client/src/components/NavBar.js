import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/pool">Daily Route</Link>
        </li>
        <li>
          <Link to="/client">Client Info</Link>
        </li>
        <li>
          <Link to="/help">App Help</Link>
        </li>
        {/* {isLoggedIn ? (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        ) : null} */}
      </ul>
    </nav>
  );
};

export default Navbar;
