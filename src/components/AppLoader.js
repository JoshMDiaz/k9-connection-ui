import React from 'react'
import Spinner from './common/Spinner/Spinner'

const AppLoader = ({ message }) => {
  return (
    <div className='app-loader'>
      <Spinner type='circle' />
      <h1>{message}</h1>
    </div>
  )
}

export default AppLoader
