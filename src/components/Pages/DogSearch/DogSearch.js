import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import DogService from '../../../services/DogService'
import Filter from '../../Filter/Filter'
import { Drawer } from '@material-ui/core'

const DogSearch = () => {
  const [dogs, setDogs] = useState([])

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

  const toggleDrawer = () => {}

  return (
    <div className='dog-search-page'>
      <Drawer open={true} onClose={toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role='button'
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <Filter callout={getDogs} />
        </div>
      </Drawer>
      <List dogs={dogs} />
    </div>
  )
}

export default DogSearch
