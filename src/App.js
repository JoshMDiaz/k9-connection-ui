import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './scss/main.scss'
import 'react-image-lightbox/style.css'
import 'react-dates/lib/css/_datepicker.css'

import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    )
  }
}

export default App
