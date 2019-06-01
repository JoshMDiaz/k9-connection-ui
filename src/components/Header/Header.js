import React, { useState, useEffect, useContext } from 'react'
import { TextField, Popover } from '@material-ui/core'
import Icon from '../../components/common/Icons/Icon'
import noProfileImg from '../../images/icons/no-profile.svg'
import UserContext from '../../userContext'
import SearchService from '../../services/SearchService'
import history from '../../services/Auth/History'
import Spinner from '../common/Spinner/Spinner'

let loginTO, searchTimeout, isCancelled

const Header = ({ auth }) => {
  const [searchField, setSearchField] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const uc = useContext(UserContext)

  useEffect(() => {
    loginTO = setTimeout(() => {
      if (auth.isAuthenticated()) {
        uc.login(JSON.parse(localStorage.getItem('user')))
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
          placeholder='Search by name, gender, or breed'
        />
        {loading && <Spinner />}
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
