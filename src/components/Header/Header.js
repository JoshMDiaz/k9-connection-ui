import React, { useState, useEffect } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/no-profile.svg'

const Header = ({ auth }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setLoggedIn(true)
      getUser()
    }
  }, [])

  const getUser = () => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }

  const logout = () => {
    auth.logout()
  }

  const focusSearch = () => {
    console.log('focus search')
  }

  const handleChange = e => {
    setSearchField(e.target.value)
  }

  const toggle = isOpen => {
    setIsOpen(isOpen)
  }

  const goToUserSettings = () => {
    console.log('go to settings')
  }

  return (
    <div className='header'>
      <div className='search-bar'>
        <Icon icon='magnifyingGlass' onClick={focusSearch} />
        <TextField
          label={`Search Dogs`}
          className={'search-dogs-input'}
          margin='normal'
          onChange={handleChange}
          fullWidth
          value={searchField}
        />
      </div>
      {/* <div className='user-dropdown'> */}
      {/* <button onClick={logout}>Sign Out</button> */}
      {/* <span>I am logged {loggedIn ? 'IN' : 'OUT'}</span> */}
      {/* <span>{user.nickname}</span> */}
      {/* </div> */}
      <button className='plain user-dropdown' onClick={() => toggle(!isOpen)}>
        <div className='image-container'>
          <img
            src={user.avatar ? user.avatar : noProfileImg}
            alt={user.nickname || user.name}
          />
        </div>
        <span>{user.nickname || user.name}</span>
        <Icon icon='chevronDown' />
      </button>
      <Popover
        id='user-dropdown-popover'
        open={isOpen}
        anchorEl={null}
        onClose={() => toggle(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        classes={{
          paper: 'user-dropdown-container'
        }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right'
        // }}
        anchorReference='anchorEl'
      >
        <span className='user-dropdown-item' onClick={goToUserSettings}>
          Settings
        </span>
        <span className='user-dropdown-item' onClick={logout}>
          Logout
        </span>
      </Popover>
    </div>
  )
}

export default Header
