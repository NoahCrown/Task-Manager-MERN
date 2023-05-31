import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <section className='home'>
      <p>Achieve your goals.</p>
      <h1>Effortlessly manage your to-do list and take control of your day</h1>
      <Link to='/signup'>Get Started</Link>

    </section>
  )
}

export default Home