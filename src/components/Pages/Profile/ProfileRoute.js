import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewDog from './NewDog'
import UserProfile from './UserProfile/UserProfile'

const ProfileRoute = ({ auth }) => {
  return (
    <Switch>
      <Route
        exact
        path='/profile/new-dog'
        render={props => <NewDog {...props} auth={auth} />}
      />
      <Route
        exact
        path='/profile'
        render={props => <UserProfile {...props} auth={auth} />}
      />
    </Switch>
  )
}

export default ProfileRoute
