import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { ToastContainer } from 'react-toastify';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <div className='login-page'>
      <form className='login' onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Username: </label>
      <input
        type='text'
        required
        min='5'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password: </label>
      <input
        type='password'
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        min='8'
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error}</div>}

      <p>Are you a new user? <Link to='/signup'>Sign up</Link></p>



    </form>
    <ToastContainer/>

    
    </div>

    
  )
}

export default Login