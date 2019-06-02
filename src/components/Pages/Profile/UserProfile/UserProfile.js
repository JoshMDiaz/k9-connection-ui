import React, { useState, useEffect, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import BackButton from '../../../common/BackButton/BackButton'
import ContentContainer from '../../../common/ContentContainer'
import List from '../../../Dogs/List'
import userContext from '../../../../userContext'
import UserRead from './UserRead'
import noProfileImg from '../../../../images/icons/no-profile.svg'
import UserEdit from './UserEdit'
import UserService from '../../../../services/UserService'

const UserProfile = props => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [user, setUser] = useState({})
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })
  const uc = useContext(userContext)
  let isCancelled

  useEffect(() => {
    !isCancelled && getUser()
  }, [])

  useEffect(() => {
    setUser(uc.user)
    if (Object.entries(uc.user).length !== 0 && !uc.user.id) {
      setIsEditMode(true)
    }
  }, [uc.user])

  const determineUserChange = form => {
    if (user.id) {
      update(form)
    } else {
      create(form)
    }
  }

  const getUser = () => {
    UserService.get(uc.user.sub).then(response => {
      if (response && response.data) {
        setUser(response.data)
        uc.setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    })
  }

  const update = form => {
    let body = {
      ...form
    }
    UserService.updateUser(user.sub, body).then(response => {
      if (response) {
        setSnack({
          message: 'Your account has been updated!',
          isOpen: true,
          className: 'success'
        })
        getUser()
        setIsEditMode(false)
      }
    })
  }

  const create = form => {
    let body = {
      ...form
    }
    UserService.createUser(body).then(response => {
      if (response) {
        setSnack({
          message: 'Your account has been updated!',
          isOpen: true,
          className: 'success'
        })
        setIsEditMode(false)
        getUser()
      }
    })
  }

  const closeSnack = () => {
    setSnack({
      ...snack,
      isOpen: false
    })
  }

  return (
    <div className='user-profile profile'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {/* Need image uploader */}
          <div className='image-container'>
            <img
              src={user.picture ? user.picture : noProfileImg}
              alt={user.name}
            />
          </div>
        </div>
        <div className='right-section'>
          {isEditMode ? (
            <UserEdit
              user={user}
              setIsEditMode={setIsEditMode}
              update={determineUserChange}
            />
          ) : (
            <UserRead user={user} setIsEditMode={setIsEditMode} />
          )}
        </div>
      </ContentContainer>
      {user.dogs && user.dogs.length > 0 && (
        <div className='page-padding'>
          <List dogs={user.dogs} />
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={`top,right`}
        open={snack.isOpen}
        onClose={closeSnack}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        autoHideDuration={3000}
        className={`snackbar ${snack.className || 'error'}`}
        message={<span id='message-id'>{snack.message}</span>}
      />
    </div>
  )
}

export default UserProfile
