import React, { useState, useContext } from 'react'
import DogService from '../../../services/DogService'
import { format, sub } from 'date-fns'
import ContentContainer from '../../common/ContentContainer'
import PageHeader from '../../common/PageHeader/PageHeader'
import UploadPhotos from '../../Dogs/UploadPhotos/UploadPhotos'
import userContext from '../../../userContext'
import Gallery from '../Dogs/Gallery/Gallery'
import DogEdit from '../Dogs/DogProfile/DogEdit'

const NewDog = ({ history }) => {
  let initialFormState = {
    name: '',
    gender: 'Female',
    papered: 'false',
    registered: 'false',
    breeds: [],
    eyes: [],
    birthdate: format(
      sub(new Date(), {
        years: 1,
      }),
      'yyyy-MM-dd'
    ),
    description: '',
  }
  const [form, setForm] = useState(initialFormState)
  const [uploadedImages, setUploadedImages] = useState([])
  const uc = useContext(userContext)

  const transformBreedIds = (breeds) => {
    return breeds.map((b) => {
      return b.id
    })
  }

  const save = (form, addAnother) => {
    let dog = { ...form }
    dog.birthdate = format(dog.birthdate, 'yyyy-MM-dd')
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreedIds(form.breeds),
      dog_images: [...uploadedImages],
    }
    DogService.createDog(body)
      .then((response) => {
        if (response) {
          uc.openSnack({
            message: 'Congrats! Dog record created!',
            isOpen: true,
            className: 'success',
          })
          if (addAnother) {
            setForm(initialFormState)
            setUploadedImages([])
          } else {
            history.push('/dogs')
          }
        }
      })
      .catch((error) => {
        uc.openSnack({
          message: 'Uh oh! Something went wrong! Please try again.',
          isOpen: true,
        })
      })
  }

  const cancel = () => {
    history.push('/dogs')
  }

  const uploadImage = (files) => {
    if (files.length > 0) {
      let reader = new FileReader()
      let file = files[0]
      reader.onloadend = () => {
        setUploadedImages([
          ...uploadedImages,
          {
            url: reader.result,
            main_image: false,
            uploadedImage: true,
            id: uploadedImages.length + 1,
          },
        ])
      }
      reader.readAsDataURL(file)
    } else {
      uc.openSnack({
        message: 'File type not accepted. Only .jpg and .png are accepted.',
        isOpen: true,
      })
    }
  }

  const removeUploadedImage = (image) => {
    let uploadedArr = uploadedImages
      .filter((u) => {
        if (u.id !== image.id) {
          return u
        }
        return null
      })
      .filter(Boolean)
    setUploadedImages(uploadedArr)
  }

  return (
    <div className='new-dog'>
      <div className='main-content-header'>
        <PageHeader text={<>Add New Dog</>} />
      </div>
      <ContentContainer customClass='new-dog-container'>
        <div className='left-section'>
          <UploadPhotos callout={uploadImage} type='dog' />
        </div>
        <div className='right-section'>
          <DogEdit dog={form}>
            {({ form }) => (
              <div className='button-container'>
                <button className={'no-bg'} onClick={() => save(form, true)}>
                  Add Another
                </button>
                <div className='right-buttons'>
                  <button className={'plain'} onClick={cancel}>
                    Cancel
                  </button>
                  <button className={'primary'} onClick={() => save(form)}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </DogEdit>
        </div>
      </ContentContainer>
      {uploadedImages && (
        <div
          style={{
            maxWidth: '1472px',
            margin: 'auto',
            padding: '0 20px 20px',
          }}
        >
          <Gallery
            images={[]}
            uploadedImages={uploadedImages}
            isEdit={true}
            removeUploadedImage={removeUploadedImage}
          />
        </div>
      )}
    </div>
  )
}

export default NewDog
