import React from 'react'
import Icon from '../Icons/Icon'

const BackButton = ({ history }) => {
  const goBack = () => {
    // history.push({
    //   search: null
    // })
    history.goBack()
  }

  return (
    <span className='back-button animated fadeInLeft' onClick={goBack}>
      <Icon icon='leftArrow' />
      <span>Back</span>
    </span>
  )
}

export default BackButton
