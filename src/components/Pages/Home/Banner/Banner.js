import React from 'react'
import dogImg from '../../../../images/dog.svg'

const Banner = () => {
  return (
    <div className='banner-section'>
      <div className='banner-section-content animated fadeInLeft'>
        <h2>
          We make dog breeding{' '}
          <span className='uppercase animated heartBeat delay-20'>easy</span>
        </h2>
        <p>You're busy. We understand.</p>
        <p>We made an easy way to find the perfect dog.</p>
      </div>
      <img src={dogImg} alt='dog' />
    </div>
  )
}

export default Banner
