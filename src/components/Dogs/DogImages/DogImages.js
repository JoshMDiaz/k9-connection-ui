import React, { useState, useEffect } from 'react'
import Icon from '../../common/Icons/Icon'
import Lightbox from 'react-image-lightbox'
import noImage from '../../../images/no-image.jpg'

const DogImages = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [dogImages, setDogImages] = useState([])
  const [sortedImages, setSortedImages] = useState([])
  const [mainImage, setMainImage] = useState({})

  const openLightbox = index => {
    setIsOpen(true)
    setPhotoIndex(index)
  }

  useEffect(() => {
    filterImages()
    findMainImage()
    sortImages()
  }, [])

  const findMainImage = () => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].main_image === true) {
        setMainImage(images[i])
      }
    }
  }

  const filterImages = () => {
    let filtered = images.filter(i => {
      return !i.main_image
    })
    setDogImages(filtered)
  }

  const sortImages = () => {
    let sorted = images.sort((a, b) => {
      return b.main_image - a.main_image
    })
    setSortedImages(sorted)
  }

  return (
    <div className='dog-images-component'>
      {mainImage && (
        <div className={`dog-image big`} onClick={() => openLightbox(0)}>
          <img src={mainImage.url} alt='main' />
          <Icon icon='magnifyingGlassBg' />
        </div>
      )}
      <div className='dog-images'>
        {dogImages.map((e, i) => (
          <div
            className={`dog-image`}
            key={i}
            onClick={() => openLightbox(i + 1)}
          >
            <img src={e.url} alt={'dog'} />
          </div>
        ))}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={sortedImages[photoIndex].url}
          nextSrc={sortedImages[(photoIndex + 1) % sortedImages.length].url}
          prevSrc={
            sortedImages[
              (photoIndex + sortedImages.length - 1) % sortedImages.length
            ].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + sortedImages.length - 1) % sortedImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % sortedImages.length)
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
