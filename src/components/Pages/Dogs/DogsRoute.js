import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DogProfile from './DogProfile/DogProfile'
import Dogs from '../Dogs'

const DogsRoute = ({ auth }) => {
  return (
    <Switch>
      <Route
        exact
        path='/dogs/:id'
        render={props => <DogProfile {...props} auth={auth} />}
      />
      <Route
        exact
        path='/dogs'
        render={props => <Dogs {...props} auth={auth} />}
      />
    </Switch>
  )
}

export default DogsRoute
