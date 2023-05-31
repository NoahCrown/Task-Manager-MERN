import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='login-page'>
      <form className='login' onSubmit={handleSubmit}>
      <h3>Log in</h3>

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

      <button>Login</button>

      <p>Are you a new user? <Link to='/signup'>Sign up</Link></p>



    </form>


    </div>
    
  )
}

export default Login