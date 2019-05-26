import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'

const Sidebar = () => {
  const sidebarContent = [
    {
      id: 1,
      page: 'Browse Dogs',
      path: '/dogs'
    },
    {
      id: 2,
      page: 'Profile',
      path: '/profile'
    },
    {
      id: 3,
      page: 'Messages',
      path: '/messages'
    }
  ]

  let count = 0

  return (
    <div className='sidebar'>
      <div className='image-container'>
        <img src={logo} alt='logo' className='animated fadeInUp' />
      </div>
      <ul className='sidebar-content'>
        {sidebarContent.map((e, i) => {
          count++
          return (
            <NavLink
              to={e.path}
              key={i}
              activeClassName={'active'}
              className={`animated fadeInUp delay-${count}`}
            >
              {e.page}
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
