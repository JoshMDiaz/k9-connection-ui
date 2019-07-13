import React from 'react'
import bannerImg from '../../../../images/photos/dogs-beach.jpg'

const Banner = () => {
  return (
    <div
      className='banner-section'
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className='banner-section-content'>
        <h1 className='uppercase'>K9 Connect</h1>
        <h3>We make dog breeding easy</h3>
        <h4>Let us help you find a match for your pup</h4>
      </div>
    </div>
  )
}

export default Banner
