import React, { useEffect, useState, useReducer } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import Filter from '../Filter/Filter'
import chevronIcon from '../../images/icons/chevron-down.svg'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'

const Browse = () => {
  const [dogs, setDogs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [closingFilter, setClosingFilter] = useState(false)
  let filterTimeout, isCancelled

  useEffect(() => {
    !isCancelled && getDogs()
    return () => {
      clearTimeout(filterTimeout)
      isCancelled = true
    }
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
        eyes: filter.eyes || null,
        favorite: filter.favorite || null
      }
    }
    DogService.getAll(params).then(response => {
      if (response) {
        setDogs(response.data)
      }
    })
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
        openFilter(false)
        return
      default:
        break
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState())

  const openFilter = isOpen => {
    console.log('filter open')
    if (isOpen === false) {
      setClosingFilter(true)
      filterTimeout = setTimeout(() => {
        !isCancelled && setFilterOpen(isOpen)
      }, 500)
    } else {
      !isCancelled && setFilterOpen(isOpen)
      !isCancelled && setClosingFilter(false)
    }
  }

  return (
    <div className='browse-page'>
      <div className='list-header'>
        <h3 className='animated fadeInLeft'>
          <NumberFormat
            value={1130}
            thousandSeparator={true}
            displayType='text'
          />
          &nbsp;
          <Plural text='Dog' number={1130} />
        </h3>
        <div className='button-container animated fadeInRight'>
          <button className='plain' onClick={() => openFilter(!filterOpen)}>
            Filter
            <img className='chevron' src={chevronIcon} alt='chevron' />
          </button>
          <Link to='/new-dog'>
            <button className='primary'>Add New Dogs</button>
          </Link>
        </div>
      </div>
      <div className='relative'>
        {filterOpen && (
          <Filter form={form} dispatch={dispatch} closing={closingFilter} />
        )}
        <List dogs={dogs} />
      </div>
    </div>
  )
}

export default Browse
