import React, { useState, useEffect, useContext } from 'react'
import BackButton from '../../common/BackButton/BackButton'
import ContentContainer from '../../common/ContentContainer'
import List from '../../Dogs/List'
import userContext from '../../../userContext'
import Mdash from '../../common/Mdash/Mdash'
// import UserService from '../../../services/UserService'

const UserProfile = props => {
  const [user, setUser] = useState({})
  const uc = useContext(userContext)

  let isCancelled

  useEffect(() => {
    !isCancelled && setUser(uc.user)
    // getUser()
    return () => {
      isCancelled = true
    }
  }, [])

  // const getUser = () => {
  //   UserService.get(uc.user.sub).then(response => {
  //     if (response) {
  //       setUser(response.id)
  //     }
  //   })
  // }

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
              {` `}
              <span className='user-info-data'>
                {user[e.value] || <Mdash />}
              </span>
            </div>
          ))}
        </div>
      </ContentContainer>
      <div className='page-padding'>
        {uc.user.dogs && uc.user.dogs.length > 0 && (
          <List dogs={uc.user.dogs} />
        )}
      </div>
    </div>
  )
}

export default UserProfile
