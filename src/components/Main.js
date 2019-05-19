import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Auth from '../services/Auth/Auth'

import theme from '../theme'
import Sidebar from './Sidebar/Sidebar'

import Browse from './Pages/Browse'
import Header from './Header/Header'
import Callback from './Callback/Callback'
import Home from './Pages/Home'
import DogsRoute from './Pages/Dogs/DogsRoute'
import ProfileRoute from './Pages/Profile/ProfileRoute'
import NewDog from './Pages/Profile/NewDog'

const auth = new Auth()

const Main = props => {
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      auth.renewSession()
    }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Sidebar />
        <div>
          <Header {...props} auth={auth} />
          <div className='app-content'>
            <Switch>
              <Route
                path='/dogs'
                render={props => <DogsRoute {...props} auth={auth} />}
              />
              <Route
                path='/profile'
                render={props => <ProfileRoute {...props} auth={auth} />}
              />
              <Route
                exact
                path='/browse'
                render={props => <Browse {...props} auth={auth} />}
              />
              <Route
                exact
                path='/'
                render={props => <Home {...props} auth={auth} />}
              />
              <Route
                path='/callback'
                render={props => {
                  handleAuthentication(props)
                  return <Callback {...props} />
                }}
              />
            </Switch>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Main
