import React, { useState, useCallback } from 'react'
import Filter from '../Filter/Filter'
import { Link } from 'react-router-dom'
import Plural from '../common/Plural'
import { Popover } from '@material-ui/core'
import Icon from '../common/Icons/Icon'
import PageHeader from '../common/PageHeader/PageHeader'
import { numberFormat } from '../../services/HelperService'
import Dogs from './Dogs'

const DogBrowse = ({ filters, filterCount, dogsDispatch }) => {
  const [state, setState] = useState({
    filterOpen: false,
    popoverAnchorEl: null,
    dogsNum: 0,
  })
  const { dogsNum, filterOpen, popoverAnchorEl } = state

  const user = JSON.parse(localStorage.getItem('user'))

  const toggleFilter = (isOpen, e) => {
    let stateObj = {
      filterOpen: isOpen,
    }
    if (isOpen) {
      stateObj.popoverAnchorEl = e.currentTarget
    }
    setState((prevState) => ({
      ...prevState,
      ...stateObj,
    }))
  }

  const updateDogsNum = useCallback((num) => {
    setState((prevState) => ({
      ...prevState,
      dogsNum: num,
    }))
  }, [])

  return (
    <div className='dogs-page'>
      <div className='main-content-header'>
        <PageHeader
          text={
            <>
              {numberFormat(dogsNum)}
              &nbsp;
              <Plural text='Dog' number={dogsNum} />
            </>
          }
        />
        <div className='button-container animated fadeInRight'>
          {filterCount > 0 && (
            <button
              className='no-bg'
              onClick={() =>
                dogsDispatch({
                  type: 'RESET',
                })
              }
            >
              Clear
            </button>
          )}
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
              user={user}
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

export default DogBrowse
