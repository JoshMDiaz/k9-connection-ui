import React, { useState, useEffect } from 'react'
import FormService from '../../services/FormService'
import moment from 'moment'
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
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

  const updateFilter = form => {
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

  const handler = formName => event => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        [formName]: event.target.value
      }
    })
  }

  const handleGender = (event, value) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        gender: value
      }
    })
  }

  const handlePapered = (event, value) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        papered: value
      }
    })
  }

  const handleRegistered = (event, value) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        registered: value
      }
    })
  }

  const handleSelect = event => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...form,
        [event.target.name]: event.target.value
      }
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

  const getLabelWidth = label => {
    let el = document.querySelector(`.filter-label span.${label}`)
    if (el) {
      return `${el.getBoundingClientRect().width + 16}px`
    }
  }

  return (
    <div className='filter-container'>
      <Typography
        gutterBottom
        variant='h5'
        component='h5'
        className='filter-title'
      >
        Filters
      </Typography>
      {/* Name */}
      <Typography
        gutterBottom
        variant='p'
        component='p'
        className='filter-label'
        style={{ '--line-pos': getLabelWidth('name-header') }}
      >
        <span className='name-header'>Name</span>
      </Typography>
      <TextField
        label={`Dog's Name`}
        className={'filter-input'}
        margin='normal'
        onChange={handler('name')}
        fullWidth
        value={form.name}
      />
      {/* Atrributes */}
      <Typography
        gutterBottom
        variant='p'
        component='p'
        className='filter-label'
        style={{ '--line-pos': getLabelWidth('atrributes-header') }}
      >
        <span className='atrributes-header'>Attributes</span>
      </Typography>
      <Grid item xs={12}>
        <div className={'form-toggle'}>
          <ToggleButtonGroup
            value={form.gender}
            exclusive
            onChange={handleGender}
          >
            <ToggleButton value='Male'>Male</ToggleButton>
            <ToggleButton value='Female'>Female</ToggleButton>
            <ToggleButton value=''>Any</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <FormControl className={'form-select'} fullWidth>
        <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
        <Select
          multiple
          value={form.eyes}
          onChange={handleSelect}
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
      <Typography gutterBottom variant='p' component='p' className='age-label'>
        Age Range
      </Typography>
      <InputRange
        draggableTrack
        maxValue={15}
        minValue={1}
        value={form.ageRange}
        onChange={value => handleRange({ value })}
      />
      {/* Breed */}
      <Typography
        gutterBottom
        variant='p'
        component='p'
        className='filter-label'
        style={{ '--line-pos': getLabelWidth('breed-header') }}
      >
        <span className='breed-header'>Breed</span>
      </Typography>
      <FormControl className={'form-select'} fullWidth>
        <InputLabel htmlFor='breed-select'>Breed</InputLabel>
        <Select
          multiple
          value={form.breed}
          onChange={handleSelect}
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
      <Grid item xs={12}>
        <div className={'form-toggle'}>
          <ToggleButtonGroup
            value={form.papered}
            exclusive
            onChange={handlePapered}
          >
            <ToggleButton value={true}>Papered</ToggleButton>
            <ToggleButton value={false}>Not Papered</ToggleButton>
            <ToggleButton value={''}>Any</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={'form-toggle'}>
          <ToggleButtonGroup
            value={form.registered}
            exclusive
            onChange={handleRegistered}
          >
            <ToggleButton disabled={form.papered === false} value={true}>
              Registered
            </ToggleButton>
            <ToggleButton disabled={form.papered === false} value={false}>
              Not Registered
            </ToggleButton>
            <ToggleButton disabled={form.papered === false} value={''}>
              Any
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
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
  )
}

export default Filter
