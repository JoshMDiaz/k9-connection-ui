import React, { useState, useEffect, useContext, useCallback } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/user.svg'
import UserContext from '../../UserContext'
import { useHistory } from 'react-router-dom'
import { getUser } from '../../services/UserService'
import { useAuth } from '../../AuthContext'

const Header = () => {
  const [state, setState] = useState({
    isOpen: false,
    popoverAnchorEl: null,
    searchField: '',
  })
  const { isOpen, popoverAnchorEl, searchField } = state

  const uc = useContext(UserContext),
    history = useHistory(),
    logout = useAuth().logout
  let user = uc.user || JSON.parse(localStorage.getItem('user'))

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
          message: 'You can visit the Profile page to finsh the setup.',
          isOpen: true,
          className: 'info',
        })
      }
    },
    [goToUserProfile, uc]
  )

  const snackPrompt = useCallback(() => {
    uc.openSnack({
      message: (
        <span className='account-finish-message'>
          <span className='message' onClick={snackAction}>
            Want to finish setting up your profile?
          </span>
          <button onClick={() => snackAction()} className='close-button'>
            X
          </button>
        </span>
      ),
      isOpen: true,
      className: 'info',
      stayOpen: true,
    })
  }, [snackAction, uc])

  const getCurrentUser = useCallback(
    (authUser) => {
      getUser({}, authUser.sub).then((response) => {
        if (response.data) {
          let user = response.data
          uc.setUser(user)
          let modifiedUserDogs = user?.dogs.map((d) => {
            delete d.dog_images
            return d
          })
          user.dogs = modifiedUserDogs
          localStorage.setItem('user', JSON.stringify(user))
          if (!user.name && !localStorage.getItem('profilePrompt')) {
            snackPrompt()
          }
        }
      })
    },
    [snackPrompt, uc]
  )

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
      setState((prevState) => ({
        ...prevState,
        searchField: searchParams,
      }))
      getSearch(searchParams)
    }
  }, [history.location.search, getSearch])

  const focusSearch = () => {
    document.getElementById('global-search-input').focus()
  }

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      searchField: e.target.value,
    }))
    if (e.target.value !== '' && e.target.value !== undefined) {
      getSearch(e.target.value)
    } else {
      history.push({
        search: '',
      })
    }
  }

  const toggle = (isOpen, e) => {
    setState((prevState) => ({
      ...prevState,
      isOpen: isOpen,
    }))
    if (isOpen) {
      setState((prevState) => ({
        ...prevState,
        popoverAnchorEl: e.currentTarget,
      }))
    }
  }

  const goToUserSettings = () => {
    console.log('go to settings')
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getCurrentUser(JSON.parse(localStorage.getItem('auth0User')))
    }
  }, [getCurrentUser, user])

  useEffect(() => {
    checkForSearchParams()
  }, [checkForSearchParams])

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname !== '/search') {
        setState((prevState) => ({
          ...prevState,
          searchField: '',
        }))
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
      {user && (
        <button
          className='plain user-dropdown animated fadeInRight'
          onClick={(e) => toggle(true, e)}
        >
          <div className='image-container'>
            <img
              src={user.picture ? user.picture : noProfileImg}
              alt={user.name}
            />
          </div>
          <span>{user.name || user.email}</span>
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
