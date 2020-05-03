import React, { useState } from 'react'
import Auth from './services/Auth/Auth'

const AuthContext = React.createContext()

const auth = new Auth()

function AuthProvider(props) {
  const [user, setUser] = useState(null)

  const login = auth.login
  const logout = auth.logout
  const handleAuthentication = auth.handleAuthentication
  const isAuthenticated = auth.isAuthenticated
  const getUser = auth.getUser

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        handleAuthentication,
        isAuthenticated,
        getUser,
      }}
      {...props}
    />
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
