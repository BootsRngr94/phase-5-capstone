import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import NewClientForm from './NewClientForm.js';

const Client = () => {
  const [relatedClients, setRelatedClient] = useState([]);
  const [clients, setClients] = useState([]);
  const addNewClient = (newClient) => {
    // Add the new client to the state
    setClients(prevClients => [...prevClients, newClient]);
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
        setRelatedClient(data.related_client || []);
      })
      .catch(error => {
        console.error('Error fetching assigned pools:', error.message);
      });
  }, []);

  return (
    
    <div>
      <Navbar />
      <div className='clientContainer'>
      <h2>Client Info</h2>
      <h3>Assigned Clients:</h3>
    <ul>
      {relatedClients.map(client => (
        <li key={client.id}>
          <p>Name: {client.name}</p>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          <p>Address: {client.address}</p>
        </li>
      ))}
      {clients.map(client => (
      <li key={client.id}>
        <p>Name: {client.name}</p>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
          <p>Address: {client.address}</p>
      </li>
      ))}
    </ul>
    </div>
      <NewClientForm addNewClient={addNewClient} />
    </div>
  );
};

export default Client;