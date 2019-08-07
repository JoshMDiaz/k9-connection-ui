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
        uc.setUser(user)
        setUploadedImage(user.picture)
      }
    })
  }

  const update = form => {
    let body = {
      ...form,
      picture: uploadedImage || form.picture
    }
    UserService.updateUser(uc.user.sub, body).then(response => {
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
        <span className='animated fadeInLeft delay-5'>
          {uc.user.dogs ? uc.user.dogs.length : 0}{' '}
          <Plural text='dog' number={uc.user.dogs ? uc.user.dogs.length : 0} />{' '}
          registered
        </span>
        <Link
          to='/profile/new-dog'
          className='new-dog-link animated fadeInRight delay-5'
        >
          <button className='primary'>New Dog</button>
        </Link>
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
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
              <img src={uc.user.picture || noProfileImg} alt={uc.user.name} />
            </div>
          )}
        </div>
        <div className='right-section'>
          {isEditMode ? (
            <UserEdit
              user={uc.user}
              setIsEditMode={setIsEditMode}
              update={update}
              history={props.history}
            />
          ) : (
            <UserRead user={uc.user} setIsEditMode={setIsEditMode} />
          )}
        </div>
      </ContentContainer>
      {uc.user.dogs && uc.user.dogs.length > 0 && (
        <div className='page-padding padding-top-0'>
          <List dogs={uc.user.dogs} user={uc.user} startingCount={8} />
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
