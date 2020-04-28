import React, { useState, useEffect, useContext, useCallback } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/user.svg'
import UserContext from '../../UserContext'
import UserService from '../../services/UserService'
import { useHistory } from 'react-router-dom'

let searchTimeout

const Header = ({ auth }) => {
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)
  const uc = useContext(UserContext)
  const history = useHistory()

  const goToUserProfile = useCallback(
    (isEdit) => {
      history.push({
        pathname: `/profile`,
      })
      isEdit && localStorage.setItem('isEditMode', true)
      isOpen && toggle(false)
    },
    [isOpen, history]
  )

  const snackAction = useCallback(
    (goToProfile) => {
      localStorage.setItem('profilePrompt', true)
      if (goToProfile) {
        goToUserProfile(true)
        uc.closeSnack()
      } else {
        uc.openSnack({
          message:
            'You can visit the Profile page to finsh setting up your account.',
          isOpen: true,
          duration: 3000,
          onClose: uc.closeSnack,
        })
      }
    },
    [goToUserProfile, uc]
  )

  const snackPrompt = useCallback(() => {
    uc.openSnack({
      message: (
        <span className='account-finish-message'>
          <span className='message'>
            Want to finish setting up your account?
          </span>
          <button onClick={() => snackAction(true)} className='plain'>
            Set Up
          </button>
          <button onClick={() => snackAction()} className='close-button'>
            X
          </button>
        </span>
      ),
      isOpen: true,
      className: 'info',
    })
  }, [snackAction, uc])

  const logout = () => {
    auth.logout()
  }

  const getSearch = useCallback(
    (value) => {
      if (history.location.pathname !== '/search') {
        uc.setPrevPage(history.location.pathname)
      }
      history.push({
        pathname: '/search',
        search: `?${value}`,
      })
    },
    [history, uc]
  )

  const checkForSearchParams = useCallback(() => {
    let searchParams = history.location.search.substring(1)
    if (searchParams) {
      setSearchField(searchParams)
      getSearch(searchParams)
    }
  }, [history.location.search, getSearch])

  const focusSearch = () => {
    document.getElementById('global-search-input').focus()
  }

  const handleChange = (e) => {
    setSearchField(e.target.value)
    if (e.target.value !== '' && e.target.value !== undefined) {
      getSearch(e.target.value)
    } else {
      history.push({
        search: '',
      })
    }
  }

  const toggle = (isOpen, e) => {
    setIsOpen(isOpen)
    if (isOpen) {
      setPopoverAnchorEl(e.currentTarget)
    }
  }

  const goToUserSettings = () => {
    console.log('go to settings')
  }

  useEffect(() => {
    if (auth.isAuthenticated()) {
      UserService.get().then((response) => {
        if (response) {
          let user = response.data
          if (!user.name) {
            !localStorage.getItem('profilePrompt') && snackPrompt()
          }
          uc.setUser(user)
        }
      })
    }
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [uc, auth, snackPrompt])

  useEffect(() => {
    checkForSearchParams()
  }, [checkForSearchParams])

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname !== '/search') {
        setSearchField('')
      }
    })
  }, [history])

  return (
    <div className='header'>
      <div className='search-bar animated fadeInLeft'>
        <Icon icon='magnifyingGlass' callout={focusSearch} />
        <TextField
          id='global-search-input'
          className={'search-dogs-input'}
          margin='normal'
          onChange={handleChange}
          fullWidth
          value={searchField}
          placeholder='Search by name, gender, or breed'
        />
      </div>
      {uc.user && (
        <button
          className='plain user-dropdown animated fadeInRight'
          onClick={(e) => toggle(true, e)}
        >
          <div className='image-container'>
            <img
              src={uc.user.picture ? uc.user.picture : noProfileImg}
              alt={uc.user.name}
            />
          </div>
          <span>{uc.user.name || uc.user.email}</span>
          <Icon icon='chevronDown' />
        </button>
      )}
      <Popover
        id='user-dropdown-popover'
        open={isOpen}
        anchorEl={popoverAnchorEl}
        onClose={() => toggle(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: 'user-dropdown-container',
        }}
      >
        <span className='user-dropdown-item' onClick={goToUserSettings}>
          Settings
        </span>
        <span className='user-dropdown-item' onClick={() => goToUserProfile()}>
          Profile
        </span>
        <span className='user-dropdown-item' onClick={logout}>
          Logout
        </span>
      </Popover>
    </div>
  )
}

export default Header
