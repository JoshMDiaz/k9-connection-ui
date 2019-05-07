import React, { useState, useEffect } from 'react'
import DogService from '../../services/DogService'
import favoriteIcon from '../../images/icons/favorite.svg'
import HelperService from '../../services/HelperService'

const DogProfile = props => {
  const [dog, setDog] = useState({})

  useEffect(() => {
    getDog(props.match.params.id)
  }, [])

  const getDog = id => {
    DogService.get(id).then(response => {
      if (response) {
        setDog(response.data)
      }
    })
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
      case 'birthdate':
        newVal = HelperService.getYearsOld(dog['birthdate'])
        break
      default:
        newVal = dog[value]
        break
    }
    return newVal
  }

  return (
    <div className='dog-profile'>
      <div className='dog-profile-header'>Back Button here</div>
      <div className='profile-container'>
        <div className='left-section'>dog pics</div>
        <div className='right-section'>
          <div className='dog-info-header'>
            <h2>{dog.name}</h2>
            <div className='button-container'>
              <button className='primary'>Message Owner</button>
              <span className='img-border'>
                <img src={favoriteIcon} alt='favorite' />
              </span>
            </div>
          </div>
          <div className='dog-info-container'>
            {dogInfoConfig.map((e, i) => (
              <div className='dog-info' key={i}>
                <span className='dog-info-label'>{e.label}</span>
                <span className='dog-info-data'>{transformData(e.value)}</span>
              </div>
            ))}
          </div>
          <div className='about-dog'>
            <span className='dog-info-label'>About</span>
            <p>{dog.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DogProfile
