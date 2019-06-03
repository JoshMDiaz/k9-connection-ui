import React from 'react'

const userContext = React.createContext({
  user: {},
  dogs: [],
  prevPage: '',
  setUser: () => {},
  setDogs: () => {},
  setPrevPage: () => {}
})

export default userContext
