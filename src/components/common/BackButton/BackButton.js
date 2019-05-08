import React from 'react'
import Icon from '../Icons/Icon'

const BackButton = ({ history }) => {
  return (
    <span className='back-button animated fadeInLeft' onClick={history.goBack}>
      <Icon icon='leftArrow' />
      <span>Back</span>
    </span>
  )
}

export default BackButton
