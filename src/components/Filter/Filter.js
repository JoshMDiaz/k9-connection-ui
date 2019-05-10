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
  Chip
} from '@material-ui/core'
import InputRange from 'react-input-range'

const Filter = ({ form, dispatch, closeFilter }) => {
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

  const getBirthdateRange = ageRange => {
    let obj = {}
    obj.startDate = moment()
      .subtract(parseInt(ageRange.max), 'years')
      .format('YYYY-MM-DD')
    obj.endDate = moment()
      .subtract(parseInt(ageRange.min), 'years')
      .format('YYYY-MM-DD')
    return obj
  }

  const updateFilter = () => {
    console.log(form)

    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        birthdate: form.ageRange ? getBirthdateRange(form.ageRange) : null
      }
    })
    dispatch({
      type: 'SEARCH'
    })
  }

  const resetForm = () => {
    dispatch({
      type: 'RESET'
    })
  }

  const handleRange = obj => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        ageRange: obj.value
      }
    })
  }

  const handleChange = (event, field, elementValue) => {
    if (field === 'breedSearch') {
      console.log('search breeds')
    }
    dispatch({
      type: 'UPDATE',
      payload: {
        [field]: event.target[elementValue]
      }
    })
  }

  return (
    <div className={`filter-container`}>
      <div>
        <span onClick={closeFilter} className='close-filter'>
          X
        </span>

        {/* Favorite */}
        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChange(e, 'favorite', 'checked')}
              value={'favorite'}
            />
          }
          label='Favorite Dogs'
        />

        {/* Name */}
        <TextField
          label={`Name`}
          className={'filter-input'}
          margin='normal'
          onChange={e => handleChange(e, 'name', 'value')}
          fullWidth
          value={form.name}
        />

        {/* Age */}
        <label className='name-header'>Age</label>
        <InputRange
          draggableTrack
          maxValue={15}
          minValue={1}
          value={form.ageRange}
          onChange={value => handleRange({ value })}
        />

        {/* Gender */}
        <FormControl component='fieldset' className={'gender-filter'}>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='Gender'
            name='gender'
            className={'gender'}
            value={form.gender}
            onChange={e => handleChange(e, 'gender', 'value')}
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

      {/* Breed */}
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor='breeds-select'>Breeds</InputLabel>
        <Select
          multiple
          value={form.breed}
          onChange={e => handleChange(e, 'breed', 'value')}
          inputProps={{
            name: 'breeds',
            id: 'breeds-select'
          }}
          renderValue={selected => (
            <div className='select-chips'>
              {selected.map(value => (
                <Chip key={value} label={value} className='chip' />
              ))}
            </div>
          )}
        >
          {breeds.map((e, i) => (
            <MenuItem key={i} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Papered */}
      <FormControl component='fieldset' className={'registered-filter'}>
        <FormLabel component='legend'>Papered</FormLabel>
        <RadioGroup
          aria-label='Papered'
          name='papered'
          className={'papered'}
          value={form.papered}
          onChange={e => handleChange(e, 'papered', 'value')}
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
      <div />
      <div className='right-column'>
        <div>
          {/* Eye Color */}
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
            <Select
              multiple
              value={form.eyes}
              onChange={e => handleChange(e, 'eyes', 'value')}
              inputProps={{
                name: 'eyes',
                id: 'eyes-select'
              }}
              renderValue={selected => (
                <div className='select-chips'>
                  {selected.map(value => (
                    <Chip key={value} label={value} className='chip' />
                  ))}
                </div>
              )}
            >
              {eyeColors.map((e, i) => (
                <MenuItem key={i} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Registered */}
          <FormControl component='fieldset' className={'papered-filter'}>
            <FormLabel component='legend'>Registered</FormLabel>
            <RadioGroup
              aria-label='Registered'
              name='registered'
              className={'registered'}
              value={form.registered}
              onChange={e => handleChange(e, 'registered', 'value')}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Registered'
              />
              <FormControlLabel
                value={'false'}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Not Registered'
              />
              <FormControlLabel
                value={''}
                control={<Radio classes={{ checked: 'radio-checked' }} />}
                label='Any'
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='button-container'>
          <button className={'plain search-button'} onClick={resetForm}>
            Reset
          </button>
          <button className={'primary search-button'} onClick={updateFilter}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
