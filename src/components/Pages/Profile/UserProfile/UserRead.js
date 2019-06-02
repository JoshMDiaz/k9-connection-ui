import React, { useState } from 'react'
import Mdash from '../../../common/Mdash/Mdash'
import Icon from '../../../common/Icons/Icon'

const UserRead = ({ user, setIsEditMode }) => {
  const [isUser, setIsUser] = useState(true)

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

  const message = () => {
    console.log('message')
  }

  return (
    <>
      <div className='info-header'>
        <h2>{user.name}</h2>
        <div className={`button-container ${isUser ? 'is-user' : ''}`}>
          {!isUser && (
            <>
              <span
                className='img-border with-text not-mobile'
                onClick={message}
              >
                Message Owner&nbsp;
                <Icon icon='messageNoBorder' customClass='button-icon' />
              </span>
              <div className='icon-container mobile-only'>
                <Icon
                  icon={'message'}
                  customClass='message-icon'
                  callout={message}
                />
              </div>
            </>
          )}
          {isUser && (
            <div className='icon-container'>
              <Icon
                icon={'pencil'}
                customClass='pencil-icon'
                callout={() => setIsEditMode(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='info-container'>
        {userInfoConfig.map((e, i) => (
          <div className='info' key={i}>
            <span className='info-label'>{e.label}:</span>
            {` `}
            <span className='info-data'>{user[e.value] || <Mdash />}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserRead
