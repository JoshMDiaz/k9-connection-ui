import React, { useState } from 'react'
import { FormControl, Checkbox, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

function MultipleSelect({ breeds, formBreeds, updateBreeds }) {
  const [selectedBreeds, setSelectedBreeds] = useState(formBreeds)

  function handleChange(breeds) {
    setSelectedBreeds(breeds)
    updateBreeds(breeds)
  }

  return (
    <div className='multi-select'>
      <FormControl>
        <Autocomplete
          multiple
          id='multiselect-autocomplete'
          limitTags={2}
          options={breeds}
          getOptionLabel={(breed) => breed.name}
          defaultValue={selectedBreeds}
          onChange={(_, breeds) => handleChange(breeds)}
          renderOption={(breed, { selected }) => (
            <>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {breed.name}
            </>
          )}
          renderInput={(params) => <TextField {...params} label='Breeds' />}
        />
      </FormControl>
    </div>
  )
}

export default MultipleSelect
