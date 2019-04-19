import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import './scss/main.scss'

import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App
