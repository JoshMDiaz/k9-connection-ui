import React, { useState, useEffect } from 'react'
import Icon from '../common/Icons/Icon'
import UserFavoriteService from '../../services/UserFavoriteService'
import { Snackbar } from '@material-ui/core'

const FavoriteIcon = ({ dog }) => {
  const [favorite, setFavorite] = useState(dog.is_favorite)
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })
  useEffect(() => {
    setFavorite(dog.is_favorite)
  }, [dog])

  const removeFavoriteDog = () => {
    let params = {
      dog_id: dog.id
    }
    UserFavoriteService.removeFavorite(params).then(response => {
      if (response) {
        setFavorite(false)
        setSnack({
          message: `${dog.name} isn't your favorite...`,
          isOpen: true,
          className: 'info'
        })
      }
    })
  }

  const favoriteDog = () => {
    let params = {
      dog_id: dog.id
    }
    UserFavoriteService.makeFavorite({}, params).then(response => {
      if (response) {
        setFavorite(true)
        setSnack({
          message: `${dog.name} is now a favorite!`,
          isOpen: true,
          className: 'success'
        })
      }
    })
  }

  const closeSnack = () => {
    setSnack({
      ...snack,
      isOpen: false
    })
  }

  return (
    <div className='icon-container'>
      <Icon
        icon={favorite ? 'favoriteSolid' : 'favorite'}
        customClass='favorite-icon'
        callout={favorite ? removeFavoriteDog : favoriteDog}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={`top,right`}
        open={snack.isOpen}
        onClose={closeSnack}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        autoHideDuration={3000}
        className={`snackbar ${snack.className || 'error'}`}
        message={<span id='message-id'>{snack.message}</span>}
      />
    </div>
  )
}

export default FavoriteIcon
