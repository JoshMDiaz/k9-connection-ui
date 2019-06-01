import React, { useState, useEffect } from 'react'
import DogService from '../../../services/DogService'
import BackButton from '../../common/BackButton/BackButton'
import ContentContainer from '../../common/ContentContainer'
import List from '../../Dogs/List'
import LoadingCard from '../../common/LoadingCard/LoadingCard'

const UserProfile = props => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [dogs, setDogs] = useState([])

  let isCancelled,
    count = 0

  useEffect(() => {
    !isCancelled && getDogs()
    getCurrentUser(props.match.params.id)
  }, [])

  const getDogs = filter => {
    !isCancelled && setLoading(true)
    let params = {
      owner_id: 1,
      name: 'Test Rafi'
    }
    DogService.getAll(params).then(response => {
      if (response) {
        !isCancelled && setDogs(response.data)
        !isCancelled && setLoading(false)
      }
    })
  }

  const getCurrentUser = dogId => {
    // Need to check if the dog is a favorite
    console.log('getting current user')
    setUser({})
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
      <div className='page-padding'>
        {!loading ? (
          <List dogs={dogs} />
        ) : (
          <div className='card-list'>
            {[...Array(3).keys()].map(row => {
              count++
              return <LoadingCard key={row} count={count} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
