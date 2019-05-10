import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import Browse from './Pages/Browse'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import DogProfile from './Pages/DogProfile'
import NewDog from './Pages/NewDog'

const Main = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Sidebar />
        <div>
          <Header />
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
              <Route exact path='/' render={props => <Browse {...props} />} />
            </Switch>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Main
