import React, { useState, useContext } from 'react'
import { createDog, clearDogCache } from '../../../services/DogService'
import ContentContainer from '../../common/ContentContainer'
import PageHeader from '../../common/PageHeader/PageHeader'
import UploadPhotos from '../../Dogs/UploadPhotos/UploadPhotos'
import UserContext from '../../../UserContext'
import Gallery from '../Dogs/Gallery/Gallery'
import DogEdit from '../Dogs/DogProfile/DogEdit'

const NewDog = ({ history }) => {
  const date = new Date()
  const yearAgo = `${date.getMonth() + 1}-${date.getDate()}-${
    date.getFullYear() - 1
  }`
  let initialFormState = {
    name: '',
    gender: 'Female',
    papered: 'false',
    registered: 'false',
    breeds: [],
    eyes: [],
    birthdate: yearAgo,
    description: '',
  }
  const [form, setForm] = useState(initialFormState)
  const [uploadedImages, setUploadedImages] = useState([])
  const uc = useContext(UserContext)

  const transformBreeds = (breeds) => {
    return breeds.map((b) => {
      return b.id
    })
  }

  const cleanupImages = (images) => {
    let newImages = [...images]
      .map((ni) => {
        if (!ni.deleted) {
          return ni.url
        } else {
          return null
        }
      })
      .filter(Boolean)
    return newImages
  }

  const save = (form, addAnother) => {
    let dog = { ...form }
    delete dog.breeds
    let body = {
      dog: { ...dog },
      breeds: transformBreeds(form.breeds),
      dog_images: cleanupImages(uploadedImages),
    }
    createDog(body)
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
            clearDogCache()
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

  const uploadImages = (files) => {
    files.forEach((file) => {
      let reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImages((prevState) => [
          ...prevState,
          {
            url: reader.result,
            main_image: prevState.length === 0 ? true : false,
            uploaded_id: `uploaded-${prevState.length + 1}`,
          },
        ])
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className='new-dog'>
      <div className='main-content-header'>
        <PageHeader text={<>Add New Dog</>} />
      </div>
      <ContentContainer customClass='new-dog-container'>
        <div className='left-section'>
          <UploadPhotos callout={uploadImages} type='dog' />
        </div>
        <div className='right-section'>
          <DogEdit dog={form}>
            {({ form, breeds }) => (
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
            images={uploadedImages}
            isEdit={true}
            updateImageCopy={setUploadedImages}
          />
        </div>
      )}
    </div>
  )
}

export default NewDog
