import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import Browse from './Pages/Browse'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'

const Main = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Sidebar />
        <div className='app-content'>
          <Header />
          <Switch>
            <Route exact path='/' render={() => <Browse />} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Main
