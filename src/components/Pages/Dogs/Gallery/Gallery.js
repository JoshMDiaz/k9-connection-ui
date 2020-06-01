import React from 'react'
import GalleryItem from './GalleryItem'
import Masonry from '../../../common/Masonry/Masonry'

const Gallery = ({ images, isEdit, updateImageCopy }) => {
  const setMain = (image) => {
    let newImages = [...images]
    newImages.map((ni) => {
      if (ni.main_image && ni.id !== image.id) {
        ni.main_image = false
      } else if (ni.id === image.id) {
        ni.main_image = true
      }
      return ni
    })
    updateImageCopy(newImages)
  }

  const deleteImage = (image) => {
    let newImages = [...images]
    newImages.forEach((ni) => {
      let tempId = image.uploaded_image ? 'uploaded_id' : 'id'
      if (image[tempId] === ni[tempId]) {
        ni.deleted = true
      }
    })
    updateImageCopy(newImages)
  }

  let imagesToDisplay = images.filter((i) => {
    return !i.deleted
  })

  return (
    <div className='gallery masonry'>
      <Masonry>
        {imagesToDisplay.map((e, i) => (
          <GalleryItem
            key={e.id || e.uploaded_id}
            image={e}
            index={i}
            isEdit={isEdit}
            setMain={setMain}
            deleteImage={deleteImage}
          />
        ))}
      </Masonry>
    </div>
  )
}

export default Gallery
