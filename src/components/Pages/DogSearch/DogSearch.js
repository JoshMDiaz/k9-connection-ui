import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import DogService from '../../../services/DogService'
import Filter from '../../Filter/Filter'

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

  return (
    <div className='dog-search-page'>
      <Filter callout={getDogs} />
      <List dogs={dogs} />
    </div>
  )
}

export default DogSearch
