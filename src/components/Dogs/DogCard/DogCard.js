import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HelperService from '../../../services/HelperService'
import Icon from '../../common/Icons/Icon'
import noImage from '../../../images/no-image.jpg'

const DogCard = ({ dog, count }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [image, setImage] = useState({})

  useEffect(() => {
    setIsFavorite()
    setImage(dog.dog_images[0])
  }, [])

  const trimText = (text, characterLength) => {
    return text.length > characterLength
      ? `${text.substring(0, characterLength).trim()}...`
      : text
  }

  const messageOwner = () => {
    console.log('message owner')
  }

  const favoriteDog = () => {
    console.log('favorite this dog')
  }

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <div className='card dog-card'>
        <div className='top-content'>
          <img
            src={image ? image.url : noImage}
            alt={dog.name}
            className={`dog-picture`}
          />
          <div className='card-content'>
            <h2>{dog.name}</h2>
            <p className='gender-age'>
              <span className='gender'>{dog.gender}</span>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <span className='age'>
                {HelperService.getYearsOld(dog.birthdate)}
              </span>
            </p>
            <p>
              {dog.description ? (
                <>{trimText(dog.description, 150)}</>
              ) : (
                <>No description available</>
              )}
            </p>
          </div>
        </div>
        <div className='card-footer'>
          <Link to={`/dogs/${dog.id}`}>
            <button className='view-profile primary'>View Profile</button>
          </Link>
          <Icon icon='message' callout={messageOwner} />
          <Icon
            icon={isFavorite ? 'favoriteSolid' : 'favorite'}
            callout={favoriteDog}
          />
        </div>
      </div>
    </div>
  )
}

export default DogCard
