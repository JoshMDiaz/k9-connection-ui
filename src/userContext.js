import React from 'react'

const userContext = React.createContext({
  user: {},
  dogs: [],
  login: () => {},
  setDogs: () => {}
})

export default userContext
