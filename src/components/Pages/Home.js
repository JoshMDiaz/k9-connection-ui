import React, { useEffect, useState } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'

const Home = () => {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    getDogs()
  }, [])

  const getDogs = () => {
    DogService.getAll().then(response => {
      if (response) {
        setDogs(response.data)
      }
    })
  }

  return (
    <div className='home-page'>
      <List dogs={dogs} />
    </div>
  )
}

export default Home
