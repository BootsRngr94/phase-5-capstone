import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';

const PoolVisit = () => {
    const[poolVisits, setPoolVisits] = useState([]);

    useEffect(() => {
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
            setPoolVisits(data.pool_visits || []);
          })
          .catch(error => {
            console.error('Error fetching assigned pools:', error.message);
          });
    }, []);
    return(
        <div>
        <Navbar/>
        <h2>Pool Visits</h2>
        <div>
          <h3>Previous Recordings:</h3>
          <ul>
            {poolVisits.map(poolvisit => (
              <li key={poolvisit.id}>
                <p>Notes: {poolvisit.visits_notes}</p>
                <p>Filter PSI: {poolvisit.visits_FILTER_PSI}</p>
                <p>PH: {poolvisit.visits_PH_record}</p>
                <p>Chlorine: {poolvisit.visits_CHL_record}</p>
                <p>Chemicals Used Summery: {poolvisit.visits_CHEMS_USED_record}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* other pool content */}
      </div>
    );
};

export default PoolVisit;