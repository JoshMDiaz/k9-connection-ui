import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import Browse from './Pages/Browse'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import DogProfile from './Pages/DogProfile'
import NewDog from './Pages/NewDog'

import Auth from '../services/Auth/Auth'
import Callback from './Callback/Callback'

const Main = props => {
  const { isAuthenticated } = Auth
  const auth = new Auth()

  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Sidebar />
        <div>
          <Header {...props} />
          <div className='app-content'>
            <Switch>
              <Route
                exact
                path='/new-dog'
                render={props => <NewDog {...props} />}
              />
              <Route
                exact
                path='/profile/dog/:id'
                render={props => <DogProfile {...props} />}
              />
              <Route
                exact
                path='/browse'
                render={props => <Browse {...props} />}
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
