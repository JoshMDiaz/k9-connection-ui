import React, { Suspense } from 'react'
import './scss/main.scss'
import Auth from './services/Auth/Auth'
const AuthenticatedApp = React.lazy(() =>
  import('./components/Pages/AuthenticatedApp')
)
const UnauthenticatedApp = React.lazy(() =>
  import('./components/Pages/UnauthenticatedApp')
)

const auth = new Auth()

function App() {
  return (
    <Suspense fallback={<div> </div>}>
      {auth.isAuthenticated() ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export default App
