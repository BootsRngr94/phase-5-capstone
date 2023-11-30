import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import NewPoolForm from './NewPoolForm';
import mylogo from '../stylesheets/mylogo.png';
const Pool = () => {
  const [assignedPools, setAssignedPools] = useState([]);
  const [pools, setPools] = useState([]);
  const addNewPool = (newPool) => {
    // Add the new pool to the state
    setPools(prevPools => [...prevPools, newPool]);
  };

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
        setAssignedPools(data.assigned_pools || []);
      })
      .catch(error => {
        console.error('Error fetching assigned pools:', error.message);
      });
  }, []);

  return (
  <div>
  <Navbar />
  <img src={mylogo} alt="app logo" className='mylogo'/>
  <div className='dailyContainer'>
  <h2>Daily Route</h2>
    <h3>Assigned Pools:</h3>
    <ul>
      {assignedPools.map((pool) => (
        <li key={pool.id}>
          {pool.pools_location} - {pool.pools_size} - {pool.pools_condition_last_check}
        </li>
      ))}
      {pools.map((pool) => (
        <li key={pool.id}>
          <div>
            {pool.pools_location} -
            {pool.pools_size} -
            {pool.pools_condition_last_check}
          </div>
        </li>
      ))}
    </ul>
  </div>
  <NewPoolForm addNewPool={addNewPool} />
</div>
  );
};

export default Pool;

