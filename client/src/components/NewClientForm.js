import React, { useState } from 'react';

const NewClientForm = ({ addNewClient, clients }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to create a new client
    fetch('/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Call the callback function to update the state with the new client
        addNewClient(data);
      })
      .catch(error => console.error('Error creating new client:', error));
  };

  return (
    <div className='clientFormContainer'>
      <h3>New Client</h3>
      <form onSubmit={handleSubmit} className='clientForm'>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Client Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Client Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Client Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button type="submit">Submit New Client</button>
      </form>
    </div>
  );
};

export default NewClientForm;