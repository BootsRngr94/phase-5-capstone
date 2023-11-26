import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';


const Client = () => {
  const [relatedClients, setRelatedClient] = useState([]);

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
        setRelatedClient(data.related_client || []);
      })
      .catch(error => {
        console.error('Error fetching assigned pools:', error.message);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Client Info</h2>
      <h3>Related Clients:</h3>
    <ul>
      {relatedClients.map(client => (
        <li key={client.id}>
          {/* Render client details here */}
          <p>Name: {client.name}</p>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          {/* ask tyler about this, data base wouldn't update once I made the correct chagnes */}
          <p>Address: </p>
          {/* Add more client details as needed */}
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Client;