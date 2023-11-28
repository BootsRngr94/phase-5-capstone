import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleSignIn = async () => {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
        setLoggedIn(true);
      } else {
        // Sign-in failed, update the error state
        setError(data.error || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  // If already logged in, redirect to the Dashboard
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }, [isLoggedIn, history]);

  return (
    <div className='sign_in'>
      <h2>Sign In</h2>
      <form className='signinForm'>
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