import React, { useState, useEffect } from 'react'
import {
  IonSelect,
  IonList,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonListHeader
} from '@ionic/react'
import FormService from '../../services/FormService'

// name - input
// gender - picker (IonSelect)
// papered - picker (IonSelect)
// registered - picker (IonSelect)
// birthdate - date picker
// breed - dropdown (IonSelect multiple)
// eyes - dropdown (IonSelect multiple)

const Filter = ({ callout }) => {
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])
  const [states, setStates] = useState([])

  useEffect(() => {
    getBreeds()
    getEyeColors()
    getStates()
  }, [])

  const getBreeds = () => {
    FormService.getBreeds().then(response => {
      if (response) {
        console.log(response.data)

        setBreeds(response.data)
      }
    })
  }

  const getEyeColors = () => {
    FormService.getEyeColors().then(response => {
      if (response) {
        console.log(response.data)

        setEyeColors(response.data)
      }
    })
  }

  const getStates = () => {
    FormService.getStates().then(response => {
      if (response) {
        console.log(response.data)

        setStates(response.data)
      }
    })
  }

  return (
    <div className='filter-container'>
      <IonList>
        <IonListHeader>Filter</IonListHeader>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonSelect
            placeholder='Pick One'
            okText='Got It'
            cancelText='Just Kidding'
          >
            <IonSelectOption value='f'>Female</IonSelectOption>
            <IonSelectOption value='m'>Male</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Hair Color</IonLabel>
          <IonSelect
            placeholder='Pick Any'
            okText='Got It'
            cancelText='Just Kidding'
            multiple
          >
            {eyeColors.map((e, i) => (
              <IonSelectOption value={e.name}>{e.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
    </div>
  )
}

export default Filter
