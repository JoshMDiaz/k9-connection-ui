import React, { useContext } from 'react'
import Icon from '../Icons/Icon'
import UserContext from '../../../userContext'

const BackButton = ({ history, isSearch }) => {
  const uc = useContext(UserContext)

  const goBack = () => {
    if (isSearch) {
      history.push({
        pathname: uc.prevPage
      })
    } else {
      history.goBack()
    }
  }

  return (
    <span className='back-button animated fadeInLeft' onClick={goBack}>
      <Icon icon='leftArrow' />
      <span>Back</span>
    </span>
  )
}

export default BackButton
