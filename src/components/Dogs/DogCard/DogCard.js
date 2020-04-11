import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HelperService from '../../../services/HelperService'
import Icon from '../../common/Icons/Icon'
import noImage from '../../../images/no-image.jpg'
import FavoriteIcon from '../../FavoriteIcon/FavoriteIcon'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip, Zoom } from '@material-ui/core'

const DogCard = ({ dog, count, user }) => {
  const [image, setImage] = useState({})

  useEffect(() => {
    findMainImage(dog.dog_images)
  }, [])

  const findMainImage = (images) => {
    let mainImage = images.filter((i) => {
      return i.main_image
    })
    if (mainImage.length === 0) {
      mainImage = [images[0]]
    }
    setImage(mainImage[0])
  }

  const trimText = (text, characterLength) => {
    return text.length > characterLength
      ? `${text.substring(0, characterLength).trim()}...`
      : text
  }

  const messageOwner = () => {
    console.log('message owner')
  }
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip)

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <div className='card dog-card'>
        <div className='top-content'>
          <Link to={`/dogs/${dog.id}`}>
            <img
              src={image ? image.url : noImage}
              alt={dog.name}
              className={`dog-picture`}
            />
          </Link>
          <div className='card-content'>
            <h2>{dog.name}</h2>
            <span className='gender-age'>
              <span className='gender'>{dog.gender}</span>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <span className='age'>
                {HelperService.getYearsOld(dog.birthdate)}
              </span>
            </span>
            <span className='dog-breed'>
              {dog.breeds.length > 1 ? (
                <LightTooltip
                  title={
                    <>
                      {dog.breeds.map((e, i) => (
                        <p className='breed-names' key={i}>
                          {e.name}
                        </p>
                      ))}
                    </>
                  }
                  placement='right'
                  TransitionComponent={Zoom}
                >
                  <span>{dog.breeds.length} Breeds</span>
                </LightTooltip>
              ) : (
                <span>{dog.breeds[0].name}</span>
              )}
            </span>
            {user && user.city && user.state && (
              <span className='location'>
                {user.city || 'Lehi'}, {user.state || 'UT'}
              </span>
            )}
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
          {user.id !== dog.user_id && (
            <span className='footer-icons'>
              <div className='icon-container'>
                <Icon icon='message' callout={messageOwner} />
              </div>
              <FavoriteIcon dog={dog} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DogCard
