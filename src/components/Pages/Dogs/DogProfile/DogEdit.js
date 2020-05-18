import React, { useState, useEffect } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import FormService from '../../../../services/FormService'
import Multiselect from '../../../common/Multiselect'

const findDogBreeds = (breeds) => {
  return breeds.map((b) => {
    return b.name
  })
}

const DogEdit = ({ dog, children }) => {
  const [form, setForm] = useState({
    name: dog.name,
    gender: dog.gender,
    papered: dog.papered?.toString(),
    registered: dog.registered?.toString(),
    breeds: dog.breeds ? findDogBreeds(dog.breeds) : [],
    eyes: dog.eyes,
    birthdate: dog.birthdate,
    description: dog.description,
  })
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])

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

  const handleChange = (event, field, elementValue) => {
    setForm({
      ...form,
      [field]: event.target[elementValue],
    })
  }

  const handleMultiselect = (selected) => {
    setForm({
      ...form,
      breeds: selected,
    })
  }

  useEffect(() => {
    getBreeds()
    getEyeColors()
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* Name */}
      <TextField
        label={`Name`}
        className={'form-input'}
        margin='normal'
        onChange={(e) => handleChange(e, 'name', 'value')}
        fullWidth
        value={form.name}
      />
      {/* Birthdate */}
      <TextField
        id='birthdate'
        label='Birthdate'
        type='date'
        defaultValue={form.birthdate}
        className='birthdate-datepicker'
        onChange={(e) => handleChange(e, 'birthdate', 'value')}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Gender */}
      <FormControl
        component='fieldset'
        className={'gender-radios'}
        style={{ width: '100%' }}
      >
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
        </RadioGroup>
      </FormControl>

      {/* Eye Color */}
      <FormControl style={{ width: '100%', marginTop: '20px' }}>
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
        </RadioGroup>
      </FormControl>

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
        </RadioGroup>
      </FormControl>

      {/* Breeds */}
      <FormControl style={{ width: '100%', marginTop: '20px' }}>
        <Multiselect
          breeds={breeds}
          dogBreeds={form.breeds}
          updateBreeds={handleMultiselect}
        />
      </FormControl>

      {/* Description */}
      <TextField
        id='description'
        label='About'
        multiline
        rowsMax='4'
        value={form.description}
        onChange={(e) => handleChange(e, 'description', 'value')}
        margin='normal'
        style={{ width: '100%' }}
      />
      {children && children({ form: form, breeds: breeds })}
    </MuiPickersUtilsProvider>
  )
}

export default DogEdit
