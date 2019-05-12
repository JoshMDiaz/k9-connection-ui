import React, { useState, useEffect } from 'react'

const Header = ({ auth }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setLoggedIn(true)
    }
  }, [])

  const logout = () => {
    auth.logout()
  }

  return (
    <div className='header'>
      <div className='search-bar'>search bar here</div>
      <div className='user-dropdown'>
        <button onClick={logout}>Sign Out</button>
        <span>I am logged {loggedIn ? 'IN' : 'OUT'}</span>
      </div>
    </div>
  )
}

export default Header
