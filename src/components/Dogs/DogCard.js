import React from 'react'
import messageIcon from '../../images/icons/message.svg'
import favoriteIcon from '../../images/icons/favorite.svg'
import { Link } from 'react-router-dom'
import HelperService from '../../services/HelperService'

const DogCard = ({ dog, count }) => {
  const trimText = (text, characterLength) => {
    return text.length > characterLength
      ? `${text.substring(0, characterLength).trim()}...`
      : text
  }

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <div className='card dog-card'>
        <div className='top-content'>
          <img
            src={'http://placehold.it/1200x628'}
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
          <Link to={`/profile/dog/${dog.id}`}>
            <button className='view-profile primary'>View Profile</button>
          </Link>
          <span className='img-border'>
            <img src={messageIcon} alt='message' />
          </span>
          <span className='img-border'>
            <img src={favoriteIcon} alt='favorite' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default DogCard
