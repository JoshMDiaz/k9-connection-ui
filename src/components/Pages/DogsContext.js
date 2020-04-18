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
  eyes: '',
  favorite: false,
  useAge: false,
}

const initialState = () => ({
  filters: localStorage.getItem('filter')
    ? JSON.parse(localStorage.getItem('filter'))
    : defaultFilter,
  filterCount: localStorage.getItem('filterCount') || 0,
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      let newFilters = {
        ...state.filters,
        ...action.payload.filters,
      }
      localStorage.setItem('filter', JSON.stringify(newFilters))
      localStorage.setItem(
        'filterCount',
        JSON.stringify(action.payload.filterCount)
      )
      return {
        ...state,
        filters: newFilters,
        filterCount: action.payload.filterCount,
      }
    case 'RESET':
      localStorage.removeItem('filter')
      localStorage.removeItem('filterCount')
      return {
        ...state,
        filters: { ...defaultFilter },
        filterCount: 0,
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
