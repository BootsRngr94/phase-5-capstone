import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';

const Dashboard = ({ username, onLogout }) => {
  const history = useHistory();
  
  const handleLogout = () => {
    // Perform any necessary logout actions (clear session, redirect, etc.)
    onLogout();
    // Redirect to the sign-in page or another appropriate location
    history.push('/signin');
  };

  return (
<div>
      <Navbar isLoggedIn={true} onLogout={handleLogout} /> {/* Pass appropriate props */}
      <div>
        <h2>Welcome, {username}!</h2>
        <p>This is your Dashboard.</p>
        {/* Going to add information, summary statistics, or recent activities eventually */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;