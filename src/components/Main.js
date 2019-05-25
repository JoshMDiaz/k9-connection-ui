import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Fab, Drawer } from '@material-ui/core'
import Auth from '../services/Auth/Auth'
import UserContext from '../userContext'

import theme from '../theme'
import Sidebar from './Sidebar/Sidebar'

import Header from './Header/Header'
import DogsRoute from './Pages/Dogs/DogsRoute'
import ProfileRoute from './Pages/Profile/ProfileRoute'

const auth = new Auth()

const Main = props => {
  const [currentUser, setCurrentUser] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      auth.renewSession()
    }
  }, [])

  const login = user => {
    setCurrentUser(user)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={{ user: currentUser, login: login }}>
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
                <Redirect from='/' exact to='/dogs' />
              </Switch>
            </div>
          </div>
          <Fab
            color='secondary'
            className={'fab-menu-button'}
            onClick={() => setIsOpen(true)}
          >
            <span className='fab-line' />
            <span className='fab-line' />
            <span className='fab-line' />
          </Fab>
          <Drawer anchor='right' open={isOpen} onClose={() => setIsOpen(false)}>
            Menu stuff here
          </Drawer>
        </div>
      </UserContext.Provider>
    </MuiThemeProvider>
  )
}

export default Main
