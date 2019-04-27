import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton
} from '@material-ui/core'
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

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <Card className='dog-card'>
        <CardMedia
          image='http://placehold.it/500x500'
          title='dog'
          className={`dog-picture ${dog.gender === 'Male' ? 'male' : 'female'}`}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {dog.name}
          </Typography>
          <Typography gutterBottom component='p' className='age'>
            {getYearsOld(dog.birthdate)}
          </Typography>
          <Typography gutterBottom component='p'>
            {dog.description ? (
              <>{trimText(dog.description, 120)}</>
            ) : (
              <>No description available</>
            )}
          </Typography>
        </CardContent>
        <CardActions className='card-actions' disableActionSpacing>
          <IconButton aria-label='Add to favorites'>
            <Favorite />
          </IconButton>
          <IconButton aria-label='Share'>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default DogCard
