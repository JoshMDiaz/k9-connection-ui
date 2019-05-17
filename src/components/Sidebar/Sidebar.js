import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'

const Sidebar = () => {
  const sidebarContent = [
    {
      id: 1,
      page: 'Browse Dogs',
      path: '/browse'
    },
    {
      id: 2,
      page: 'Messages',
      path: '/messages'
    },
    {
      id: 3,
      page: 'Profile',
      path: '/profile'
    },
    {
      id: 4,
      page: 'My Dogs',
      path: '/dogs'
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
              exact
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
