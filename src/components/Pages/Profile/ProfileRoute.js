import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewDog from './NewDog'

const ProfileRoute = ({ auth }) => {
  return (
    <Switch>
      <Route
        exact
        path='/profile/new-dog'
        render={props => <NewDog {...props} auth={auth} />}
      />
    </Switch>
  )
}

export default ProfileRoute
