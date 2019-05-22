import React from 'react'
import Auth from '../../services/Auth/Auth'

const auth = new Auth()

const Home = () => {
  const goToLogin = () => {
    auth.login()
  }
  return (
    <div className='home'>
      <h1>This is the home page</h1>
      <button onClick={goToLogin}>Sign In</button>
    </div>
  )
}

export default Home
