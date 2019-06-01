import React, { useState, useEffect } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import FormService from '../../../../services/FormService'

const UserEdit = ({ user, setIsEditMode, update }) => {
  const [form, setForm] = useState({
    name: user.name,
    picture: user.picture,
    phone: user.phone,
    email: user.email,
    address: user.address,
    city: user.eyes,
    zip: user.zip,
    dogs: user.dogs
  })
  const [states, setStates] = useState()

  useEffect(() => {
    getStates()
  }, [])

  const getStates = () => {
    FormService.getStates().then(response => {
      if (response) {
        setStates(response.data)
      }
    })
  }
  const handleChange = (event, field, elementValue) => {
    setForm({
      ...form,
      [field]: event.target[elementValue]
    })
  }

  return (
    <>
      {/* Name */}
      <TextField
        label={`Name`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'name', 'value')}
        fullWidth
        value={form.name}
      />

      {/* Phone - see Formatted Inputs - https://material-ui.com/components/text-fields/#formatted-inputs */}
      <TextField
        label={`Phone`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'phone', 'value')}
        fullWidth
        value={form.phone}
      />

      {/* Email */}
      <TextField
        label={`Email`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'email', 'value')}
        fullWidth
        value={form.email}
      />

      {/* Address */}
      <TextField
        label={`Address`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'address', 'value')}
        fullWidth
        value={form.address}
      />

      {/* City */}
      <TextField
        label={`City`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'city', 'value')}
        fullWidth
        value={form.city}
      />

      {/* Zip */}
      <TextField
        label={`Zip`}
        className={'filter-input'}
        margin='normal'
        onChange={e => handleChange(e, 'zip', 'value')}
        fullWidth
        value={form.zip}
      />

      {/* State */}
      <FormControl style={{ width: '100%', marginTop: '20px' }}>
        <InputLabel htmlFor='state-select'>State</InputLabel>
        <Select
          value={form.state}
          onChange={e => handleChange(e, 'state', 'value')}
          inputProps={{
            name: 'state',
            id: 'state-select'
          }}
        >
          {states.map((e, i) => (
            <MenuItem key={i} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className='form-button-container'>
        <button
          className={'plain search-button'}
          onClick={() => setIsEditMode(false)}
        >
          Cancel
        </button>
        <button
          className={'primary search-button'}
          onClick={() => update(form)}
        >
          Save
        </button>
      </div>
    </>
  )
}

export default UserEdit
