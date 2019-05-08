import React from 'react'

import { ReactComponent as ChevronDown } from '../../../images/icons/chevron_down.svg'
import { ReactComponent as Favorite } from '../../../images/icons/favorite.svg'
import { ReactComponent as FavoriteSolid } from '../../../images/icons/favorite_solid.svg'
import { ReactComponent as LeftArrow } from '../../../images/icons/left_arrow.svg'
import { ReactComponent as Message } from '../../../images/icons/message.svg'
import { ReactComponent as MessageNoBorder } from '../../../images/icons/message_no_border.svg'

const iconsList = {
  chevronDown: <ChevronDown />,
  leftArrow: <LeftArrow />,
  message: <Message />,
  messageNoBorder: <MessageNoBorder />,
  favorite: <Favorite />,
  favoriteSolid: <FavoriteSolid />
}

export default iconsList
