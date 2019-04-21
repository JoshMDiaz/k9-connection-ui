import React, { useState } from 'react'
import {
  IonItem,
  IonList,
  IonIcon,
  IonRow,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide,
  IonButton,
  IonCard
} from '@ionic/react'
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

const Card = ({ dog, count }) => {
  const [showExtraInfo, setShowExtraInfo] = useState(false)
  const [owner, setOwner] = useState({})

  const toggle = () => {
    setShowExtraInfo(!showExtraInfo)
  }

  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <IonCard>
        {/* <IonSlides pager>
          {dog.photos.map((e, i) => (
            <IonSlide style={{ background: 'url(' + photo.url + ')' }} />
          ))}
        </IonSlides> */}
        <IonCardContent>
          <IonCardTitle>{dog.name}</IonCardTitle>
          <IonRow justify-content-between>
            <p className='age'>{getYearsOld(dog.birthdate)}</p>
            <IonIcon
              className={`gender-icon`}
              name={`${dog.gender === 'Male' ? 'male' : 'female'}`}
            />
          </IonRow>
          {dog.description ? (
            <p>{dog.description}</p>
          ) : (
            <p>No description available</p>
          )}
        </IonCardContent>
        {true && (
          <IonRow justify-content-between>
            <IonButton fill='clear'>
              <IonIcon slot='icon-only' name='heart' />
            </IonButton>
            <IonButton fill='clear'>Message</IonButton>
            <IonButton onClick={toggle} fill='clear'>
              <IonIcon
                slot='icon-only'
                name={showExtraInfo ? 'arrow-up' : 'arrow-down'}
              />
            </IonButton>
          </IonRow>
        )}

        {showExtraInfo && (
          <IonRow>
            <IonList no-lines padding>
              <IonItem>
                <IonIcon name='person' item-left />
                <h4>Owner</h4>
                <p>{owner.name || 'test'}</p>
                <IonButton className='primary-outline' outline>
                  see profile
                </IonButton>
              </IonItem>
              <IonItem>
                <IonIcon
                  name={dog.gender === 'male' ? 'male' : 'female'}
                  item-left
                />
                <h4>Gender</h4>
                <p>{dog.gender}</p>
              </IonItem>
              <IonItem>
                <IonIcon name='eye' item-left />
                <h4>Eye Color</h4>
                <p>{dog.eyes}</p>
              </IonItem>
              <IonItem>
                <IonIcon name='paper' item-left />
                <h4>Papered</h4>
                <p>{dog.papered ? 'Yes' : 'No'}</p>
              </IonItem>
              {dog.papered && (
                <IonItem>
                  <IonIcon name='clipboard' item-left />
                  <h4>AKC Registered</h4>
                  <p>{dog.registered ? 'Yes' : 'No'}</p>
                </IonItem>
              )}
            </IonList>
          </IonRow>
        )}
      </IonCard>
    </div>
  )
}

export default Card
