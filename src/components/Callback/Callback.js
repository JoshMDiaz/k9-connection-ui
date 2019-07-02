import React from 'react'
import Spinner from '../common/Spinner/Spinner'

const Callback = () => {
  return (
    <div className='callback-loader'>
      <Spinner type='circle' />
      <h1>Loading your account...</h1>
    </div>
  )
}

export default Callback
