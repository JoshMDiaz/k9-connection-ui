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

const defaultForm = {
  name: '',
  gender: 'both',
  papered: false,
  registered: false,
  ageRange: null,
  breed: [],
  eyes: ''
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
    // let filterParams = {}
    // Object.assign(filterParams, form)
    console.log(form)

    // if (form.ageRange) {
    //   form.birthdate = getBirthdateRange(form.ageRange)
    // }
    // callout(form)
  }

  const resetForm = () => {
    setForm(defaultForm)
    callout(defaultForm)
  }

  const handler = formName => event => {
    console.log(formName, event)

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

  return (
    <div className='filter-container'>
      <Typography gutterBottom variant='h6' component='p'>
        Filter
      </Typography>
      <TextField
        id='standard-with-placeholder'
        label='With placeholder'
        placeholder='Placeholder'
        className={'dog-name'}
        margin='normal'
        onChange={handler('name')}
      />
      <Grid item xs={12} sm={6}>
        <div className={'form-toggle'}>
          <ToggleButtonGroup
            value={form.gender}
            exclusive
            onChange={handleGender}
          >
            <ToggleButton value='Male'>Male</ToggleButton>
            <ToggleButton value='Female'>Female</ToggleButton>
            <ToggleButton value='both'>Both</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={'form-toggle'}>
          <ToggleButtonGroup
            value={form.papered}
            exclusive
            onChange={handlePapered}
          >
            <ToggleButton value={true}>Papered</ToggleButton>
            <ToggleButton value={false}>Not Papered</ToggleButton>
            <ToggleButton value={''}>Both</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
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
              Both
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <FormControl className={'form-select'}>
        <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
        <Select
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
