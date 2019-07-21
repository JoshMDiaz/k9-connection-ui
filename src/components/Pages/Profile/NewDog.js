import React, { useState, useEffect } from 'react'
import DogService from '../../../services/DogService'
import FormService from '../../../services/FormService'
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
  Snackbar
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import ContentContainer from '../../common/ContentContainer'
import PageHeader from '../../common/PageHeader/PageHeader'
import UploadPhotos from '../../Dogs/UploadPhotos/UploadPhotos'
import Multiselect from '../../common/Multiselect'

const NewDog = ({ history }) => {
  let initialFormState = {
    name: '',
    gender: 'Female',
    papered: 'false',
    registered: 'false',
    breeds: [],
    eyes: [],
    birthdate: moment(new Date()).subtract(1, 'years'),
    description: ''
  }
  const [form, setForm] = useState(initialFormState)
  const [breeds, setBreeds] = useState([])
  const [eyeColors, setEyeColors] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [snack, setSnack] = useState({
    isOpen: false,
    message: ''
  })

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

  const handleMultiselect = selected => {
    setForm({
      ...form,
      breeds: selected
    })
  }

  const handleChange = (event, field, elementValue) => {
    setForm({
      ...form,
      [field]: event.target[elementValue]
    })
  }

  const handleDateChange = date => {
    setForm({
      ...form,
      birthdate: moment(date).format('YYYY-MM-DD')
    })
  }

  const transformBreedIds = breeds => {
    return breeds.map(b => {
      return b.id
    })
  }

  const save = addAnother => {
    let dog = { ...form }
    dog.birthdate = moment(dog.birthdate).format('YYYY-MM-DD')
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreedIds(form.breeds),
      dog_images: [...uploadedImages]
    }
    DogService.createDog(body)
      .then(response => {
        if (response) {
          setSnack({
            message: 'Congrats! Dog record created!',
            isOpen: true,
            className: 'success'
          })
          if (addAnother) {
            setForm(initialFormState)
            setUploadedImages([])
          } else {
            history.push('/dogs')
          }
        }
      })
      .catch(error => {
        setSnack({
          message: 'Uh oh! Something went wrong! Please try again.',
          isOpen: true
        })
      })
  }

  const cancel = () => {
    history.push('/dogs')
  }

  const uploadImage = files => {
    if (files.length > 0) {
      let reader = new FileReader()
      let file = files[0]
      reader.onloadend = () => {
        setUploadedImages([...uploadedImages, reader.result])
      }
      reader.readAsDataURL(file)
    } else {
      setSnack({
        message: 'File type not accepted. Only .jpg and .png are accepted.',
        isOpen: true
      })
    }
  }

  const closeSnack = () => {
    setSnack({
      ...snack,
      isOpen: false
    })
  }

  return (
    <div className='new-dog'>
      <div className='main-content-header'>
        <PageHeader text={<>Add New Dog</>} />
      </div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ContentContainer customClass='new-dog-container'>
          <div className='left-section'>
            {/* Name */}
            <TextField
              label={`Name`}
              className={'form-input'}
              margin='normal'
              onChange={e => handleChange(e, 'name', 'value')}
              fullWidth
              value={form.name}
            />

            {/* Breeds */}
            <FormControl style={{ width: '100%', marginTop: '20px' }}>
              <Multiselect options={breeds} callout={handleMultiselect} />
            </FormControl>

            {/* Birthdate */}
            <DatePicker
              id='birthdate-datepicker'
              className={'birthdate-datepicker'}
              label='Birthdate'
              value={form.birthdate}
              onChange={date => handleDateChange(date)}
              format='MMMM DD, YYYY'
              disableFuture
              fullWidth
              autoOk
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
              </RadioGroup>
            </FormControl>

            {/* Eye Color */}
            <FormControl style={{ width: '100%', marginTop: '20px' }}>
              <InputLabel htmlFor='eyes-select'>Eyes</InputLabel>
              <Select
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

            {/* Papered */}
            <FormControl component='fieldset' className={'registered-radios'}>
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
              </RadioGroup>
            </FormControl>

            {/* Registered */}
            <FormControl
              component='fieldset'
              className={'papered-radios'}
              style={{ marginLeft: '32px' }}
            >
              <FormLabel component='legend'>Registered</FormLabel>
              <RadioGroup
                aria-label='Registered'
                name='registered'
                className={'registered'}
                value={form.papered !== 'false' ? form.registered : 'false'}
                onChange={e => handleChange(e, 'registered', 'value')}
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

            {/* Description */}
            <TextField
              id='description'
              label='Description'
              multiline
              rowsMax='4'
              value={form.description}
              onChange={e => handleChange(e, 'description', 'value')}
              margin='normal'
              style={{ width: '100%' }}
            />
            <div className='button-container'>
              <button className={'no-bg'} onClick={() => save(true)}>
                Add Another
              </button>
              <div className='right-buttons'>
                <button className={'plain'} onClick={cancel}>
                  Cancel
                </button>
                <button className={'primary'} onClick={() => save()}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className='right-section'>
            <UploadPhotos callout={uploadImage} type='dog' />
            {uploadedImages.length > 0 && (
              <div className='dog-grid'>
                {uploadedImages.map((e, i) => (
                  <img
                    src={e}
                    alt='uploaded dog'
                    key={i}
                    className='dog-image'
                  />
                ))}
              </div>
            )}
          </div>
        </ContentContainer>
      </MuiPickersUtilsProvider>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={`top,right`}
        open={snack.isOpen}
        onClose={closeSnack}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        autoHideDuration={3000}
        className={`snackbar ${snack.className || 'error'}`}
        message={<span id='message-id'>{snack.message}</span>}
      />
    </div>
  )
}

export default NewDog
