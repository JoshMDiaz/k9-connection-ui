import React, { useEffect, useReducer, useContext, useCallback } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import LoadingCard from '../common/LoadingCard/LoadingCard'
import UserContext from '../../userContext'
import FilterHelperService from '../../services/FilterHelperService'

const Dogs = ({ filter, callout }) => {
  const pageState = {
    dogs: [],
    loading: true,
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {
          ...state,
          ...action.payload,
        }
      default:
        break
    }
  }

  const [state, dispatch] = useReducer(pageReducer, pageState)
  const { dogs, loading } = state

  const uc = useContext(UserContext)

  const getDogs = useCallback(() => {
    dispatch({
      type: 'UPDATE',
      payload: {
        loading: true,
      },
    })
    let params = FilterHelperService.generateParams(filter)
    DogService.getAll(params).then((response) => {
      if (response) {
        let dogsArr = [...response.data]
        callout(dogsArr.length)
        dispatch({
          type: 'UPDATE',
          payload: {
            dogs: dogsArr,
            loading: false,
          },
        })
      }
    })
  }, [callout, filter])

  useEffect(() => {
    getDogs()
  }, [filter])

  return (
    <div className='page-padding'>
      {!loading ? (
        <List dogs={dogs} user={uc.user} />
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
