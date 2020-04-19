import React, { useState, useEffect } from 'react'
import Icon from '../../../common/Icons/Icon'

const GalleryItem = ({ image, index, isEdit, setMain, deleteImage }) => {
  const [hovered, setHovered] = useState(false)
  let overlayTimeout

  const hideOverlay = () => {
    if (isEdit) {
      let el = document.querySelector('.is-hovered .overlay')
      if (el) {
        el.classList.remove('fadeIn')
        el.classList.add('fadeOut')
        overlayTimeout = setTimeout(() => {
          el.classList.add('fadeIn')
          setHovered(false)
        }, 250)
      }
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(overlayTimeout)
    }
  }, [overlayTimeout])

  return (
    <div
      className={`gallery-item animated fadeInRight ${
        !image.uploadedImage ? `delay-${(index % 100) + 1}` : ''
      } ${image.main_image ? 'main-image' : ''} ${hovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => (isEdit ? setHovered(true) : null)}
      onMouseLeave={hideOverlay}
    >
      <div className='gallery-content'>
        <img
          src={image.url}
          alt={`dog ${index + 1}`}
          className='gallery-image'
        />
        {image.main_image && <Icon icon={'medal'} />}
      </div>
      {hovered && (
        <div className='overlay animated fadeIn'>
          <div className='overlay-content'>
            <Icon icon={'star'} callout={() => setMain(image)} />
            <Icon icon={'trash'} callout={() => deleteImage(index)} />
          </div>
        </div>
      )}
    </div>
  )
}
export default GalleryItem
