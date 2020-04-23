import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DogProfile from './DogProfile/DogProfile'
import DogBrowse from '../DogBrowse'
import { DogsContext, DogsContextProvider } from '../DogsContext'

const DogsRoute = ({ auth }) => {
  return (
    <DogsContextProvider>
      <DogsContext.Consumer>
        {({ filters, filterCount, dispatch }) => (
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
                <DogBrowse
                  {...props}
                  auth={auth}
                  filters={filters}
                  filterCount={filterCount}
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
