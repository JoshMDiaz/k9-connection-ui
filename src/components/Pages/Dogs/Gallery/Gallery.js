import React, { useEffect, useState, useCallback } from 'react'
import GalleryItem from './GalleryItem'

const Gallery = ({ images, uploadedImages, isEdit }) => {
  const [imagesToDisplay, setImagesToDisplay] = useState(
    uploadedImages ? images.concat(uploadedImages) : images
  )

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

  const makeFavorite = (image) => {
    console.log(image)
  }

  const deleteImage = (image) => {
    console.log(`delete ${image}`)
  }

  useEffect(() => {
    resizeAllGridItems()
  }, [resizeAllGridItems, uploadedImages, images])

  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  useEffect(() => {
    if (uploadedImages) {
      setImagesToDisplay(images.concat(uploadedImages))
    }
  }, [images, uploadedImages])

  return (
    <div className='gallery'>
      {imagesToDisplay.map((e, i) => (
        <GalleryItem
          key={e.url}
          image={e}
          index={i}
          isEdit={isEdit}
          makeFavorite={makeFavorite}
          deleteImage={deleteImage}
        />
      ))}
    </div>
  )
}

export default Gallery
