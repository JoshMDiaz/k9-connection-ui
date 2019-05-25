import React from 'react'
import Auth from '../../services/Auth/Auth'
import logo from '../../images/logo.svg'

const auth = new Auth()

const Home = () => {
  const goToLogin = () => {
    auth.login()
  }
  return (
    <div className='website'>
      <header>
        <img src={logo} alt='logo' className='logo' />
        <button onClick={goToLogin} className='primary'>
          Sign In
        </button>
      </header>
      {/* Banner */}
      <div className='banner'>banner here</div>
      {/* Who we are */}
      <div className='who-we-are'>Who we are section</div>
      {/* Pricing */}
      <div className='pricing-section'>pricing section</div>
    </div>
  )
}

export default Home
