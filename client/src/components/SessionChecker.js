import React, { useState, useEffect } from 'react';

const SessionChecker = ({ onLogout }) => {
  const [username, setUsername] = useState(null);
  const [assignedPools, setAssignedPools] = useState(null);
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

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      {/* <div>
        <h3>Assigned Pools:</h3>
        <ul>
          {assignedPools.map(pool => (
            <li key={pool.id}>
              {pool.pools_location} - {pool.pools_size}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default SessionChecker;



// import React, { useState, useEffect } from 'react';

// const SessionChecker = () => {
//   const [username, setUsername] = useState(null);
//   const [assignedPools, setAssignedPools] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch session data
//     fetch('/check_session', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Data from /check_session:', data);
//         setUsername(data.username || 'Unknown');
//         setAssignedPools(data.assigned_pools || []);
//       })
//       .catch(error => {
//         console.error('Error checking session:', error.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Welcome, {username}!</h2>
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
//     </div>
//   );
// };

// export default SessionChecker;


// const SessionChecker = () => {
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     fetch('/check_session', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('do i fucking work yet');
//         setUsername(data.username);
//       })
//       .catch(error => {
//         console.error('Error checking session:', error.message);
//       });
//   }, []);

//   return (
//     <div>
//       {/* Only render the username */}
//       <p>Username: {username}</p>
//     </div>
//   );
// };

// export default SessionChecker;