import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../userContext'
import noProfileImg from '../../images/icons/no-profile.svg'

const MobileMenu = ({ auth, closeMenu }) => {
  const uc = useContext(UserContext)

  const logout = () => {
    auth.logout()
  }

  const menuItems = [
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
    },
    {
      id: 4,
      page: 'New Dog',
      path: '/profile/new-dog'
    },
    {
      id: 5,
      page: 'Settings',
      path: '/settings'
    }
  ]

  let count = 0

  return (
    <div className='mobile-menu'>
      <span onClick={closeMenu} className='close-button'>
        X
      </span>
      <img
        src={uc.user.picture ? uc.user.picture : noProfileImg}
        alt={uc.user.nickname || uc.user.name}
        className='animated fadeInDown'
      />
      <h3 className='animated fadeInDown delay-3'>
        {uc.user.nickname || uc.user.name}
      </h3>
      <ul className='menu-items'>
        {menuItems.map((e, i) => {
          if (count === 20) {
            count = 0
          }
          count++
          return (
            <Link
              to={e.path}
              key={i}
              onClick={closeMenu}
              className={`animated fadeInDown delay-${count}`}
            >
              {e.page}
            </Link>
          )
        })}
      </ul>
      <button className='text-only logout animated fadeInUp' onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default MobileMenu
