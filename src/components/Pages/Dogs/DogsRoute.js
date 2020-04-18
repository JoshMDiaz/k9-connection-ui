import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DogProfile from './DogProfile/DogProfile'
import DogSearch from '../DogSearch'
import { DogsContext, DogsContextProvider } from '../DogsContext'

const DogsRoute = ({ auth }) => {
  return (
    <DogsContextProvider>
      <DogsContext.Consumer>
        {({ filters, dispatch }) => (
          <Switch>
            <Route
              exact
              path='/dogs/:id'
              render={(props) => <DogProfile {...props} auth={auth} />}
            />
            <Route
              exact
              path='/dogs'
              render={(props) => (
                <DogSearch
                  {...props}
                  auth={auth}
                  filters={filters}
                  dogsDispatch={dispatch}
                />
              )}
            />
          </Switch>
        )}
      </DogsContext.Consumer>
    </DogsContextProvider>
  )
}

export default DogsRoute
