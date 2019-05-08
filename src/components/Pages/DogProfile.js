import React, { useState, useEffect } from 'react'
import DogService from '../../services/DogService'
import HelperService from '../../services/HelperService'
import Icon from '../common/Icons/Icon'
import BackButton from '../common/BackButton/BackButton'
// import { ReactComponent as Message } from '../../images/icons/message.svg'

const DogProfile = props => {
  const [dog, setDog] = useState({})
  const [isFavorite, setIsFavorite] = useState()

  useEffect(() => {
    getDog(props.match.params.id)
    getCurrentUser(props.match.params.id)
  }, [])

  const getDog = id => {
    DogService.get(id).then(response => {
      if (response) {
        setDog(response.data)
      }
    })
  }

  const getCurrentUser = dogId => {
    // Need to check if the dog is a favorite
    console.log('getting current user')
    setIsFavorite(true)
  }

  const dogInfoConfig = [
    {
      label: 'Gender',
      value: 'gender'
    },
    {
      label: 'Papered',
      value: 'papered'
    },
    {
      label: 'Age',
      value: 'birthdate'
    },
    {
      label: 'AKC Registered',
      value: 'registered'
    },
    {
      label: 'Breed',
      value: 'breed'
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
      default:
        newVal = dog[value]
        break
    }
    return newVal
  }

  const messageOwner = () => {
    console.log('message owner')
  }

  const favoriteDog = () => {
    console.log('make favorite')
  }

  return (
    <div className='dog-profile'>
      <div className='dog-profile-header'>
        <BackButton history={props.history} />
      </div>
      <div className='profile-container animated fadeInUp'>
        <div className='left-section'>dog pics</div>
        <div className='right-section'>
          <div className='dog-info-header'>
            <h2>{dog.name}</h2>
            <div className='button-container'>
              <span className='img-border with-text' onClick={messageOwner}>
                Message Owner&nbsp;
                <Icon icon='messageNoBorder' customClass='button-icon' />
              </span>
              <span
                className={
                  isFavorite ? 'favorite-icon-container' : 'img-border'
                }
                onClick={favoriteDog}
              >
                <Icon
                  icon={isFavorite ? 'favoriteSolid' : 'favorite'}
                  customClass='favorite-icon'
                />
              </span>
            </div>
          </div>
          <div className='dog-info-container'>
            {dogInfoConfig.map((e, i) => (
              <div className='dog-info' key={i}>
                <span className='dog-info-label'>{e.label}:</span>
                <span className='dog-info-data'>{transformData(e.value)}</span>
              </div>
            ))}
          </div>
          <div className='about-dog'>
            <span className='dog-info-label'>About</span>
            <span className='description'>{dog.description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DogProfile
