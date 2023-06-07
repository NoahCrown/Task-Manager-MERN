import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };

  return (
    <div className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Username: </label>
        <input
          type="text"
          required
          min='5'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label>Password: </label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          min='8'
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}

        <p>
          Already an existing user? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
