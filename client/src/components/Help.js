import React, {useEffect}from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';

const Help = ({onLogout}) => {

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
      <h2>Help Component</h2>
      {/* Add your Help component content */}
    </div>
  );
};

export default Help