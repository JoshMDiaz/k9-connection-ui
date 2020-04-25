import React, { useState, useEffect, useContext } from 'react'
import Icon from '../common/Icons/Icon'
import UserFavoriteService from '../../services/UserFavoriteService'
import UserContext from '../../UserContext'

const FavoriteIcon = ({ dog }) => {
  const [favorite, setFavorite] = useState(dog.is_favorite)
  const uc = useContext(UserContext)

  const removeFavoriteDog = () => {
    let params = {
      dog_id: dog.id,
    }
    UserFavoriteService.removeFavorite(params).then((response) => {
      if (response) {
        setFavorite(false)
        uc.openSnack({
          message: `${dog.name} isn't your favorite...`,
          isOpen: true,
          className: 'info',
        })
      }
    })
  }

  const favoriteDog = () => {
    let params = {
      dog_id: dog.id,
    }
    UserFavoriteService.makeFavorite({}, params).then((response) => {
      if (response) {
        setFavorite(true)
        uc.openSnack({
          message: `${dog.name} is now a favorite!`,
          isOpen: true,
          className: 'success',
        })
      }
    })
  }

  useEffect(() => {
    setFavorite(dog.is_favorite)
  }, [dog])

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
