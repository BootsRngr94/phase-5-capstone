import React from 'react';
import Navbar from './NavBar';
import mylogo from '../stylesheets/mylogo.png';
const Help = () => {
  return (
    <div>
        <Navbar />
        <img src={mylogo} alt="app logo" className='mylogo'/>
        <div className='help_container'>
      <h1 className='help_title'>Welcome to the help section!</h1>
      <h3 className='help_title'>In this section I'll explain how to properly use the website in it's current state.</h3>
      <ul>
        <li>When attempting to log out, please direct yourself back to the dashboard page THEN click log out.</li>
        <li>The small sun and moon icons (black and white squares) toggle dark mode and light mode for the website.</li>
        <li>To update an existing pool first click the update button, afterward fill out the required fields and click the button at the end of the form list.
          Deleting is very simple, just click the delete button. For right now It will delete the pool entirely, so unless a client drops us please use this conservatively
! 
        </li>
      </ul>
      </div>
    </div>
  );
};

export default Help