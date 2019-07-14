import React, { useState, useEffect, useContext } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import DogImages from '../../../Dogs/DogImages/DogImages'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'
import DogEdit from './DogEdit'
import { Snackbar } from '@material-ui/core'
import moment from 'moment'
import UserContext from '../../../../userContext'

const DogProfile = props => {
  const [dog, setDog] = useState({})
  const [user, setUser] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })
  let uc = useContext(UserContext)

  useEffect(() => {
    getDog()
  }, [])

  useEffect(() => {
    setUser(uc.user)
  }, [uc])

  const getDog = () => {
    DogService.get(props.match.params.id).then(response => {
      if (response) {
        setDog(response.data)
      }
    })
  }

  const transformBreedIds = breeds => {
    return breeds.map(b => {
      return b.id
    })
  }

  const updateDog = dogForm => {
    let dog = { ...dogForm },
      images = dog.dog_images
    dog.birthdate = moment(dog.birthdate).format('YYYY-MM-DD')
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreedIds(dogForm.breeds),
      dog_images: images
    }
    DogService.updateDog(props.match.params.id, body).then(response => {
      if (response) {
        setSnack({
          message: 'Dog has been updated!',
          isOpen: true,
          className: 'success'
        })
        setIsEditMode(false)
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
    <div className='dog-profile profile'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {dog.dog_images && <DogImages images={dog.dog_images} />}
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
        className={`snackbar ${snack.className}`}
        message={<span id='message-id'>{snack.message}</span>}
      />
    </div>
  )
}

export default DogProfile
