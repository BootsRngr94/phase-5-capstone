import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import PoolVisitUpdateForm from './PoolVisitUpdateForm';
import mylogo from '../stylesheets/mylogo.png';
const PoolVisit = () => {
  const [poolVisits, setPoolVisits] = useState([]);
  const [selectedPoolVisitId, setSelectedPoolVisitId] = useState(null);

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
  }, [selectedPoolVisitId]);

  const handleUpdateClick = (poolVisitId) => {
    setSelectedPoolVisitId(poolVisitId);
  };

  const handleDeleteClick = (poolVisitId) => {
    fetch(`/pool_visits/${poolVisitId}`, {
      method: 'DELETE',
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
        console.log('Pool visit deleted:', data);
        // Update the state or handle as needed
        setPoolVisits(poolVisits.filter(visit => visit.id !== poolVisitId));
      })
      .catch(error => {
        console.error('Error deleting pool visit:', error.message);
      });
  };

  const updatePoolVisits = () => {
    // Fetch the updated poolVisits and set the state
    fetch('/check_session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setPoolVisits(data.pool_visits || []);
      })
      .catch(error => {
        console.error('Error fetching assigned pools:', error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <img src={mylogo} alt="app logo" className='mylogo'/>
      <div className='visitContainer'>
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
              <p>Chemicals Used Summary: {poolvisit.visits_CHEMS_USED_record}</p>

              {/* Button to trigger the update form */}
              <button onClick={() => handleUpdateClick(poolvisit.id)}>Update Pool Visit</button>

              {/* Button to trigger delete */}
              <button onClick={() => handleDeleteClick(poolvisit.id)}>Delete Pool Visit</button>

              {/* Display the update form for the selected pool visit */}
              {selectedPoolVisitId && (
                <PoolVisitUpdateForm
                  poolVisitId={selectedPoolVisitId}
                  updatePoolVisits={updatePoolVisits}
                  setPoolVisits={setPoolVisits}
                  poolVisits={poolVisits}
                />
              )}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default PoolVisit;
