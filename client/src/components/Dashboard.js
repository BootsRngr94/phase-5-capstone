import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';
import SessionChecker from './SessionChecker';

const Dashboard = ({ onLogout }) => {
  const history = useHistory();

  const handleLogout = () => {
    onLogout();
    history.push('/signin');
  };

  return (
    <div>
      <Navbar isLoggedIn={true} onLogout={handleLogout} />
      <div>
        <h2>Welcome!</h2>
        <SessionChecker />
        <p>This is your Dashboard.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;