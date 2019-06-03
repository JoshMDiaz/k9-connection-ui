import React, { useState } from 'react'
import HelperService from '../../../../services/HelperService'
import Icon from '../../../common/Icons/Icon'
import Plural from '../../../common/Plural'
import Mdash from '../../../common/Mdash/Mdash'

const DogRead = ({ dog, user, setIsEditMode }) => {
  const [isUserDog, setIsUserDog] = useState(true)
  const [isFavorite, setIsFavorite] = useState()

  const dogInfoConfig = [
    {
      label: 'Gender',
      value: 'gender'
    },
    {
      label: 'Age',
      value: 'birthdate'
    },
    {
      label: 'Papered',
      value: 'papered'
    },
    {
      label: 'AKC Registered',
      value: 'registered'
    },
    {
      label: 'Breed',
      value: 'breeds'
    },
    {
      label: 'Eye Color',
      value: 'eyes'
    }
  ]

  const transformData = value => {
    let newVal = value
    switch (value) {
      case 'papered':
        newVal = dog['papered'] === true ? 'Yes' : 'No'
        break
      case 'registered':
        newVal = dog['registered'] === true ? 'Yes' : 'No'
        break
      case 'eyes':
        newVal = HelperService.capitalize(dog['eyes'])
        break
      case 'birthdate':
        newVal = HelperService.getYearsOld(dog['birthdate'])
        break
      case 'breeds':
        newVal = getDogBreeds(dog[value])
        break
      default:
        newVal = dog[value]
        break
    }
    return newVal
  }

  const getDogBreeds = () => {
    if (dog && dog.breeds) {
      let breeds = dog.breeds.map(b => {
        return b.name
      })
      return breeds.join(', ')
    }
  }

  const messageOwner = () => {
    console.log('message owner')
  }

  const favoriteDog = () => {
    console.log('make favorite')
  }

  return (
    <>
      <div className='info-header'>
        <h2>{dog.name}</h2>
        <div className={`button-container ${isUserDog ? 'is-user' : ''}`}>
          {!isUserDog && (
            <span
              className='img-border with-text not-mobile'
              onClick={messageOwner}
            >
              Message Owner&nbsp;
              <Icon icon='messageNoBorder' customClass='button-icon' />
            </span>
          )}
          <div className='icon-container mobile-only'>
            <Icon
              icon={'message'}
              customClass='message-icon'
              callout={messageOwner}
            />
          </div>
          {!isUserDog && (
            <div className='icon-container'>
              <Icon
                icon={isFavorite ? 'favoriteSolid' : 'favorite'}
                customClass='favorite-icon'
                callout={favoriteDog}
              />
            </div>
          )}
          {isUserDog && (
            <div className='icon-container'>
              <Icon
                icon={'pencil'}
                customClass='pencil-icon'
                callout={() => setIsEditMode(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='info-container'>
        {dogInfoConfig.map((e, i) => (
          <div className='info' key={i}>
            <span className='info-label'>
              {e.label === 'breeds' ? (
                <Plural text={e.label} number={dog.breeds.length} />
              ) : (
                <span>{e.label}: </span>
              )}
            </span>
            <span className='dog-info-data'>
              {transformData(e.value) || <Mdash />}
            </span>
          </div>
        ))}
      </div>
      <div className='about-dog'>
        <span className='info-label'>About</span>
        <p className='description'>{dog.description}</p>
      </div>
    </>
  )
}

export default DogRead
