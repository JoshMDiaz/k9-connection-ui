import React from 'react'
import moment from 'moment'
import Plural from '../common/Plural'
import messageIcon from '../../images/icons/message.svg'
import favoriteIcon from '../../images/icons/favorite.svg'

const getYearsOld = date => {
  let start = moment(date),
    end = moment(),
    duration = moment.duration(end.diff(start)),
    years = Math.round(duration.asYears())
  return (
    <span>
      {years} <Plural text='year' number={years} /> old
    </span>
  )
}

const DogCard = ({ dog, count }) => {
  const trimText = (text, characterLength) => {
    return text.length > characterLength
      ? `${text.substring(0, characterLength).trim()}...`
      : text
  }

  const viewProfile = dog => {
    console.log(dog)
  }

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <div className='card dog-card'>
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
            <span className='age'>{getYearsOld(dog.birthdate)}</span>
          </p>
          <p>
            {dog.description ? (
              <>{trimText(dog.description, 150)}</>
            ) : (
              <>No description available</>
            )}
          </p>
        </div>
        <div className='card-footer'>
          <button
            className='view-profile primary'
            onClick={() => viewProfile(dog)}
          >
            View Profile
          </button>
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
