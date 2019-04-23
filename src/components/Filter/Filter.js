import React, { useState, useEffect } from 'react'
import {
  IonSelect,
  IonList,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonListHeader,
  IonButton
} from '@ionic/react'
import FormService from '../../services/FormService'

const Filter = ({ callout }) => {
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])

  useEffect(() => {
    getBreeds()
    getEyeColors()
  }, [])

  const getBreeds = () => {
    FormService.getBreeds().then(response => {
      if (response) {
        setBreeds(response.data)
      }
    })
  }

  const getEyeColors = () => {
    FormService.getEyeColors().then(response => {
      if (response) {
        setEyeColors(response.data)
      }
    })
  }

  const updateFilter = () => {
    console.log('update')
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
            <IonSelectOption value='female'>Female</IonSelectOption>
            <IonSelectOption value='male'>Male</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Registered</IonLabel>
          <IonSelect
            placeholder='Pick One'
            okText='Got It'
            cancelText='Just Kidding'
          >
            <IonSelectOption value='registered'>Yes</IonSelectOption>
            <IonSelectOption value='not_registered'>No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Papered</IonLabel>
          <IonSelect
            placeholder='Pick One'
            okText='Got It'
            cancelText='Just Kidding'
          >
            <IonSelectOption value='papered'>Yes</IonSelectOption>
            <IonSelectOption value='not_papered'>No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Eye Color</IonLabel>
          <IonSelect
            placeholder='Pick Any'
            okText='Got It'
            cancelText='Just Kidding'
            multiple
          >
            {eyeColors.map((e, i) => (
              <IonSelectOption key={i} value={e.name}>
                {e.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Breed</IonLabel>
          <IonSelect
            placeholder='Pick Any'
            okText='Got It'
            cancelText='Just Kidding'
            multiple
          >
            {breeds.map((e, i) => (
              <IonSelectOption key={i} value={e.name}>
                {e.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonSelect
            placeholder='Pick Any'
            okText='Got It'
            cancelText='Just Kidding'
            multiple
          >
            {Array.apply(null, { length: 20 })
              .map(Number.call, Number)
              .map((e, i) => (
                <IonSelectOption key={i} value={e + 1}>
                  {e + 1}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonButton onClick={updateFilter}>Update</IonButton>
      </IonList>
    </div>
  )
}

// name - input
// gender - picker (IonSelect) √
// papered - picker (IonSelect)√
// registered - picker (IonSelect)√
// birthdate - date picker - created age instead √
// breed - dropdown (IonSelect multiple)√
// eyes - dropdown (IonSelect multiple)√

export default Filter
