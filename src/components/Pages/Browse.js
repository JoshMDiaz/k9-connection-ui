import React, { useEffect, useState, useReducer } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import Filter from '../Filter/Filter'
import chevronIcon from '../../images/icons/chevron-down.svg'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'
import { Popover } from '@material-ui/core'

const Browse = () => {
  const [dogs, setDogs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
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

  const openFilter = isOpen => {
    !isCancelled && setFilterOpen(isOpen)
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
    eyes: [],
    favorite: ''
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
        return {
          ...form
        }
      default:
        break
    }
  }

  const [form, dispatch] = useReducer(reducer, initialState())

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
          <Popover
            id='filter-popover'
            open={filterOpen}
            anchorEl={null}
            onClose={() => openFilter(false)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Filter form={form} dispatch={dispatch} />
          </Popover>
          <Link to='/new-dog'>
            <button className='primary'>Add New Dogs</button>
          </Link>
        </div>
      </div>
      {dogs.length > 0 ? (
        <List dogs={dogs} />
      ) : (
        <div className='no-results'>
          <div className='card'>
            <span>
              <h3>We're Sorry!</h3>
              We could not find any dogs with the filters you have selected.
              <br />
              Please try changing the filters.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Browse
