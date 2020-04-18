import React, { useReducer, useContext, useCallback } from 'react'
import Filter from '../Filter/Filter'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'
import { Popover } from '@material-ui/core'
import Icon from '../common/Icons/Icon'
import PageHeader from '../common/PageHeader/PageHeader'
import UserContext from '../../userContext'
import HelperService from '../../services/HelperService'
import Dogs from './Dogs'

const DogSearch = ({ filters, filterCount, dogsDispatch }) => {
  const pageState = {
    filterOpen: false,
    popoverAnchorEl: null,
    dogsNum: 0,
  }

  const [state, dispatch] = useReducer(HelperService.reducer, pageState)
  const { dogsNum, filterOpen, popoverAnchorEl } = state

  const uc = useContext(UserContext)

  const toggleFilter = (isOpen, e) => {
    let dispatchObj = {
      filterOpen: isOpen,
    }
    if (isOpen) {
      dispatchObj.popoverAnchorEl = e.currentTarget
    }
    dispatch({
      type: 'UPDATE',
      payload: dispatchObj,
    })
  }

  const updateDogsNum = useCallback((num) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        dogsNum: num,
      },
    })
  }, [])

  return (
    <div className='dogs-page'>
      <div className='main-content-header'>
        <PageHeader
          text={
            <>
              {HelperService.numberFormat(dogsNum)}
              &nbsp;
              <Plural text='Dog' number={dogsNum} />
            </>
          }
        />
        <div className='button-container animated fadeInRight'>
          <button className='plain' onClick={(e) => toggleFilter(true, e)}>
            {filterCount > 0 && <span className='tag'>{filterCount}</span>}
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
              filters={filters}
              formDispatch={dogsDispatch}
              toggleFilter={toggleFilter}
              user={uc.user}
            />
          </Popover>
          <Link to='/profile/new-dog' className='new-dog-link'>
            <button className='primary'>New Dog</button>
          </Link>
        </div>
      </div>
      <Dogs filter={filters} callout={updateDogsNum} />
    </div>
  )
}

export default DogSearch
