import React, { useState, useEffect } from 'react'

const Overlay = ({ children, overlayContent, enabled, customClass = '' }) => {
  const [hovered, setHovered] = useState(false)
  let overlayTimeout

  const hideOverlay = () => {
    if (enabled) {
      let el = document.querySelector('.is-hovered .overlay')
      if (el) {
        el.classList.remove('fadeIn')
        el.classList.add('fadeOut')
        overlayTimeout = setTimeout(() => {
          el.classList.add('fadeIn')
          setHovered(false)
        }, 250)
      }
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(overlayTimeout)
    }
  }, [overlayTimeout])

  return (
    <div
      className={`overlay-item ${hovered ? 'is-hovered' : ''} ${customClass}`}
      onMouseEnter={() => (enabled ? setHovered(true) : null)}
      onMouseLeave={hideOverlay}
    >
      {children && children({ isHovered: hovered })}
      {hovered && (
        <div className='overlay animated fadeIn'>
          <div className='overlay-content'>
            {overlayContent && overlayContent}
          </div>
        </div>
      )}
    </div>
  )
}
export default Overlay
