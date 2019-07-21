import React from 'react'
import { Router } from 'react-router-dom'
import '../../scss/main.scss'
import 'react-image-lightbox/style.css'
import Website from '../Website'
import history from '../../services/Auth/History'

const UnauthenticatedApp = () => {
  return (
    <Router history={history}>
      <Website />
    </Router>
  )
}

export default UnauthenticatedApp
