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

const defaultForm = {
  name: '',
  gender: '',
  papered: '',
  registered: '',
  ageRange: {
    min: 2,
    max: 7
  },
  breed: [],
  eyes: []
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
      .subtract(parseInt(ageRange.max), 'years')
      .format('YYYY-MM-DD')
    obj.endDate = moment()
      .subtract(parseInt(ageRange.min), 'years')
      .format('YYYY-MM-DD')
    return obj
  }

  const updateFilter = () => {
    // let filterParams = {}
    // Object.assign(filterParams, form)

    if (form.ageRange) {
      form.birthdate = getBirthdateRange(form.ageRange)
    }
    console.log(form)
    callout(form)
  }

  const resetForm = () => {
    setForm(defaultForm)
    callout(defaultForm)
  }

  const handler = formName => event => {
    setForm({
      ...form,
      [formName]: event.target.value
    })
  }

  const handleGender = (event, value) => {
    setForm({
      ...form,
      gender: value
    })
  }

  const handlePapered = (event, value) => {
    setForm({
      ...form,
      papered: value
    })
  }

  const handleRegistered = (event, value) => {
    setForm({
      ...form,
      registered: value
    })
  }

  const handleSelect = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleRange = obj => {
    setForm({
      ...form,
      ageRange: obj.value
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
      <Typography
        gutterBottom
        variant='subheading'
        component='p'
        className='filter-label'
        style={{ '--line-pos': getLabelWidth('name-header') }}
      >
        <span className='name-header'>Name</span>
      </Typography>
      <TextField
        id='standard-with-placeholder'
        label={`Dog's Name`}
        className={'filter-input'}
        margin='normal'
        onChange={handler('name')}
      />
      <Typography
        gutterBottom
        variant='subheading'
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
      <FormControl className={'form-select'}>
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
      <FormControl className={'form-select'}>
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
      <InputRange
        draggableTrack
        maxValue={15}
        minValue={1}
        value={form.ageRange}
        onChange={value => handleRange({ value })}
      />
      <Button
        variant='contained'
        color='primary'
        className={'search-button'}
        onClick={updateFilter}
      >
        Search
      </Button>
    </div>
  )
}

export default Filter
