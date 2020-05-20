import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
  clearDogCache,
  getDog,
  updateDog,
} from '../../../../services/DogService'
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
    uploadedImages: [],
    imagesCopy: [],
  })
  const { dog, user, isEditMode, uploadedImages, imagesCopy } = state

  const match = useRouteMatch()
  let uc = useContext(UserContext)

  const getCurrentDog = useCallback(() => {
    clearDogCache()
    getDog(match.params.id).then((response) => {
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

  const updateEditMode = (mode) => {
    setState((prevState) => ({
      ...prevState,
      isEditMode: mode,
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

  const update = (dogForm, breeds) => {
    let dog = { ...dogForm }
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreeds(breeds, dogForm.breeds),
      dog_images: cleanupImages(imagesCopy),
    }
    updateDog(match.params.id, body).then((response) => {
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

  const updateImageCopy = useCallback((images) => {
    setState((prevState) => ({
      ...prevState,
      imagesCopy: images,
    }))
  }, [])

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
    getCurrentDog()
  }, [getCurrentDog])

  return (
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {isEditMode && <UploadPhotos callout={uploadImages} type='dog' />}
          {!isEditMode && (
            <>
              {dog?.dog_images && user?.id ? (
                <MainImage images={dog.dog_images} />
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
              getCurrentDog={getCurrentDog}
            />
          ) : (
            <DogEdit
              dog={dog}
              user={user}
              cancel={cancelEdit}
              update={update}
              isEdit
            >
              {({ form, breeds }) => (
                <div className='form-button-container'>
                  <button className={'plain'} onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button
                    className={'primary'}
                    onClick={() => update(form, breeds)}
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
            uploadedImages={isEditMode ? uploadedImages : null}
            isEdit={isEditMode}
            removeUploadedImage={removeUploadedImage}
            updateImageCopy={updateImageCopy}
          />
        </div>
      )}
    </div>
  )
}

export default DogProfile
