import React from 'react'

const LoadingCard = ({ count }) => {
  return (
    <div className={`animated fadeInRight delay-${count}`}>
      <div className='card loading-card'>
        <div className='top-content'>
          <span className='image-placeholder' />
          <div className='card-content'>
            <span className='name-placeholder' />
            <span className='gender-placeholder' />
            <span className='description-placeholder'>
              <span />
              <span />
              <span />
            </span>
          </div>
        </div>
        <div className='card-footer'>
          <span className='button-placeholder' />
          <span className='img-border'>
            <span className='icon-placeholder' />
          </span>
          <span className='img-border'>
            <span className='icon-placeholder' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoadingCard
