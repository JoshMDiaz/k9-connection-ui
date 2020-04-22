import React, { useReducer, useEffect, useContext, useCallback } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import MainImage from '../../../Dogs/MainImage/MainImage'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'
import DogEdit from './DogEdit'
import { format } from 'date-fns'
import UserContext from '../../../../userContext'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import Gallery from '../Gallery/Gallery'
import HelperService from '../../../../services/HelperService'

const DogProfile = () => {
  const initialState = {
    dog: {},
    user: {},
    isEditMode: false,
    isEditImageMode: false,
    uploadedImages: [],
  }

  const [state, dispatch] = useReducer(HelperService.reducer, initialState)
  const { dog, user, isEditMode, uploadedImages, isEditImageMode } = state

  const match = useRouteMatch()
  let uc = useContext(UserContext)

  const getDog = useCallback(() => {
    DogService.get(match.params.id).then((response) => {
      if (response) {
        dispatch({
          type: 'UPDATE',
          payload: {
            dog: response.data,
          },
        })
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
    dispatch({
      type: 'UPDATE',
      payload: {
        [attr]: mode,
      },
    })
  }

  const updateDog = (dogForm, breeds) => {
    let dog = { ...dogForm },
      images = dog.dog_images
    dog.birthdate = format(dog.birthdate, 'yyyy-MM-dd')
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreeds(breeds, dogForm.breeds),
      dog_images: images,
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
      dog_images: images,
    }
    console.log(body)

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

  const uploadImage = (files) => {
    if (files.length > 0) {
      let reader = new FileReader()
      let file = files[0]
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE',
          payload: {
            uploadedImages: [
              ...uploadedImages,
              { url: reader.result, main_image: false },
            ],
          },
        })
      }
      reader.readAsDataURL(file)
    } else {
      uc.openSnack({
        message: 'File type not accepted. Only .jpg and .png are accepted.',
        isOpen: true,
      })
    }
  }

  const cancelEdit = () => {
    dispatch({
      type: 'UPDATE',
      payload: {
        isEditMode: false,
      },
    })
  }

  const cancelEditImages = () => {
    dispatch({
      type: 'UPDATE',
      payload: {
        uploadedImages: [],
        isEditImageMode: false,
      },
    })
  }

  useEffect(() => {
    getDog()
  }, [getDog])

  useEffect(() => {
    dispatch({
      type: 'UPDATE',
      payload: {
        user: uc.user,
      },
    })
  }, [uc])

  return (
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {isEditImageMode && <UploadPhotos callout={uploadImage} type='dog' />}
          {!isEditImageMode && dog.dog_images && dog.user_id && user.id && (
            <MainImage
              images={dog.dog_images}
              editable={dog.user_id === user.id}
              updateEditMode={updateEditMode}
            />
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
          className='animated fadeIn delay-10'
        >
          <Gallery
            images={dog.dog_images}
            uploadedImages={isEditImageMode ? uploadedImages : null}
            isEdit={isEditImageMode}
            cancelEditImages={cancelEditImages}
            updateDogImages={updateDogImages}
          />
        </div>
      )}
    </div>
  )
}

export default DogProfile
