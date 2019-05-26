import React, { useState, useEffect } from 'react'
import DogService from '../../../../services/DogService'
import BackButton from '../../../common/BackButton/BackButton'
import DogImages from '../../../Dogs/DogImages/DogImages'
import ContentContainer from '../../../common/ContentContainer'
import DogRead from './DogRead'

const DogProfile = props => {
  const [dog, setDog] = useState({})
  const [user, setUser] = useState()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    getDog(props.match.params.id)
    getCurrentUser()
  }, [])

  const getDog = id => {
    DogService.get(id).then(response => {
      if (response) {
        setDog(response.data)
      }
    })
  }

  const getCurrentUser = () => {
    // Need to check if the dog is a favorite
    console.log('getting current user')
  }

  return (
    <div className='dog-profile'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='left-section'>
          {dog.dog_images && <DogImages images={dog.dog_images} />}
        </div>
        <div className='right-section'>
          {!isEditMode && (
            <DogRead dog={dog} user={user} setIsEditMode={setIsEditMode} />
          )}
        </div>
      </ContentContainer>
    </div>
  )
}

export default DogProfile
