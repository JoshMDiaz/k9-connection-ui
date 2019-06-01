import React from 'react'
import Mdash from '../../../common/Mdash/Mdash'

const UserRead = ({ user }) => {
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
    <div className='user-profile-read-only'>
      <div className='user-info-header'>{user.nickname || user.name}</div>
      <div className='user-info-container'>
        {userInfoConfig.map((e, i) => (
          <div className='user-info' key={i}>
            <span className='user-info-label'>{e.label}:</span>
            {` `}
            <span className='user-info-data'>{user[e.value] || <Mdash />}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserRead
