import React, { useState, useEffect} from 'react';

const PoolVisitUpdateForm = ({ poolVisitId, setPoolVisits, poolVisits }) => {
  const [formData, setFormData] = useState({
    visits_notes: '',          
    visits_FILTER_PSI: 0,        
    visits_PH_record: 0,         
    visits_CHL_record: 0,       
    visits_CHEMS_USED_record: '',
  });

  useEffect(() => {
    // Fetch current pool visit data based on poolVisitId
    fetch(`http://localhost:5555/pool_visits/${poolVisitId}`)
      .then(response => response.json())
      .then(data => {
        // Populate form data with current pool visit data
        setFormData({
          visits_notes: data.visits_notes || '',
          visits_FILTER_PSI: data.visits_FILTER_PSI || 0,
          visits_PH_record: data.visits_PH_record || 0,
          visits_CHL_record: data.visits_CHL_record || 0,
          visits_CHEMS_USED_record: data.visits_CHEMS_USED_record || ''
        });
        
      })
      .catch(error => console.error('Error fetching pool visit data:', error));
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PATCH request to update pool visit
    fetch(`http://localhost:5555/pool_visits/${poolVisitId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success or display error messages
        console.log('Pool visit updated successfully:', data);
        const updatePoolVisits = poolVisits.map(poolVisit => {
          if(poolVisit.id===data.id){
            return data 
          }else{
            return poolVisit
          }
        })
        setPoolVisits(updatePoolVisits);
      })
      .catch(error => console.error('Error updating pool visit:', error));
  };

  return (
    <div className="formContainer">
      <h3>Update Pool Visit</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="visits_notes"
          placeholder="Visit Notes"
          value={formData.visits_notes}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="visits_FILTER_PSI"
          placeholder="Filter PSI"
          value={formData.visits_FILTER_PSI}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="visits_PH_record"
          placeholder="PH Record"
          value={formData.visits_PH_record}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="visits_CHL_record"
          placeholder="CHL Record"
          value={formData.visits_CHL_record}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="visits_CHEMS_USED_record"
          placeholder="CHEMS USED"
          value={formData.visits_CHEMS_USED_record}
          onChange={handleInputChange}
        />
        {/* Add other input fields */}
        <button type="submit">Update Pool Visit</button>
      </form>
    </div>
  );
};

export default PoolVisitUpdateForm;