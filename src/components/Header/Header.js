import React, { useState, useEffect, useContext } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/user.svg'
import UserContext from '../../userContext'
import SearchService from '../../services/SearchService'
import history from '../../services/Auth/History'
import Spinner from '../common/Spinner/Spinner'
import UserService from '../../services/UserService'

let searchTimeout, isCancelled

const Header = ({ auth }) => {
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const uc = useContext(UserContext)

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
    checkForSearchParams()
    history.listen((location) => {
      if (location.pathname !== '/search') {
        setSearchField('')
      }
    })
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [])

  const snackPrompt = () => {
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
  }

  const logout = () => {
    auth.logout()
  }

  const checkForSearchParams = () => {
    let searchParams = history.location.search.substring(1)
    if (searchParams) {
      setSearchField(searchParams)
    }
  }

  const getSearch = (value) => {
    SearchService.cancelGetAll()
    !isCancelled && setLoading(true)
    let params = {
      value,
    }
    SearchService.getAll(params).then((response) => {
      if (response) {
        uc.setDogs(response.data)
        !isCancelled && setLoading(false)
        if (history.location.pathname !== '/search') {
          uc.setPrevPage(history.location.pathname)
        }
        history.push({
          pathname: '/search',
          search: `?${value}`,
        })
      }
    })
  }

  const focusSearch = () => {
    console.log('focus search')
  }

  const handleChange = (e) => {
    setSearchField(e.target.value)
    if (e.target.value !== '' && e.target.value !== undefined) {
      getSearch(e.target.value)
    } else {
      uc.setDogs([])
      history.push({
        search: '',
      })
      setLoading(false)
    }
  }

  const toggle = (isOpen) => {
    setIsOpen(isOpen)
  }

  const goToUserProfile = (isEdit) => {
    history.push({
      pathname: `/profile`,
    })
    isEdit && localStorage.setItem('isEditMode', true)
    isOpen && toggle(false)
  }

  const goToUserSettings = () => {
    console.log('go to settings')
  }

  const snackAction = (goToProfile) => {
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
  }

  return (
    <div className='header'>
      <div className='search-bar animated fadeInLeft'>
        <Icon icon='magnifyingGlass' callout={focusSearch} />
        <TextField
          className={'search-dogs-input'}
          margin='normal'
          onChange={handleChange}
          fullWidth
          value={searchField}
          placeholder='Search by name, gender, or breed'
        />
        {loading && <Spinner type='bars' />}
      </div>
      {uc.user && (
        <button
          className='plain user-dropdown animated fadeInRight'
          onClick={() => toggle(!isOpen)}
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
        anchorEl={null}
        onClose={() => toggle(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: 'user-dropdown-container',
        }}
        anchorReference='anchorEl'
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
