import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Auth from '../services/Auth/Auth'

import theme from '../theme'
import Home from './Pages/Home/Home'
import Callback from './Callback/Callback'

const auth = new Auth()

const Website = props => {
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/' render={props => <Home {...props} />} />
        <Route
          path='/callback'
          render={props => {
            handleAuthentication(props)
            return <Callback {...props} />
          }}
        />
        <Redirect to='/' />
      </Switch>
    </MuiThemeProvider>
  )
}

export default Website
