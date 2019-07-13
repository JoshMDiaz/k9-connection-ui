import React from 'react'
import Auth from '../../../services/Auth/Auth'
import logo from '../../../images/logo.svg'
import Banner from './Banner/Banner'
import WhoWeAre from './WhoWeAre/WhoWeAre'
import Pricing from './Pricing/Pricing'

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
      <div className='website-content'>
        <Banner />
        <WhoWeAre />
        <Pricing />
      </div>
      <footer>Footer things</footer>
    </div>
  )
}

export default Home
