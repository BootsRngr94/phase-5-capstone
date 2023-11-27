import React, { useState } from 'react';

const NewPoolForm = ({ addNewPool, clients }) => {
  const [formData, setFormData] = useState({
    pools_location: '',
    pools_size: '',
    pools_condition_last_check: ''
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

    
    fetch('/pools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Call the callback function to update the state with the new client
        addNewPool(data);
      })
      .catch(error => console.error('Error creating new pool:', error));
  };

  return (
    <div className="formContainer">
      <h3>New Pool</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pools_location"
          placeholder="Pool Location"
          value={formData.pools_location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="pools_size"
          placeholder="Pool Size"
          value={formData.pools_size}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="pools_condition_last_check"
          placeholder="Pool Condition"
          value={formData.pools_condition_last_check}
          onChange={handleInputChange}
        />
        <button type="submit">Add New Pool</button>
      </form>
    </div>
  );
};

export default NewPoolForm;