import React, { useEffect, useState, useCallback } from 'react'
import GalleryItem from './GalleryItem'

const Gallery = ({
  images,
  uploadedImages,
  isEdit,
  cancelEditImages,
  updateDogImages,
}) => {
  let initialImages = uploadedImages ? images.concat(uploadedImages) : images
  const [imagesCopy, setImagesCopy] = useState(initialImages)

  const resizeGridItem = (item) => {
    let grid = document.getElementsByClassName('gallery')[0],
      rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      ),
      rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      ),
      rowSpan = Math.ceil(
        (item.querySelector('.gallery-content').getBoundingClientRect().height +
          rowGap) /
          (rowHeight + rowGap)
      )

    item.style.gridRowEnd = `span ${rowSpan}`
  }

  const resizeAllGridItems = useCallback(() => {
    let allItems = document.getElementsByClassName('gallery-item')
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x])
    }
  }, [])

  const setMain = (image) => {
    let newImages = JSON.parse(JSON.stringify(imagesCopy))
    newImages.map((ni) => {
      if (ni.main_image && ni.id !== image.id) {
        ni.main_image = false
      } else if (ni.id === image.id) {
        ni.main_image = true
      }
      return ni
    })
    setImagesCopy(newImages)
  }

  const deleteImage = (index) => {
    let newImages = [...imagesCopy]
    newImages.splice(index, 1)
    setImagesCopy(newImages)
  }

  useEffect(() => {
    resizeAllGridItems()
  }, [resizeAllGridItems, imagesCopy])

  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  useEffect(() => {
    if (uploadedImages) {
      setImagesCopy(images.concat(uploadedImages))
    }
  }, [images, uploadedImages])

  let imagesToDisplay = isEdit ? imagesCopy : images

  return (
    <div className='gallery'>
      {isEdit && (
        <div className='form-button-container'>
          <button className={'plain'} onClick={cancelEditImages}>
            Cancel
          </button>
          <button
            className={'primary'}
            onClick={() => updateDogImages(imagesToDisplay)}
          >
            Save
          </button>
        </div>
      )}
      {imagesToDisplay.map((e, i) => (
        <GalleryItem
          key={e.url}
          image={e}
          index={i}
          isEdit={isEdit}
          setMain={setMain}
          deleteImage={deleteImage}
        />
      ))}
    </div>
  )
}

export default Gallery
