import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Auth from '../services/Auth/Auth'

import theme from '../theme'
import Home from './Pages/Home/Home'
import AppLoader from './AppLoader'

const auth = new Auth()

const Website = (props) => {
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route
          path='/callback'
          render={(props) => {
            handleAuthentication(props)
            return <AppLoader {...props} />
          }}
        />
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Redirect to='/' />
      </Switch>
    </MuiThemeProvider>
  )
}

export default Website
