import React, { useState, useEffect } from 'react'
import {
  IonSelect,
  IonList,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonListHeader,
  IonButton,
  IonInput,
  IonRange
} from '@ionic/react'
import FormService from '../../services/FormService'
import moment from 'moment'
// name - input
// gender - picker (IonSelect) √
// papered - picker (IonSelect)√
// registered - picker (IonSelect)√
// birthdate - date picker - created ageRange instead √
// breed - dropdown (IonSelect multiple)√
// eyes - dropdown (IonSelect multiple)√
const defaultForm = {
  name: '',
  gender: null,
  papered: null,
  registered: null,
  ageRange: {
    lower: 2,
    upper: 7
  },
  breed: null,
  eyes: null
}

const Filter = ({ callout }) => {
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])
  const [form, setForm] = useState(defaultForm)

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

  const getBirthdateRange = ageRange => {
    let obj = {}
    obj.startDate = moment()
      .subtract(parseInt(ageRange.upper), 'years')
      .format('YYYY-MM-DD')
    obj.endDate = moment()
      .subtract(parseInt(ageRange.lower), 'years')
      .format('YYYY-MM-DD')
    return obj
  }

  const updateFilter = () => {
    let filterParams = {}
    Object.assign(filterParams, form)
    if (form.ageRange) {
      filterParams.birthdate = getBirthdateRange(filterParams.ageRange)
    }
    console.log(filterParams)

    callout(filterParams)
  }

  const resetForm = () => {
    setForm(defaultForm)
  }

  const handler = (formName, event) => {
    setForm({
      ...form,
      [formName]: event.detail.value
    })
  }

  return (
    <div className='filter-container'>
      <IonList>
        <IonListHeader>Filter</IonListHeader>
        <IonItem>
          <IonInput
            placeholder='Dog Name'
            onIonChange={e => handler('name', e)}
            clearInput
          />
        </IonItem>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonSelect
            placeholder='Pick One'
            selectedText={form.gender}
            okText='Got It'
            cancelText='Just Kidding'
            value={form.gender}
            onIonChange={e => handler('gender', e)}
          >
            <IonSelectOption value='Female'>Female</IonSelectOption>
            <IonSelectOption value='Male'>Male</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Registered</IonLabel>
          <IonSelect
            placeholder='Pick One'
            selectedText={form.registered}
            okText='Got It'
            cancelText='Just Kidding'
            onIonChange={e => handler('registered', e)}
          >
            <IonSelectOption value={true}>Yes</IonSelectOption>
            <IonSelectOption value={false}>No</IonSelectOption>
          </IonSelect>
        </IonItem>
        {form.registered && (
          <IonItem>
            <IonLabel>Papered</IonLabel>
            <IonSelect
              placeholder='Pick One'
              selectedText={form.papered}
              okText='Got It'
              cancelText='Just Kidding'
              onIonChange={e => handler('papered', e)}
            >
              <IonSelectOption value={true}>Yes</IonSelectOption>
              <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
          </IonItem>
        )}
        <IonItem>
          <IonLabel>Eye Color</IonLabel>
          <IonSelect
            placeholder='Pick Any'
            selectedText={form.eyes}
            okText='Got It'
            cancelText='Just Kidding'
            multiple
            onIonChange={e => handler('eyes', e)}
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
            selectedText={form.breed}
            okText='Got It'
            cancelText='Just Kidding'
            multiple
            onIonChange={e => handler('breed', e)}
          >
            {breeds.map((e, i) => (
              <IonSelectOption key={i} value={e.name}>
                {e.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Age Range</IonLabel>
          {/* <IonSelect
            placeholder='Pick Any'
            selectedText={form.ageRange}
            okText='Got It'
            cancelText='Just Kidding'
            multiple
            onIonChange={e => handler('ageRange', e)}
          >
            {Array.apply(null, { length: 20 })
              .map(Number.call, Number)
              .map((e, i) => (
                <IonSelectOption key={i} value={e + 1}>
                  {e + 1}
                </IonSelectOption>
              ))}
          </IonSelect> */}
          <IonRange
            min={1}
            max={15}
            step={1}
            snaps={true}
            ticks={false}
            color='secondary'
            dual-knobs
            onIonChange={e => handler('ageRange', e)}
            // value={{ lower: form.ageRange.lower, upper: form.ageRange.upper }}
            pin
          >
            <IonLabel slot='start'>1</IonLabel>
            <IonLabel slot='end'>15</IonLabel>
          </IonRange>
        </IonItem>
        <IonButton onClick={updateFilter}>Search</IonButton>
        <IonButton onClick={resetForm} color='secondary'>
          Reset
        </IonButton>
      </IonList>
    </div>
  )
}

export default Filter
