import React from 'react'
import Icon from '../../../common/Icons/Icon'
import MasonryItem from '../../../common/Masonry/MasonryItem'

const GalleryItem = ({ image, index, isEdit, setMain, deleteImage }) => {
  return (
    <MasonryItem
      customClass={!image.uploadedImage ? `delay-${(index % 100) + 1}` : ''}
      overlayContent={
        <>
          <Icon icon={'star'} callout={() => setMain(image)} />
          <Icon icon={'trash'} callout={() => deleteImage(image, index)} />
        </>
      }
      overlayEnabled={isEdit}
    >
      {({ isHovered }) => (
        <>
          <img
            src={image.url}
            alt={`dog ${index + 1}`}
            className={`gallery-image ${isHovered ? 'hovered' : ''}`}
          />
          {isEdit && image.main_image && (
            <Icon icon={'star'} customClass='star-badge' />
          )}
        </>
      )}
    </MasonryItem>
  )
}
export default GalleryItem
