import React, { useState, useEffect } from 'react'
import FormService from '../../services/FormService'
import moment from 'moment'
import {
  TextField,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel
} from '@material-ui/core'
import InputRange from 'react-input-range'

const Filter = ({ form, dispatch }) => {
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

  // const transformData = () => {
  //   let formObj = {
  //     birthdate: form.ageRange ? getBirthdateRange(form.ageRange) : null,
  //     papered: form.papered == 'true' ? Boolean(form.papered) : null,
  //     registered: form.registered !== '' ? Boolean(form.registered) : null
  //   }
  //   return formObj
  // }

  const updateFilter = () => {
    console.log(form)
    // let updatedForm = transformData()
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
    dispatch({
      type: 'UPDATE',
      payload: {
        [field]: event.target[elementValue]
      }
    })
  }

  return (
    <div className={`filter-container`}>
      <div className='filter-box'>
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
        <label className='name-header'>Name</label>
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
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='Male' control={<Radio />} label='Male' />
            <FormControlLabel value={''} control={<Radio />} label='Any' />
          </RadioGroup>
        </FormControl>
        {/* Breed */}
        <FormControl className={'form-select'} fullWidth>
          <InputLabel htmlFor='breed-select'>Breed</InputLabel>
          <Select
            multiple
            value={form.breed}
            onChange={e => handleChange(e, 'breed', 'value')}
            inputProps={{
              name: 'breed',
              id: 'breed-select'
            }}
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
              control={<Radio />}
              label='Papered'
            />
            <FormControlLabel
              value={'false'}
              control={<Radio />}
              label='Not Papered'
            />
            <FormControlLabel value={''} control={<Radio />} label='Any' />
          </RadioGroup>
        </FormControl>
        {/* Eye Color */}
        <FormControl className={'form-select'} fullWidth>
          <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
          <Select
            multiple
            value={form.eyes}
            onChange={e => handleChange(e, 'eyes', 'value')}
            inputProps={{
              name: 'eyes',
              id: 'eyes-select'
            }}
          >
            {eyeColors.map((e, i) => (
              <MenuItem key={i} value={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Registered */}
        <FormControl component='fieldset' className={'registered-filter'}>
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
              control={<Radio />}
              label='Registered'
            />
            <FormControlLabel
              value={'false'}
              control={<Radio />}
              label='Not Registered'
            />
            <FormControlLabel value={''} control={<Radio />} label='Any' />
          </RadioGroup>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          className={'search-button'}
          onClick={updateFilter}
        >
          Search
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className={'search-button'}
          onClick={resetForm}
        >
          Search
        </Button>{' '}
      </div>
    </div>
  )
}

export default Filter
