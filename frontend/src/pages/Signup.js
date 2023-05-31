import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='signup-page'>
      <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Username: </label>
      <input
        type='text'
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password: </label>
      <input
        type='password'
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>Confirm password: </label>
      <input
        type='password'
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <button>Sign up</button>

      <p>Already an existing user? <Link to='/login'>Log in</Link></p>

    </form>


    </div>
    
  )
}

export default Signup