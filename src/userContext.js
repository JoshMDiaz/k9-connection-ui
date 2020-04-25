import React from 'react'

const UserContext = React.createContext({
  user: {},
  dogs: [],
  prevPage: '',
  setUser: () => {},
  setDogs: () => {},
  setPrevPage: () => {},
})

export default UserContext
