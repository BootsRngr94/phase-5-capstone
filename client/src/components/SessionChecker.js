import React, { useState, useEffect } from 'react';

const SessionChecker = ({ onLogout }) => {
  const [, setUsername] = useState(null);
  const [, setAssignedPools] = useState(null);
  const [, setRelatedClient] = useState([]);
  const [ , setPoolVisits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session data
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
        console.log('Data from /check_session:', data);
        setUsername(data.username || 'Unknown');
        setAssignedPools(data.assigned_pools || []);
        setRelatedClient(data.related_client || []);
        setPoolVisits(data.pool_visits || []);
      })
      .catch(error => {
        console.error('Error checking session:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

};

export default SessionChecker;
