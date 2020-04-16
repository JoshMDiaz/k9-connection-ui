import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useCallback,
} from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import Filter from '../Filter/Filter'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'
import { Popover } from '@material-ui/core'
import LoadingCard from '../common/LoadingCard/LoadingCard'
import Icon from '../common/Icons/Icon'
import PageHeader from '../common/PageHeader/PageHeader'
import UserContext from '../../userContext'
import FilterHelperService from '../../services/FilterHelperService'

const Dogs = () => {
  const initialState = () => ({
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
  })
  let filterTimeout,
    initialForm = JSON.parse(localStorage.getItem('filter')) || initialState(),
    initialFilterCount = localStorage.getItem('filterCount') || 0
  const [dogs, setDogs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState(initialFilterCount)
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)
  const uc = useContext(UserContext)

  const getDogs = useCallback((filter) => {
    setLoading(true)
    let params = {}
    if (filter) {
      params = FilterHelperService.generateParams(filter)
    }
    DogService.getAll(params).then((response) => {
      if (response) {
        setDogs(response.data)
        setLoading(false)
      }
    })
  }, [])

  const toggleFilter = (isOpen, e) => {
    setFilterOpen(isOpen)
    isOpen && setPopoverAnchorEl(e.currentTarget)
  }

  const reducer = (form, action) => {
    switch (action.type) {
      case 'RESET':
        getDogs(initialState())
        setActiveFilters(0)
        return initialState()
      case 'UPDATE':
        return {
          ...form,
          ...action.payload,
        }
      case 'ACTIVE_FILTERS':
        setActiveFilters(action.payload)
        return
      case 'SEARCH':
        getDogs(form)
        toggleFilter(false)
        return {
          ...form,
        }
      default:
        break
    }
  }

  const [form, dispatch] = useReducer(reducer, initialForm)
  let count = 0

  useEffect(() => {
    if (dogs.length === 0) {
      getDogs(initialForm)
    }
    return () => {
      clearTimeout(filterTimeout)
    }
  }, [getDogs, initialForm, filterTimeout])

  return (
    <div className='dogs-page'>
      <div className='main-content-header'>
        <PageHeader
          text={
            <>
              <NumberFormat
                value={dogs.length}
                thousandSeparator={true}
                displayType='text'
              />
              &nbsp;
              <Plural text='Dog' number={dogs.length} />
            </>
          }
        />
        <div className='button-container animated fadeInRight'>
          <button className='plain' onClick={(e) => toggleFilter(true, e)}>
            {activeFilters > 0 && <span className='tag'>{activeFilters}</span>}
            <span>Filter</span>
            <Icon icon='chevronDown' />
          </button>
          <Popover
            id='filter-popover'
            open={filterOpen}
            anchorEl={popoverAnchorEl}
            onClose={() => toggleFilter(false)}
            classes={{
              paper: 'popover-container',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Filter
              form={form}
              dispatch={dispatch}
              closeFilter={() => toggleFilter(false)}
              user={uc.user}
            />
          </Popover>
          <Link to='/profile/new-dog' className='new-dog-link'>
            <button className='primary'>New Dog</button>
          </Link>
        </div>
      </div>
      <div className='page-padding'>
        {!loading ? (
          <List dogs={dogs} user={uc.user} />
        ) : (
          <div className='card-list'>
            {[...Array(12).keys()].map((row) => {
              count++
              return <LoadingCard key={row} count={count} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dogs
