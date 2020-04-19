import React, { useEffect, useCallback } from 'react'
import Icon from '../../../common/Icons/Icon'

const Gallery = ({ images, uploadedImages }) => {
  let imagesToDisplay = uploadedImages ? images.concat(uploadedImages) : images

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

  useEffect(() => {
    resizeAllGridItems()
  }, [resizeAllGridItems, uploadedImages, images])

  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  return (
    <div className='gallery'>
      {imagesToDisplay.map((e, i) => (
        <div
          className={`gallery-item animated fadeInRight delay-${
            (i % 100) + 10
          } ${e.main_image ? 'main-image' : ''}`}
          key={i}
        >
          <div className='gallery-content'>
            <img
              src={e.url || e}
              alt={`dog ${i + 1}`}
              className='gallery-image'
            />
            {e.main_image && <Icon icon={'medal'} />}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery
