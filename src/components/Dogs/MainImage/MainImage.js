import React, { useState, useEffect } from 'react'
import noImage from '../../../images/no-image.jpg'

const MainImage = ({ images }) => {
  const [mainImage, setMainImage] = useState({})

  useEffect(() => {
    images.forEach((i) => {
      if (i.main_image) {
        setMainImage(i)
        return
      }
    })
  }, [images])

  return (
    <div
      className='main-image'
      style={{
        background: `center / cover no-repeat url(${
          images.length > 0 ? mainImage.url : noImage
        })`,
      }}
    ></div>
  )
}

export default MainImage
