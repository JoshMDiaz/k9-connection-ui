import React from 'react'

const Home = ({ auth }) => {
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
