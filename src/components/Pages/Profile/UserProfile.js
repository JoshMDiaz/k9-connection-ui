import React, { useState, useEffect } from 'react'
import DogService from '../../../services/DogService'
import HelperService from '../../../services/HelperService'
import BackButton from '../../common/BackButton/BackButton'
import ContentContainer from '../../common/ContentContainer'

const UserProfile = props => {
  const [user, setUser] = useState({})

  useEffect(() => {
    // getDog(props.match.params.id)
    getCurrentUser(props.match.params.id)
  }, [])

  // const getDog = id => {
  //   DogService.get(id).then(response => {
  //     if (response) {
  //       setUser(response.data)
  //     }
  //   })
  // }

  const getCurrentUser = dogId => {
    // Need to check if the dog is a favorite
    console.log('getting current user')
  }

  const userInfoConfig = [
    {
      label: 'Phone',
      value: 'phone'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Address',
      value: 'address'
    },
    {
      label: 'City',
      value: 'city'
    },
    {
      label: 'Zip',
      value: 'zip'
    }
  ]

  return (
    <div className='user-profile'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
      </div>
      <ContentContainer customClass='profile-container'>
        <div className='user-info-header'>{user.nickname || user.name}</div>
        <div className='user-info-container'>
          {userInfoConfig.map((e, i) => (
            <div className='user-info' key={i}>
              <span className='user-info-label'>{e.label}:</span>
              <span className='user-info-data'>{e.value}</span>
            </div>
          ))}
        </div>
      </ContentContainer>
    </div>
  )
}

export default UserProfile
