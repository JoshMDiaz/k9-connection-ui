import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import DogService from '../../../services/DogService'
import Filter from '../../Filter/Filter'

const DogSearch = () => {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    getDogs()
  }, [])

  const getDogs = () => {
    let params = {
      // name: 'Cory',
      // eyes: 'brown'
    }
    DogService.getAll(params).then(response => {
      if (response) {
        setDogs(response.data)
      }
    })
  }

  return (
    <div className='dog-search-page'>
      <Filter />
      <List dogs={dogs} />
    </div>
  )
}

export default DogSearch
