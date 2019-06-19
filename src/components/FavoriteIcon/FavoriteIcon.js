import React, { useState, useEffect } from 'react'
import Icon from '../common/Icons/Icon'
import UserFavoriteService from '../../services/UserFavoriteService'

const FavoriteIcon = ({ dog }) => {
  const [favorite, setFavorite] = useState(dog.is_favorite)
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
      }
    })
  }

  return (
    <div className='icon-container'>
      <Icon
        icon={favorite ? 'favoriteSolid' : 'favorite'}
        customClass='favorite-icon'
        callout={favorite ? removeFavoriteDog : favoriteDog}
      />
    </div>
  )
}

export default FavoriteIcon
