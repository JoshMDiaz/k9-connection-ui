import React, { useEffect, useState, useCallback } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import LoadingCard from '../common/LoadingCard/LoadingCard'
import FilterHelperService from '../../services/FilterHelperService'

const Dogs = ({ filter, callout }) => {
  const [state, setState] = useState({
    dogs: [],
    loading: true,
  })
  const { dogs, loading } = state

  const getDogs = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }))
    let params = FilterHelperService.generateParams(filter)
    DogService.getAll(params).then((response) => {
      if (response) {
        let dogsArr = [...response.data]
        callout(dogsArr.length)
        setState((prevState) => ({
          ...prevState,
          dogs: dogsArr,
          loading: false,
        }))
      }
    })
  }, [callout, filter])

  useEffect(() => {
    getDogs()
  }, [getDogs, filter])

  return (
    <div className='page-padding'>
      {!loading ? (
        <List dogs={dogs} />
      ) : (
        <div className='card-list'>
          {[...Array(12).keys()].map((row, i) => {
            return <LoadingCard key={row} count={(i % 20) + 1} />
          })}
        </div>
      )}
    </div>
  )
}

export default Dogs
