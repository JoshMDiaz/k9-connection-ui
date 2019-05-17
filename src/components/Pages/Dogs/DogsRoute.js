import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DogProfile from './DogProfile'
import MyDogs from './MyDogs'

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
        render={props => <MyDogs {...props} auth={auth} />}
      />
    </Switch>
  )
}

export default DogsRoute
