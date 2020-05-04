import React, { useState, useEffect } from 'react'
import AppLoader from '../AppLoader'
import { useAuth } from '../../AuthContext'

const UnauthenticatedApp = () => {
  const {
    login,
    handleAuthentication,
    setUser,
    isAuthenticated,
    getUser,
  } = useAuth()

  const [message, setMessage] = useState('Come back soon!')
  const pathname = window.location.pathname,
    hash = window.location.hash

  useEffect(() => {
    if (pathname === '/callback' && /access_token|id_token|error/.test(hash)) {
      handleAuthentication(
        () => setUser(getUser),
        () => setMessage('Error Loading your account...')
      )
      setMessage('Loading your account...')
    } else {
      if (isAuthenticated()) {
        setUser(getUser())
      } else {
        login()
      }
    }
  }, [
    getUser,
    handleAuthentication,
    hash,
    isAuthenticated,
    login,
    pathname,
    setUser,
  ])

  return <AppLoader message={message} />
}

export default UnauthenticatedApp
