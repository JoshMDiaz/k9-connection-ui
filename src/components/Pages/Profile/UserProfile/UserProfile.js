import React, { useState, useEffect, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ContentContainer from '../../../common/ContentContainer'
import List from '../../../Dogs/List'
import userContext from '../../../../userContext'
import UserRead from './UserRead'
import UserEdit from './UserEdit'
import UserService from '../../../../services/UserService'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'
import Plural from '../../../common/Plural'
import noProfileImg from '../../../../images/icons/user.svg'

const UserProfile = props => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [user, setUser] = useState({})
  const [uploadedImage, setUploadedImage] = useState(null)
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })
  const uc = useContext(userContext)
  let isCancelled

  useEffect(() => {
    !isCancelled && getUser()
    if (localStorage.getItem('isEditMode')) {
      setIsEditMode(true)
    }
  }, [])

  useEffect(() => {
    setUploadedImage(uc.user.picture)
  }, [isEditMode])

  const getUser = () => {
    UserService.get().then(response => {
      if (response && response.data) {
        let user = response.data
        setUser(user)
        // uc.setUser(user)
        setUploadedImage(user.picture)
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
  }

  const update = form => {
    let body = {
      ...form,
      picture: uploadedImage || form.picture
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
        localStorage.removeItem('isEditMode')
      }
    })
  }

  const closeSnack = () => {
    setSnack({
      ...snack,
      isOpen: false
    })
  }

  const uploadImage = files => {
    if (files.length > 0) {
      let reader = new FileReader()
      let file = files[0]
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setSnack({
        message: 'File type not accepted. Only .jpg and .png are accepted.',
        isOpen: true
      })
    }
  }

  return (
    <div className='user-profile profile'>
      <div className='main-content-header'>
        <span className='animated fadeInLeft'>
          You have {user.dogs ? user.dogs.length : 0}{' '}
          <Plural text='dog' number={user.dogs ? user.dogs.length : 0} />{' '}
          registered
        </span>
        <Link
          to='/profile/new-dog'
          className='new-dog-link animated fadeInRight'
        >
          <button className='primary'>New Dog</button>
        </Link>
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section animated fadeInLeft delay-5'>
          {isEditMode ? (
            <>
              <UploadPhotos callout={uploadImage} type='user' />
              {uploadedImage && (
                <div className='image-container'>
                  <img src={uploadedImage} alt='uploaded profile' />
                </div>
              )}
            </>
          ) : (
            <div className='image-container'>
              <img src={user.picture || noProfileImg} alt={user.name} />
            </div>
          )}
        </div>
        <div className='right-section animated fadeInRight delay-10'>
          {isEditMode ? (
            <UserEdit
              user={user}
              setIsEditMode={setIsEditMode}
              update={update}
              history={props.history}
            />
          ) : (
            <UserRead user={user} setIsEditMode={setIsEditMode} />
          )}
        </div>
      </ContentContainer>
      {user.dogs && user.dogs.length > 0 && (
        <div className='page-padding'>
          <List dogs={user.dogs} userId={user.id} />
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
