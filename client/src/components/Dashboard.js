import React from 'react';
import { useHistory } from 'react-router-dom';

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
      <h2>Welcome, {username}!</h2>
      <p>This is your Dashboard.</p>
      {/* Add relevant information, summary statistics, or recent activities here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;