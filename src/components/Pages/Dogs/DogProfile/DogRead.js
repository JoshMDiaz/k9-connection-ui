import React from 'react'
import { capitalize, getYearsOld } from '../../../../services/HelperService'
import Icon from '../../../common/Icons/Icon'
import Plural from '../../../common/Plural'
import Mdash from '../../../common/Mdash/Mdash'
import FavoriteIcon from '../../../FavoriteIcon/FavoriteIcon'
import Contact from '../../../common/Contact'

const DogRead = ({ dog, user, setIsEditMode }) => {
  const dogInfoConfig = [
    {
      label: 'Gender',
      value: 'gender',
    },
    {
      label: 'Age',
      value: 'birthdate',
    },
    {
      label: 'Papered',
      value: 'papered',
    },
    {
      label: 'AKC Registered',
      value: 'registered',
    },
    {
      label: 'Breed',
      value: 'breeds',
    },
    {
      label: 'Eye Color',
      value: 'eyes',
    },
  ]

  const transformData = (value) => {
    let newVal = value
    switch (value) {
      case 'papered':
        newVal = dog['papered'] === true ? 'Yes' : 'No'
        break
      case 'registered':
        newVal = dog['registered'] === true ? 'Yes' : 'No'
        break
      case 'eyes':
        newVal = capitalize(dog['eyes'])
        break
      case 'birthdate':
        newVal = getYearsOld(dog['birthdate'])
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
      let breeds = dog.breeds.map((b) => {
        return b.name
      })
      return breeds.join(', ')
    }
  }

  return (
    <>
      <div className='info-header'>
        <h2>{dog.name}</h2>
        {dog.user_id && user.id && (
          <div
            className={`button-container ${
              dog.user_id === user.id ? 'is-user' : ''
            }`}
          >
            {dog.user_id !== user.id && (
              <>
                <Contact dog={dog} />
                <FavoriteIcon dog={dog} />
              </>
            )}
            {dog.user_id === user.id && (
              <div className='icon-container'>
                <Icon
                  icon={'pencil'}
                  customClass='pencil-icon'
                  callout={() => setIsEditMode(true)}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='info-container'>
        {dogInfoConfig.map((e, i) => (
          <div className='info' key={i}>
            <span className='info-label'>
              {e.label === 'Breed' ? (
                <span>
                  <Plural text={e.label} number={dog?.breeds?.length || 0} />:{' '}
                </span>
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
        <p className='description'>{dog.description || <Mdash />}</p>
      </div>
    </>
  )
}

export default DogRead
