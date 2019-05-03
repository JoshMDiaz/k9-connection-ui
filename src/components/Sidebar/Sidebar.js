import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

const Sidebar = () => {
  const sidebarContent = [
    {
      id: 1,
      page: 'Browse Dogs',
      path: '/'
    },
    {
      id: 2,
      page: 'Messages',
      path: '/'
    },
    {
      id: 3,
      page: 'Profile',
      path: '/'
    }
  ]
  return (
    <div className='sidebar'>
      <img src={logo} alt='logo' />
      <ul className='sidebar-content'>
        {sidebarContent.map((e, i) => (
          <Link to={e.path} key={i}>
            {e.page}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
