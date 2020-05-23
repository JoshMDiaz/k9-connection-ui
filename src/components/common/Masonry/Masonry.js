import React, { useEffect, useCallback } from 'react'

const Masonry = ({ children, resizeTrigger }) => {
  const resizeGridItem = (item) => {
    let grid = document.querySelector('.masonry'),
      rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      ),
      rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      ),
      rowSpan = Math.ceil(
        (item.querySelector('.masonry-content').getBoundingClientRect().height +
          rowGap) /
          (rowHeight + rowGap)
      )
    item.style.gridRowEnd = `span ${rowSpan}`
  }

  const resizeAllGridItems = useCallback(() => {
    let allItems = document.getElementsByClassName('masonry-item')
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x])
    }
  }, [])

  useEffect(() => {
    resizeAllGridItems()
  }, [resizeAllGridItems, resizeTrigger, children])

  useEffect(() => {
    window.addEventListener('resize', resizeAllGridItems)
    return () => {
      window.removeEventListener('resize', resizeAllGridItems)
    }
  }, [resizeAllGridItems])

  return <>{children && children}</>
}

export default Masonry
