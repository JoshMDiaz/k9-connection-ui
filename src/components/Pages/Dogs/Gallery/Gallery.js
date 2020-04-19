import React, { useEffect, useCallback } from 'react'

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
  }, [resizeAllGridItems, uploadedImages])

  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  return (
    <div className='gallery'>
      {imagesToDisplay.map((e, i) => (
        <div className='gallery-item' key={e.id + i}>
          <div className='gallery-content'>
            <img
              src={e.url || e}
              alt={`dog ${i + 1}`}
              className='gallery-image'
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery
