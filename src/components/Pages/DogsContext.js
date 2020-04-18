import React, { useReducer } from 'react'

const defaultFilter = {
  name: '',
  gender: '',
  papered: '',
  registered: '',
  ageRange: {
    min: 1,
    max: 15,
  },
  distance: null,
  breed: [],
  eyes: [],
  favorite: false,
  useAge: false,
}

const initialState = () => ({
  filters: localStorage.getItem('filter')
    ? JSON.parse(localStorage.getItem('filter'))
    : defaultFilter,
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      let newFilters = {
        ...state.filters,
        ...action.payload,
      }
      localStorage.setItem('filter', JSON.stringify(newFilters))
      return {
        ...state,
        filters: newFilters,
      }
    case 'RESET':
      localStorage.removeItem('filter')
      return {
        ...state,
        filters: { ...defaultFilter },
      }
    default:
      break
  }
}

const DogsContext = React.createContext()

const DogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState())
  return (
    <DogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DogsContext.Provider>
  )
}

export { DogsContext, DogsContextProvider, reducer }
