import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ContentContainer from '../../../common/ContentContainer'
import List from '../../../Dogs/List'
import UserContext from '../../../../UserContext'
import UserRead from './UserRead'
import UserEdit from './UserEdit'
import {
  clearUserCache,
  getUser,
  updateUser,
} from '../../../../services/UserService'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'
import Plural from '../../../common/Plural'
import noProfileImg from '../../../../images/icons/user.svg'

const UserProfile = (props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const uc = useContext(UserContext)

  const getCurrentUser = useCallback(() => {
    clearUserCache()
    getUser().then((response) => {
      if (response?.data) {
        let user = response.data
        let modifiedUserDogs = user?.dogs.map((d) => {
          delete d.dog_images
          return d
        })
        user.dogs = modifiedUserDogs
        localStorage.setItem('user', JSON.stringify(user))
        uc.setUser(user)
        setUploadedImage(user.picture)
      }
    })
  }, [uc])

  const update = (form) => {
    let body = {
      ...form,
      picture: uploadedImage || form.picture,
    }
    updateUser(uc.user.sub, body).then((response) => {
      if (response) {
        uc.openSnack({
          message: 'Your account has been updated!',
          isOpen: true,
          className: 'success',
        })
        getCurrentUser()
        setIsEditMode(false)
        localStorage.removeItem('isEditMode')
      }
    })
  }

  const uploadImage = (files) => {
    let reader = new FileReader()
    let file = files[0]
    reader.onloadend = () => {
      setUploadedImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    getCurrentUser()
    if (localStorage.getItem('isEditMode')) {
      setIsEditMode(true)
    }
  }, [getCurrentUser])

  useEffect(() => {
    setUploadedImage(uc.user.picture)
  }, [isEditMode, uc.user.picture])

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
        <ContentContainer customClass='user-dog-list'>
          <List dogs={uc.user.dogs} />
        </ContentContainer>
      )}
    </div>
  )
}

export default UserProfile
