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
      customClass='animated fadeIn'
      enabled={editable}
      overlayContent={
        <Icon icon={'pencil'} callout={() => updateEditMode(true, 'image')} />
      }
    >
      <div
        className='main-image'
        style={{
          background: `center / cover no-repeat url(${
            images.length > 0 ? mainImage.url : noImage
          })`,
        }}
      ></div>
    </Overlay>
  )
}

export default MainImage
