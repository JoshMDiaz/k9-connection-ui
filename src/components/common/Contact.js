import React from 'react'
import { Tooltip } from '@material-ui/core'
import Icon from './Icons/Icon'
import HelperService from '../../services/HelperService'

const Contact = ({ dog }) => {
  return (
    <>
      {(dog.phone || dog.email) && (
        <Tooltip
          title={
            <div>
              {dog.phone && <p>{HelperService.formatPhoneNumber(dog.phone)}</p>}
              {dog.email && <p>{dog.email}</p>}
            </div>
          }
          arrow
        >
          <div className='contact'>
            <span className='img-border with-text not-mobile'>
              <span className='contact-text'>Contact&nbsp;</span>
              <Icon icon='messageNoBorder' customClass='button-icon' />
            </span>
            <div className='icon-container mobile-only'>
              <Icon icon={'message'} customClass='message-icon' />
            </div>
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default Contact
