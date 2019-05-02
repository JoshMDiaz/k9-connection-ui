import React from 'react'
import { IconButton } from '@material-ui/core'
import { Favorite, Share } from '@material-ui/icons'
import moment from 'moment'
import Plural from '../common/Plural'

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
          <p>
            <span className='gender'>{dog.gender}</span> /
            <span className='age'>{getYearsOld(dog.birthdate)}</span>
          </p>
          <p>
            {dog.description ? (
              <>{trimText(dog.description, 120)}</>
            ) : (
              <>No description available</>
            )}
          </p>
        </div>
        <div className='card-footer'>
          <button className='view-profile' onClick={() => viewProfile(dog)}>
            View Profile
          </button>
          <IconButton aria-label='Add to favorites'>
            <Favorite />
          </IconButton>
          <IconButton aria-label='Share'>
            <Share />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default DogCard
