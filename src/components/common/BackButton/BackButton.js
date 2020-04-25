import React, { useContext } from 'react'
import Icon from '../Icons/Icon'
import UserContext from '../../../UserContext'
import { useHistory } from 'react-router-dom'

const BackButton = ({ isSearch }) => {
  const uc = useContext(UserContext),
    history = useHistory()

  const goBack = () => {
    if (isSearch) {
      history.push({
        pathname: uc.prevPage,
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
