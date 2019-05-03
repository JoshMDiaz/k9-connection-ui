import React, { useEffect, useState, useReducer } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import Filter from '../Filter/Filter'
import { Drawer } from '@material-ui/core'

const Browse = () => {
  const [dogs, setDogs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    getDogs()
  }, [])

  const getDogs = filter => {
    let params = {}
    if (filter) {
      params = {
        name: filter.name || null,
        gender: filter.gender || null,
        papered: filter.papered || null,
        registered: filter.registered || null,
        start_date: filter.birthdate ? filter.birthdate.startDate : null,
        end_date: filter.birthdate ? filter.birthdate.endDate : null,
        breed: filter.breed || null,
        eyes: filter.eyes || null
      }
    }
    DogService.getAll(params).then(response => {
      if (response) {
        setDogs(response.data)
      }
    })
  }

  const toggleDrawer = isOpen => {
    setFilterOpen(isOpen)
  }

  const initialState = () => ({
    name: '',
    gender: '',
    papered: '',
    registered: '',
    ageRange: {
      min: 1,
      max: 15
    },
    breed: [],
    eyes: []
  })

  const reducer = (form, action) => {
    switch (action.type) {
      case 'RESET':
        return initialState()
      case 'UPDATE':
        return {
          ...form,
          ...action.payload
        }
      case 'SEARCH':
        getDogs(form)
        toggleDrawer(false)
        return
      default:
        break
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState())

  return (
    <div className='browse-page'>
      <Drawer open={filterOpen} onClose={() => toggleDrawer(false)}>
        <Filter form={form} dispatch={dispatch} />
      </Drawer>
      <button className='plain' onClick={() => toggleDrawer(true)}>
        Filter
      </button>
      <List dogs={dogs} />
    </div>
  )
}

export default Browse
