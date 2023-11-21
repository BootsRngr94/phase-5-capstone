import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://your-api-url/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sign-in successful, you might want to redirect the user or perform some other action
        console.log('Login successful');
      } else {
        // Sign-in failed, update the error state
        setError(data.error || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;