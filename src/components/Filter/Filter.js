import React, { useState, useEffect } from 'react'
import FormService from '../../services/FormService'
import moment from 'moment'
import {
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core'
import InputRange from 'react-input-range'
import Multiselect from '../common/Multiselect'

const Filter = ({ form, dispatch, closeFilter, user }) => {
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])

  useEffect(() => {
    getBreeds()
    getEyeColors()
  }, [])

  const getBreeds = () => {
    FormService.getBreeds().then((response) => {
      if (response) {
        setBreeds(response.data)
      }
    })
  }

  const getEyeColors = () => {
    FormService.getEyeColors().then((response) => {
      if (response) {
        setEyeColors(response.data)
      }
    })
  }

  const getBirthdateRange = (ageRange) => {
    let obj = {}
    obj.startDate = moment()
      .subtract(parseInt(ageRange.max), 'years')
      .format('YYYY-MM-DD')
    obj.endDate = moment()
      .subtract(parseInt(ageRange.min), 'years')
      .format('YYYY-MM-DD')
    return obj
  }

  const determineActiveFilters = () => {
    let initial = {
        name: '',
        gender: '',
        papered: '',
        registered: '',
        ageRange: {
          min: 1,
          max: 15,
        },
        distance: null,
        breed: [],
        eyes: [],
        favorite: false,
        useAge: false,
      },
      count = 0
    for (const formKey in form) {
      if (
        formKey !== 'ageRange' &&
        formKey !== 'eyes' &&
        formKey !== 'breed' &&
        formKey !== 'birthdate' &&
        formKey !== 'distance'
      ) {
        if (form[formKey] !== initial[formKey]) {
          count++
        }
      }
      if (formKey === 'eyes' || formKey === 'breed') {
        if (form[formKey].length > 0) {
          count++
        }
      }
    }
    return count
  }

  const getBreedNames = (breed) => {
    return breed.map((b) => {
      if (b.name) {
        return b.name
      } else {
        return b
      }
    })
  }

  const updateFilter = () => {
    let filterCount = determineActiveFilters(),
      body = {
        ...form,
        birthdate:
          form.useAge && form.ageRange
            ? getBirthdateRange(form.ageRange)
            : null,
        breed: form.breed ? getBreedNames(form.breed) : null,
      }
    localStorage.setItem('filterCount', filterCount)
    localStorage.setItem('filter', JSON.stringify(body))
    dispatch({
      type: 'ACTIVE_FILTERS',
      payload: filterCount,
    })
    dispatch({
      type: 'UPDATE',
      payload: body,
    })
    dispatch({
      type: 'SEARCH',
    })
  }

  const resetForm = () => {
    dispatch({
      type: 'RESET',
    })
    localStorage.removeItem('filter')
    localStorage.removeItem('filterCount')
  }

  const handleRange = (obj, field) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        [field]: obj.value,
      },
    })
  }

  const handleChange = (event, field, elementValue) => {
    console.log(event.target[elementValue], field)

    dispatch({
      type: 'UPDATE',
      payload: {
        [field]: event.target[elementValue],
      },
    })
  }

  const handleMultiselect = (selected) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        breed: selected,
      },
    })
  }

  return (
    <div className={`filter-container`}>
      <div>
        <span onClick={closeFilter} className='close-button'>
          X
        </span>

        {/* Name */}
        <TextField
          label={`Name`}
          className={'form-input'}
          margin='normal'
          onChange={(e) => handleChange(e, 'name', 'value')}
          fullWidth
          value={form.name}
        />

        {/* Age */}
        <div className='checkbox-label'>
          <label className='slider-label'>Age</label>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.useAge}
                onChange={(e) => handleChange(e, 'useAge', 'checked')}
                value='useAge'
                color='secondary'
              />
            }
          />
        </div>
        {/* TODO: Remove range and use two number inputs instead. yarn remove react-input-range when done */}
        <InputRange
          draggableTrack
          maxValue={15}
          minValue={1}
          value={form.ageRange}
          onChange={(value) => handleRange({ value }, 'ageRange')}
          disabled={!form.useAge}
        />

        {/* Gender */}
        <FormControl component='fieldset' className={'gender-filter'}>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='Gender'
            name='gender'
            className={'gender'}
            value={form.gender}
            onChange={(e) => handleChange(e, 'gender', 'value')}
          >
            <FormControlLabel
              value='Female'
              control={<Radio classes={{ checked: 'radio-checked' }} />}
              label='Female'
            />
            <FormControlLabel
              value='Male'
              control={<Radio classes={{ checked: 'radio-checked' }} />}
              label='Male'
            />
            <FormControlLabel
              value={''}
              control={<Radio classes={{ checked: 'radio-checked' }} />}
              label='Any'
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div>
        {/* Breed */}
        <FormControl style={{ width: '100%' }}>
          <Multiselect
            breeds={breeds}
            dogBreeds={form.breed}
            updateBreeds={handleMultiselect}
          />
        </FormControl>

        <div>
          {/* Papered */}
          <FormControl component='fieldset' className={'papered-radios'}>
            <FormLabel component='legend'>Papered</FormLabel>
            <RadioGroup
              aria-label='Papered'
              name='papered'
              className={'papered'}
              value={form.papered}
              onChange={(e) => handleChange(e, 'papered', 'value')}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Papered'
              />
              <FormControlLabel
                value={'false'}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Not Papered'
              />
              <FormControlLabel
                value={''}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Any'
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          {/* Registered */}
          <FormControl component='fieldset' className={'registered-radios'}>
            <FormLabel component='legend'>Registered</FormLabel>
            <RadioGroup
              aria-label='Registered'
              name='registered'
              className={'registered'}
              value={form.papered !== 'false' ? form.registered : 'false'}
              onChange={(e) => handleChange(e, 'registered', 'value')}
            >
              <FormControlLabel
                value={'true'}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={form.papered === 'false'}
                  />
                }
                label='Registered'
              />
              <FormControlLabel
                value={'false'}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={form.papered === 'false'}
                  />
                }
                label='Not Registered'
              />
              <FormControlLabel
                value={''}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={form.papered === 'false'}
                  />
                }
                label='Any'
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className='right-column'>
        <div>
          {/* Eye Color */}
          <FormControl style={{ width: '100%', marginBottom: '20px' }}>
            <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
            <Select
              value={form.eyes}
              onChange={(e) => handleChange(e, 'eyes', 'value')}
              inputProps={{
                name: 'eyes',
                id: 'eyes-select',
              }}
            >
              {eyeColors.map((e, i) => (
                <MenuItem key={i} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Miles Away */}
          {user.zip && (
            <TextField
              id='miles-away'
              label='Miles From Me'
              type='number'
              onChange={(e) => handleChange(e, 'distance', 'value')}
              margin='normal'
              fullWidth
              value={form.distance}
            />
          )}

          {/* Favorite */}
          <div className='favorite-checkbox'>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleChange(e, 'favorite', 'checked')}
                  value={'favorite'}
                  checked={form.favorite}
                />
              }
              label='Favorite Dogs'
            />
          </div>
        </div>
        <div className='button-container'>
          <button className={'plain'} onClick={resetForm}>
            Reset
          </button>
          <button className={'primary'} onClick={updateFilter}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
