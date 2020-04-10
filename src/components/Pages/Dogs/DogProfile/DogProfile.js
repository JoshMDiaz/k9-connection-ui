import React, { useState, useEffect, useContext } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import DogImages from '../../../Dogs/DogImages/DogImages'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'
import DogEdit from './DogEdit'
import moment from 'moment'
import UserContext from '../../../../userContext'
import UploadPhotos from '../../../Dogs/UploadPhotos/UploadPhotos'

const DogProfile = (props) => {
  const [dog, setDog] = useState({})
  const [user, setUser] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  let uc = useContext(UserContext)

  const getDog = () => {
    DogService.get(props.match.params.id).then((response) => {
      if (response) {
        setDog(response.data)
        // setUploadedImages(response.data.dog_images)
      }
    })
  }

  const transformBreedIds = (breeds) => {
    return breeds.map((b) => {
      return b.id
    })
  }

  const updateDog = (dogForm) => {
    let dog = { ...dogForm },
      images = dog.dog_images
    dog.birthdate = moment(dog.birthdate).format('YYYY-MM-DD')
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreedIds(dogForm.breeds),
      dog_images: images,
    }
    DogService.updateDog(props.match.params.id, body).then((response) => {
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
  })

  useEffect(() => {
    setUser(uc.user)
  }, [uc])

  return (
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
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
                      key={i}
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
            <DogEdit
              dog={dog}
              user={user}
              setIsEditMode={setIsEditMode}
              update={updateDog}
            />
          )}
        </div>
      </ContentContainer>
    </div>
  )
}

export default DogProfile
