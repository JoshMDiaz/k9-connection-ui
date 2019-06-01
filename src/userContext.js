import React from 'react'

const userContext = React.createContext({
  user: {},
  dogs: [],
  setUser: () => {},
  setDogs: () => {}
})

export default userContext
