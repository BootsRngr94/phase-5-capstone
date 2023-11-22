import React, { useState, useEffect } from 'react';


const SessionChecker = () => {
  const [username, setUsername] = useState('Loading...');

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
        setUsername(data.username || 'Why wont this shit work'); // Set a default value if username is not available
      })
      .catch(error => {
        console.error('Error checking session:', error.message);
      });
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h2>Welcome, {username}!</h2>
    </div>
  );
};

export default SessionChecker;
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