import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'

function MultipleSelect({ breeds, dogBreeds, updateBreeds }) {
  const [breed, setBreed] = useState(dogBreeds)

  function handleChange(event) {
    setBreed(event.target.value)
    updateBreeds(event.target.value)
  }

  return (
    <div className='multi-select'>
      <FormControl>
        <InputLabel htmlFor='select-multiple-checkbox'>Breeds</InputLabel>
        <Select
          multiple
          value={breed}
          onChange={handleChange}
          input={<Input id='select-multiple-checkbox' />}
          renderValue={(selected) => selected.join(', ')}
        >
          {breeds.map((b) => (
            <MenuItem key={b.name} value={b.name}>
              <Checkbox checked={breed.indexOf(b.name) > -1} />
              <ListItemText primary={b.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MultipleSelect
