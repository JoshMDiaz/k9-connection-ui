import React from 'react'
import { Router } from 'react-router-dom'
import '../../scss/main.scss'
import 'react-image-lightbox/style.css'
import history from '../../services/Auth/History'

import Main from '../Main'

const AuthenticatedApp = () => {
  return (
    <Router history={history}>
      <Main />
    </Router>
  )
}

export default AuthenticatedApp
