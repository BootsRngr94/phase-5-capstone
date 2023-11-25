import React, {useEffect}from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';

const Client = ({onLogout}) => {

    const handleLogout = () => {
        onLogout();
        history.push('/signin');
      };
    

    const history = useHistory();
    const handleNavigateBack = () => {
        history.goBack();
      };

  return (
    <div>
        <Navbar isLoggedIn={true} onLogout={handleLogout} />
      <h2>Client Component</h2>
      {/* Add your Client component content */}
      <button onClick={handleNavigateBack}>Go Back</button>
    </div>
  );
};

export default Client