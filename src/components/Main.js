import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import Browse from './Pages/Browse'

const Main = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Switch>
          <Route exact path='/' render={() => <Browse />} />
        </Switch>
      </div>
    </MuiThemeProvider>
  )
}

export default Main
