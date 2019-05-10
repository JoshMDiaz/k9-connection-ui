import React, { useState } from 'react'
import Icon from '../common/Icons/Icon'
import Lightbox from 'react-image-lightbox'
import noImage from '../../images/no-image.jpg'

const DogImages = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const openLightbox = index => {
    console.log(index)
    setIsOpen(true)
    setPhotoIndex(index)
  }

  return (
    <div className='dog-images'>
      {images.map((e, i) => (
        <div
          className={`dog-image ${i === 0 ? 'big' : ''}`}
          key={i}
          onClick={() => openLightbox(i)}
        >
          <img src={e.url} alt={e.name} />
          {i === 0 && <Icon icon='magnifyingGlassBg' />}
        </div>
      ))}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
      {images.length === 0 && (
        <div className='dog-image no-img'>
          <img src={noImage} alt={'No images available'} />
        </div>
      )}
    </div>
  )
}

export default DogImages
