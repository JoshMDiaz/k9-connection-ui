import React, { useState, useEffect, useContext } from 'react'
import { TextField, Popover, Snackbar } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/user.svg'
import UserContext from '../../userContext'
import SearchService from '../../services/SearchService'
import history from '../../services/Auth/History'
import Spinner from '../common/Spinner/Spinner'

let loginTO, searchTimeout, isCancelled

const Header = ({ auth }) => {
  const [user, setUser] = useState(null)
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })
  const uc = useContext(UserContext)

  useEffect(() => {
    loginTO = setTimeout(() => {
      if (auth.isAuthenticated()) {
        let user = JSON.parse(localStorage.getItem('user')),
          auth0User = JSON.parse(localStorage.getItem('auth0User'))
        setUser(user)
        if (user) {
          uc.setUser(user)
        } else {
          auth0User.email = auth0User.name
          delete auth0User.name
          uc.setUser(auth0User)
          !localStorage.getItem('profilePrompt') && snackPrompt()
        }
      }
    }, 500)
    checkForSearchParams()
    history.listen(location => {
      if (location.pathname !== '/search') {
        setSearchField('')
      }
    })
    return () => {
      clearTimeout(loginTO)
      clearTimeout(searchTimeout)
    }
  }, [])

  const snackPrompt = () => {
    setSnack({
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
      className: 'info'
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

  const getSearch = value => {
    SearchService.cancelGetAll()
    !isCancelled && setLoading(true)
    let params = {
      value
    }
    SearchService.getAll(params).then(response => {
      if (response) {
        uc.setDogs(response.data)
        !isCancelled && setLoading(false)
        if (history.location.pathname !== '/search') {
          uc.setPrevPage(history.location.pathname)
        }
        history.push({
          pathname: '/search',
          search: `?${value}`
        })
      }
    })
  }

  const focusSearch = () => {
    console.log('focus search')
  }

  const handleChange = e => {
    setSearchField(e.target.value)
    if (e.target.value !== '' && e.target.value !== undefined) {
      getSearch(e.target.value)
    } else {
      uc.setDogs([])
      history.push({
        search: ''
      })
      setLoading(false)
    }
  }

  const toggle = isOpen => {
    setIsOpen(isOpen)
  }

  const goToUserProfile = () => {
    history.push({
      pathname: '/profile'
    })
    isOpen && toggle(false)
  }

  const goToUserSettings = () => {
    console.log('go to settings')
  }

  const snackAction = goToProfile => {
    localStorage.setItem('profilePrompt', true)
    if (goToProfile) {
      goToUserProfile()
      closeSnack()
    } else {
      setSnack({
        message:
          'You can visit the Profile page to finsh setting up your account.',
        isOpen: true,
        duration: 3000,
        onClose: closeSnack
      })
    }
  }

  const closeSnack = () => {
    setSnack({
      ...snack,
      isOpen: false
    })
  }

  return (
    <div className='header'>
      <div className='search-bar animated fadeInLeft'>
        <Icon icon='magnifyingGlass' onClick={focusSearch} />
        <TextField
          label={`Search Dogs`}
          className={'search-dogs-input'}
          margin='normal'
          onChange={handleChange}
          fullWidth
          value={searchField}
          placeholder='Search by name, gender, or breed'
        />
        {loading && <Spinner />}
        <span>{snack.duration}</span>
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
          horizontal: 'right'
        }}
        classes={{
          paper: 'user-dropdown-container'
        }}
        anchorReference='anchorEl'
      >
        {user && (
          <span className='user-dropdown-item' onClick={goToUserSettings}>
            Settings
          </span>
        )}
        <span className='user-dropdown-item' onClick={goToUserProfile}>
          Profile
        </span>
        <span className='user-dropdown-item' onClick={logout}>
          Logout
        </span>
      </Popover>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={`top,right`}
        open={snack.isOpen}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        onClose={snack.onClose}
        autoHideDuration={snack.duration}
        className={`snackbar info`}
        message={<span id='message-id'>{snack.message}</span>}
      />
    </div>
  )
}

export default Header
