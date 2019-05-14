import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Auth from '../services/Auth/Auth'

import theme from '../theme'
import Sidebar from './Sidebar/Sidebar'

import Browse from './Pages/Browse'
import Header from './Header/Header'
import DogProfile from './Pages/DogProfile'
import NewDog from './Pages/NewDog'
import MyDogs from './Pages/MyDogs'
import Callback from './Callback/Callback'
import Home from './Pages/Home'

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
                exact
                path='/new-dog'
                render={props => <NewDog {...props} auth={auth} />}
              />
              <Route
                exact
                path='/profile/dogs'
                render={props => <MyDogs {...props} auth={auth} />}
              />
              <Route
                exact
                path='/profile/dog/:id'
                render={props => <DogProfile {...props} auth={auth} />}
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
