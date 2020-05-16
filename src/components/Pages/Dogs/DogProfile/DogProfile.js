import React, { useState, useEffect, useContext, useCallback } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import MainImage from '../../../Dogs/MainImage/MainImage'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'
import DogEdit from './DogEdit'
import UserContext from '../../../../UserContext'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import Gallery from '../Gallery/Gallery'
import Spinner from '../../../common/Spinner/Spinner'

const DogProfile = () => {
  const [state, setState] = useState({
    dog: {},
    user: JSON.parse(localStorage.getItem('user')),
    isEditMode: false,
    isEditImageMode: false,
    uploadedImages: [],
  })
  const { dog, user, isEditMode, uploadedImages, isEditImageMode } = state

  const match = useRouteMatch()
  let uc = useContext(UserContext)

  const getDog = useCallback(() => {
    DogService.get(match.params.id).then((response) => {
      if (response) {
        setState((prevState) => ({
          ...prevState,
          dog: response.data,
        }))
      }
    })
  }, [match])

  const transformBreeds = (breeds, formBreeds) => {
    return breeds
      .filter((b) => {
        return formBreeds.includes(b.name) && b
      })
      .map((b) => {
        return b.id
      })
  }

  const getBreedIds = () => {
    return dog.breeds.map((b) => {
      return b.id
    })
  }

  const updateEditMode = (mode, type) => {
    let attr = type === 'image' ? 'isEditImageMode' : 'isEditMode'
    setState((prevState) => ({
      ...prevState,
      [attr]: mode,
    }))
  }

  const cleanupImages = (images) => {
    return images
      .sort((a, b) => {
        let comparison = 0
        if (a.main_image > b.main_image) {
          comparison = -1
        } else if (a.main_image < b.main_image) {
          comparison = 1
        }
        return comparison
      })
      .map((i) => {
        return i.url
      })
  }

  const updateDog = (dogForm, breeds) => {
    let dog = { ...dogForm }
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreeds(breeds, dogForm.breeds),
    }
    DogService.updateDog(match.params.id, body).then((response) => {
      if (response) {
        uc.openSnack({
          message: 'Dog has been updated!',
          isOpen: true,
          className: 'success',
        })
        updateEditMode(false)
      }
    })
  }

  const updateDogImages = (images) => {
    let dogBody = { ...dog }
    delete dogBody.breeds
    delete dogBody.dog_images
    let body = {
      dog: { ...dogBody },
      breeds: getBreedIds(),
      dog_images: cleanupImages(images),
    }
    DogService.updateDog(match.params.id, body).then((response) => {
      if (response) {
        uc.openSnack({
          message: 'Dog has been updated!',
          isOpen: true,
          className: 'success',
        })
        updateEditMode(false)
      }
    })
  }

  const uploadImages = (files) => {
    files.forEach((file) => {
      let reader = new FileReader()
      reader.onloadend = () => {
        setState((prevState) => ({
          ...prevState,
          uploadedImages: [
            ...prevState.uploadedImages,
            {
              url: reader.result,
              main_image: false,
              uploadedImage: true,
              id: prevState.uploadedImages.length + 1,
            },
          ],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const cancelEdit = () => {
    setState((prevState) => ({
      ...prevState,
      isEditMode: false,
    }))
  }

  const cancelEditImages = () => {
    setState((prevState) => ({
      ...prevState,
      uploadedImages: [],
      isEditImageMode: false,
    }))
  }

  const removeUploadedImage = (image) => {
    let uploadedArr = uploadedImages
      .map((u) => {
        if (u.id !== image.id) {
          return u
        }
        return null
      })
      .filter(Boolean)
    setState((prevState) => ({
      ...prevState,
      uploadedImages: uploadedArr,
    }))
  }

  useEffect(() => {
    getDog()
  }, [getDog])

  return (
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {isEditImageMode && (
            <UploadPhotos callout={uploadImages} type='dog' />
          )}
          {!isEditImageMode && (
            <>
              {dog?.dog_images && user?.id ? (
                <MainImage
                  images={dog.dog_images}
                  editable={dog.user_id === user.id}
                  updateEditMode={updateEditMode}
                />
              ) : (
                <Spinner type='circle' />
              )}
            </>
          )}
        </div>
        <div className={`right-section ${isEditMode ? 'is-edit' : ''}`}>
          {!isEditMode ? (
            <DogRead
              dog={dog}
              user={user}
              setIsEditMode={updateEditMode}
              getDog={getDog}
            />
          ) : (
            <DogEdit
              dog={dog}
              user={user}
              cancel={cancelEdit}
              update={updateDog}
              isEdit
            >
              {({ form, breeds }) => (
                <div className='form-button-container'>
                  <button className={'plain'} onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button
                    className={'primary'}
                    onClick={() => updateDog(form, breeds)}
                  >
                    Save
                  </button>
                </div>
              )}
            </DogEdit>
          )}
        </div>
      </ContentContainer>
      {dog.dog_images && (
        <div
          style={{ maxWidth: '1472px', margin: 'auto', padding: '0 20px 20px' }}
          className='animated fadeIn delay-10 relative'
        >
          <Gallery
            images={dog.dog_images}
            uploadedImages={isEditImageMode ? uploadedImages : null}
            isEdit={isEditImageMode}
            cancelEditImages={cancelEditImages}
            updateDogImages={updateDogImages}
            removeUploadedImage={removeUploadedImage}
          />
        </div>
      )}
    </div>
  )
}

export default DogProfile
