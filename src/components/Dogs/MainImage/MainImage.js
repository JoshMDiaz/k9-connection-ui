import React, { useState, useEffect, useCallback } from 'react'
import noImage from '../../../images/no-image.jpg'
import Overlay from '../../common/Overlay/Overlay'
import Icon from '../../common/Icons/Icon'

const MainImage = ({ images, editable, updateEditMode }) => {
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
    <Overlay
      customClass='main-image'
      enabled={editable}
      overlayContent={
        <Icon icon={'pencil'} callout={() => updateEditMode(true, 'image')} />
      }
    >
      {images.length > 0 && (
        <div className={`big`}>
          <img src={mainImage.url} alt='main' />
        </div>
      )}
      {images.length === 0 && (
        <div className='no-img'>
          <img src={noImage} alt={'No images available'} />
        </div>
      )}
    </Overlay>
  )
}

export default MainImage
