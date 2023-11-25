import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
const Pool = () => {
  const [assignedPools, setAssignedPools] = useState([]);

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
      <Navbar/>
      <h2>Daily Route</h2>
      <div>
        <h3>Assigned Pools:</h3>
        <ul>
          {assignedPools.map(pool => (
            <li key={pool.id}>
              {pool.pools_location} - {pool.pools_size}
            </li>
          ))}
        </ul>
      </div>
      {/* other pool content */}
    </div>
  );
};

export default Pool;

// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import Navbar from './NavBar';
// import SessionChecker from './SessionChecker';
// const Pool = ({ assignedPools },{onLogout}) => {
// const handleLogout = () => {
//     onLogout();
//     history.push('/signin');
//     };

//   const history = useHistory();
//   const handleNavigateBack = () => {
//     history.goBack();
//   };


    
//   return (
//     <div>
//         <Navbar isLoggedIn={true} onLogout={handleLogout}/>
//       <h2>Pool Component</h2>
//       <div>
//         <h3>Assigned Pools:</h3>
//         <ul>
//           {assignedPools.map(pool => (
//             <li key={pool.id}>
//               {pool.pools_location} - {pool.pools_size}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* other pool content */}
//     </div>
//   );
// };

// export default Pool;




// const Pool = () => {


//   return (
//     <div>
        
//       <h2>Pool Component</h2>
//       {/* Your Pool component content here */}
//       <button onClick={handleNavigateBack}>Go Back</button>
//     </div>
//   );
// };

// export default Pool;