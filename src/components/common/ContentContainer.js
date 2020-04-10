import React from 'react'

const ContentContainer = ({ children, customClass = '' }) => {
  return (
    <div className='page-padding'>
      <div className={`content-container animated fadeInUp ${customClass}`}>
        {children}
      </div>
    </div>
  )
}

export default ContentContainer
