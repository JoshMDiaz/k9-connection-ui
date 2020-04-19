import React, { useState, useEffect, useContext, useCallback } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import DogImages from '../../../Dogs/DogImages/DogImages'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'
import DogEdit from './DogEdit'
import moment from 'moment'
import UserContext from '../../../../userContext'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import Gallery from '../Gallery/Gallery'

const DogProfile = () => {
  const [dog, setDog] = useState({})
  const [user, setUser] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])

  const match = useRouteMatch()
  let uc = useContext(UserContext)

  const getDog = useCallback(() => {
    DogService.get(match.params.id).then((response) => {
      if (response) {
        setDog(response.data)
        // setUploadedImages(response.data.dog_images)
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

  const updateDog = (dogForm, breeds) => {
    let dog = { ...dogForm },
      images = dog.dog_images
    dog.birthdate = moment(dog.birthdate).format('YYYY-MM-DD')
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
        setIsEditMode(false)
      }
    })
  }

  const uploadImage = (files) => {
    if (files.length > 0) {
      let reader = new FileReader()
      let file = files[0]
      reader.onloadend = () => {
        setUploadedImages([...uploadedImages, reader.result])
      }
      reader.readAsDataURL(file)
    } else {
      uc.openSnack({
        message: 'File type not accepted. Only .jpg and .png are accepted.',
        isOpen: true,
      })
    }
  }

  useEffect(() => {
    getDog()
  }, [getDog])

  useEffect(() => {
    setUser(uc.user)
  }, [uc])

  return (
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {isEditMode && (
            <>
              <UploadPhotos callout={uploadImage} type='dog' />
              {uploadedImages.length > 0 && (
                <div className='dog-grid'>
                  {uploadedImages.map((e, i) => (
                    <img
                      src={e}
                      alt='uploaded dog'
                      key={e.id}
                      className='dog-image'
                    />
                  ))}
                </div>
              )}
            </>
          )}
          {!isEditMode && dog.dog_images && (
            <DogImages images={dog.dog_images} />
          )}
        </div>
        <div className='right-section'>
          {!isEditMode ? (
            <DogRead
              dog={dog}
              user={user}
              setIsEditMode={setIsEditMode}
              getDog={getDog}
            />
          ) : (
            <>
              <DogEdit
                dog={dog}
                user={user}
                setIsEditMode={setIsEditMode}
                update={updateDog}
              />
            </>
          )}
        </div>
      </ContentContainer>
      {dog.dog_images && (
        <div
          style={{ maxWidth: '1472px', margin: 'auto', padding: '0 20px 20px' }}
        >
          <Gallery images={dog.dog_images} />
        </div>
      )}
    </div>
  )
}

export default DogProfile
