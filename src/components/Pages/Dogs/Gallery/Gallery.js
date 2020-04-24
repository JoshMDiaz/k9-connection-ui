import React, { useEffect, useState } from 'react'
import GalleryItem from './GalleryItem'
import Masonry from '../../../common/Masonry/Masonry'

const Gallery = ({
  images,
  uploadedImages,
  isEdit,
  cancelEditImages,
  updateDogImages,
  removeUploadedImage,
}) => {
  let initialImages = uploadedImages ? images.concat(uploadedImages) : images
  const [imagesCopy, setImagesCopy] = useState(initialImages)

  const setMain = (image) => {
    let newImages = JSON.parse(JSON.stringify(imagesCopy))
    newImages.map((ni) => {
      if (ni.main_image && ni.id !== image.id) {
        ni.main_image = false
      } else if (ni.id === image.id) {
        ni.main_image = true
      }
      return ni
    })
    setImagesCopy(newImages)
  }

  const deleteImage = (image, index) => {
    let newImages = [...imagesCopy]
    newImages.splice(index, 1)
    if (image.uploadedImage) {
      removeUploadedImage(image)
    }
    setImagesCopy(newImages)
  }

  useEffect(() => {
    if (uploadedImages) {
      setImagesCopy(images.concat(uploadedImages))
    }
  }, [images, uploadedImages])

  let imagesToDisplay = isEdit ? imagesCopy : images

  return (
    <div className='gallery masonry'>
      <Masonry items={imagesToDisplay}>
        {imagesToDisplay.map((e, i) => (
          <GalleryItem
            key={e.url}
            image={e}
            index={i}
            isEdit={isEdit}
            setMain={setMain}
            deleteImage={deleteImage}
          />
        ))}
      </Masonry>
      {isEdit && imagesToDisplay.length > 0 && (
        <div className='form-button-container gallery-image-buttons'>
          <button className={'plain'} onClick={cancelEditImages}>
            Cancel
          </button>
          <button
            className={'primary'}
            onClick={() => updateDogImages(imagesToDisplay)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery
