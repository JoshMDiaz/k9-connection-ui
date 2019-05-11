import React from 'react'
import Auth from '../../services/Auth/Auth'

const Header = ({ children }) => {
  const { isAuthenticated } = Auth

  const goToLogin = () => {
    const auth = new Auth()
    auth.login()
  }

  const logout = () => {
    const auth = new Auth()
    auth.logout()
  }

  return (
    <div className='header'>
      {children}
      <div className='user-dropdown'>
        <span>Search here</span>
        <button onClick={logout}>Sign Out</button>
        <button onClick={goToLogin}>Sign In</button>
      </div>
    </div>
  )
}

export default Header
