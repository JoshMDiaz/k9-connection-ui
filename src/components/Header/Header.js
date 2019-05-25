import React, { useState, useEffect, useContext } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/no-profile.svg'
import UserContext from '../../userContext'

let loginTO

const Header = ({ auth }) => {
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const uc = useContext(UserContext)

  useEffect(() => {
    loginTO = setTimeout(() => {
      if (auth.isAuthenticated()) {
        uc.login(JSON.parse(localStorage.getItem('user')))
      }
    }, 500)
    return () => {
      clearTimeout(loginTO)
    }
  })

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
      {uc.user && (
        <button className='plain user-dropdown' onClick={() => toggle(!isOpen)}>
          <div className='image-container'>
            <img
              src={uc.user.picture ? uc.user.picture : noProfileImg}
              alt={uc.user.nickname || uc.user.name}
            />
          </div>
          <span>{uc.user.nickname || uc.user.name}</span>
          <Icon icon='chevronDown' />
        </button>
      )}
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
