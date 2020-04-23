import React, { useState, useEffect } from 'react'
import FormService from '../../services/FormService'
import { format, sub } from 'date-fns'
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
import Multiselect from '../common/Multiselect'

const Filter = ({ filters, formDispatch, toggleFilter, user }) => {
  const [state, setState] = useState({
    filterCopy: filters,
    breeds: [],
    eyeColors: [],
  })
  const { filterCopy, breeds, eyeColors } = state

  const getBreeds = () => {
    FormService.getBreeds().then((response) => {
      if (response) {
        setState((prevState) => ({
          ...prevState,
          breeds: [...response.data],
        }))
      }
    })
  }

  const getEyeColors = () => {
    FormService.getEyeColors().then((response) => {
      if (response) {
        setState((prevState) => ({
          ...prevState,
          eyeColors: [...response.data],
        }))
      }
    })
  }

  const getBirthdateRange = (ageRange) => {
    let obj = {}
    obj.startDate = format(
      sub(new Date(), {
        years: ageRange.max,
      }),
      'yyyy-MM-dd'
    )
    obj.endDate = format(
      sub(new Date(), {
        years: ageRange.min,
      }),
      'yyyy-MM-dd'
    )
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
        eyes: '',
        favorite: false,
        useAge: false,
      },
      count = 0
    for (const key in filterCopy) {
      if (
        key !== 'ageRange' &&
        key !== 'eyes' &&
        key !== 'breed' &&
        key !== 'birthdate'
      ) {
        if (filterCopy[key] !== initial[key]) {
          count++
        }
      }
      if (key === 'eyes' || key === 'breed') {
        if (filterCopy[key].length > 0) {
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
      newFilters = {
        ...filterCopy,
        birthdate:
          filterCopy.useAge && filterCopy.ageRange
            ? getBirthdateRange(filterCopy.ageRange)
            : null,
        breed: filterCopy.breed ? getBreedNames(filterCopy.breed) : null,
      }
    closeFilter()
    formDispatch({
      type: 'UPDATE',
      payload: {
        filters: newFilters,
        filterCount: filterCount,
      },
    })
  }

  const resetForm = () => {
    closeFilter()
    formDispatch({
      type: 'RESET',
    })
    localStorage.removeItem('filter')
    localStorage.removeItem('filterCount')
  }

  const closeFilter = () => {
    toggleFilter(false)
  }

  const handleChange = (event, field, elementValue, nestedField) => {
    let payloadObj = {}
    if (nestedField) {
      payloadObj[field] = {
        ...filterCopy[field],
        [nestedField]: event.target[elementValue],
      }
    } else {
      payloadObj = {
        [field]: event.target[elementValue],
      }
    }
    setState((prevState) => ({
      ...prevState,
      filterCopy: {
        ...filterCopy,
        ...payloadObj,
      },
    }))
  }

  const handleMultiselect = (selected) => {
    setState((prevState) => ({
      ...prevState,
      filterCopy: {
        ...filterCopy,
        breed: selected,
      },
    }))
  }

  useEffect(() => {
    getBreeds()
    getEyeColors()
  }, [])

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      filterCopy: filters,
    }))
  }, [filters])

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
          value={filterCopy.name}
        />

        {/* Age */}
        <div className='checkbox-label'>
          <label>Age (Years)</label>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterCopy.useAge}
                onChange={(e) => handleChange(e, 'useAge', 'checked')}
                value='useAge'
                color='secondary'
              />
            }
          />
        </div>
        <div className='age-input-container'>
          <TextField
            id='min-age'
            type='number'
            onChange={(e) => handleChange(e, 'ageRange', 'value', 'min')}
            value={filterCopy.ageRange.min}
            disabled={!filterCopy.useAge}
          />
          <span className={!filterCopy.useAge ? 'disabled' : ''}>-</span>
          <TextField
            id='max-age'
            type='number'
            onChange={(e) => handleChange(e, 'ageRange', 'value', 'max')}
            value={filterCopy.ageRange.max}
            disabled={!filterCopy.useAge}
          />
        </div>

        {/* Gender */}
        <FormControl component='fieldset' className={'gender-filter'}>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='Gender'
            name='gender'
            className={'gender'}
            value={filterCopy.gender}
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
            dogBreeds={filterCopy.breed}
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
              value={filterCopy.papered}
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
              value={
                filterCopy.papered !== 'false' ? filterCopy.registered : 'false'
              }
              onChange={(e) => handleChange(e, 'registered', 'value')}
            >
              <FormControlLabel
                value={'true'}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={filterCopy.papered === 'false'}
                  />
                }
                label='Registered'
              />
              <FormControlLabel
                value={'false'}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={filterCopy.papered === 'false'}
                  />
                }
                label='Not Registered'
              />
              <FormControlLabel
                value={''}
                control={
                  <Radio
                    classes={{ checked: 'radio-checked' }}
                    disabled={filterCopy.papered === 'false'}
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
              value={filterCopy.eyes}
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
              value={filterCopy.distance}
            />
          )}

          {/* Favorite */}
          <div className='favorite-checkbox'>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleChange(e, 'favorite', 'checked')}
                  value={'favorite'}
                  checked={filterCopy.favorite}
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
