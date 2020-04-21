import React from 'react'
import Icon from '../../../common/Icons/Icon'
import Overlay from '../../../common/Overlay/Overlay'

const GalleryItem = ({ image, index, isEdit, setMain, deleteImage }) => {
  return (
    <Overlay
      overlayContent={
        <>
          <Icon icon={'star'} callout={() => setMain(image)} />
          <Icon icon={'trash'} callout={() => deleteImage(index)} />
        </>
      }
      enabled={isEdit}
      customClass={`gallery-item animated fadeInRight ${
        !image.uploadedImage ? `delay-${(index % 100) + 1}` : ''
      }`}
    >
      <div className='gallery-content'>
        <img
          src={image.url}
          alt={`dog ${index + 1}`}
          className='gallery-image'
        />
        {isEdit && image.main_image && <Icon icon={'medal'} />}
      </div>
    </Overlay>
  )
}
export default GalleryItem
