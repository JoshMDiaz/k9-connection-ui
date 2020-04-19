import React, { useState, useEffect, useCallback } from 'react'
import noImage from '../../../images/no-image.jpg'

const MainImage = ({ images }) => {
  const [mainImage, setMainImage] = useState({})

  const findMainImage = useCallback(() => {
    images.forEach((i) => {
      if (i.main_image) {
        setMainImage(i)
        return
      }
    })
  }, [images])

  useEffect(() => {
    findMainImage()
  }, [findMainImage])

  return (
    <div className='main-image'>
      {images.length > 0 && (
        <div className={`dog-image big`}>
          <img src={mainImage.url} alt='main' />
        </div>
      )}
      {images.length === 0 && (
        <div className='dog-image no-img'>
          <img src={noImage} alt={'No images available'} />
        </div>
      )}
    </div>
  )
}

export default MainImage
