import React, {useEffect}from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './NavBar';

const Help = () => {
  return (
    <div>
        <Navbar />
      <h2>Help Component</h2>
      {/* Add your Help component content */}
    </div>
  );
};

export default Help