import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';
// import SessionChecker from './SessionChecker';

const Dashboard = ({ onLogout }) => {
  const history = useHistory();
  const handleLogout = () => {
    onLogout();
    history.push('/signin');
  };
  const [username, setUserName] = useState(null);

  useEffect(() => {
    // Fetch assigned pools
    fetch('/check_session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserName(data.username || 'Unkown');
      })
      .catch(error => {
        console.error('Error fetching assigned pools:', error.message);
      });
  }, []);



  return (
    <div>
      <Navbar isLoggedIn={true} onLogout={handleLogout} />
      <div className='welcome'>
        <h1>Welcome, {username}!</h1>
        <p>This is your Dashboard. Normally you'd be able to clock in and out from here but this is a work in progress!</p>
        <p>Above are navigation links, I suggest clicking the help page for infomation on properly using the app!</p>
      </div>
    </div>
  );
};

export default Dashboard;