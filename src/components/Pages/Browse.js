import React, { useEffect, useState, useReducer } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import Filter from '../Filter/Filter'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'
import { Popover } from '@material-ui/core'
import LoadingCard from '../common/LoadingCard/LoadingCard'
import Icon from '../common/Icons/Icon'
import InfiniteScroll from 'react-infinite-scroller'

const Browse = props => {
  const [dogs, setDogs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState(0)
  let filterTimeout, isCancelled

  useEffect(() => {
    !isCancelled && getDogs()
    return () => {
      clearTimeout(filterTimeout)
      isCancelled = true
    }
  }, [])

  const getRegistered = form => {
    let value
    if (form.papered === 'false') {
      value = false
    }
    return value
  }

  const getDogs = filter => {
    !isCancelled && setLoading(true)
    let params = {}
    if (filter) {
      params = {
        name: filter.name || null,
        gender: filter.gender || null,
        papered: filter.papered || null,
        registered: filter.registered
          ? filter.registered
          : getRegistered(filter),
        start_date: filter.birthdate ? filter.birthdate.startDate : null,
        end_date: filter.birthdate ? filter.birthdate.endDate : null,
        breed: filter.breed || null,
        eyes: filter.eyes || null,
        favorite: filter.favorite || null
      }
    }
    DogService.getAll(params).then(response => {
      if (response) {
        !isCancelled && setDogs(response.data)
        !isCancelled && setLoading(false)
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
    favorite: false
  })

  const reducer = (form, action) => {
    switch (action.type) {
      case 'RESET':
        getDogs(initialState())
        setActiveFilters(0)
        return initialState()
      case 'UPDATE':
        return {
          ...form,
          ...action.payload
        }
      case 'ACTIVE_FILTERS':
        setActiveFilters(action.payload)
        return
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
  let count = 0

  return (
    <div className='browse-page'>
      <div className='list-header'>
        <h3 className='animated fadeInLeft'>
          <NumberFormat
            value={dogs.length}
            thousandSeparator={true}
            displayType='text'
          />
          &nbsp;
          <Plural text='Dog' number={dogs.length} />
        </h3>
        <div className='button-container animated fadeInRight'>
          <button className='plain' onClick={() => openFilter(!filterOpen)}>
            {activeFilters > 0 && <span className='tag'>{activeFilters}</span>}
            <span>Filter</span>
            <Icon icon='chevronDown' />
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
            classes={{
              paper: 'popover-container'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Filter
              form={form}
              dispatch={dispatch}
              closeFilter={() => openFilter(false)}
            />
          </Popover>
          <Link to='/new-dog'>
            <button className='primary'>Add New Dogs</button>
          </Link>
        </div>
      </div>
      {!loading ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={
            <div className='loader' key={0}>
              Loading ...
            </div>
          }
        >
          <List dogs={dogs} />
        </InfiniteScroll>
      ) : (
        <div className='card-list'>
          {[...Array(12).keys()].map(row => {
            count++
            return <LoadingCard key={row} count={count} />
          })}
        </div>
      )}
    </div>
  )
}

export default Browse
