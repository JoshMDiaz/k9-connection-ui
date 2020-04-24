import React from 'react'
import Overlay from '../Overlay/Overlay'

const MasonryItem = ({
  children,
  overlayEnabled,
  overlayContent,
  customClass = '',
}) => {
  return (
    <Overlay
      overlayContent={overlayContent}
      enabled={overlayEnabled}
      customClass={`masonry-item animated fadeIn ${customClass}`}
    >
      {({ isHovered }) => (
        <div className='masonry-content'>{children({ isHovered })}</div>
      )}
    </Overlay>
  )
}
export default MasonryItem
