import React from 'react'

const Header = ({ children }) => {
  return (
    <div className='header'>
      {children}
      <div className='user-dropdown'>User here</div>
    </div>
  )
}

export default Header
