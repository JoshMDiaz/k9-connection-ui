import React, { useEffect, useState, useCallback } from 'react'
import List from '../Dogs/List'
import DogService from '../../services/DogService'
import LoadingCard from '../common/LoadingCard/LoadingCard'
import { generateParams } from '../../services/FilterHelperService'
import { Pagination } from '@material-ui/lab'

const Dogs = ({ filter, callout }) => {
  const [state, setState] = useState({
    dogs: [],
    loading: true,
    page: 1,
    total: null,
  })
  const { dogs, loading, page, total } = state

  const getDogs = useCallback(
    (pageNumber) => {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }))
      localStorage.setItem('dogPageNumber', pageNumber)
      let params = generateParams(filter)
      params.page = pageNumber
      DogService.getAll(params).then((response) => {
        if (response) {
          let dogsArr = [...response.data]
          callout(dogsArr[0].count)
          setState((prevState) => ({
            ...prevState,
            dogs: dogsArr,
            loading: false,
            page: Number(pageNumber),
            total: dogsArr[0].count,
          }))
        }
      })
    },
    [callout, filter]
  )

  useEffect(() => {
    getDogs(localStorage.getItem('dogPageNumber') || 1)
  }, [getDogs])

  let totalCount = Math.round(total / 20)

  return (
    <div className='page-padding'>
      {!loading ? (
        <>
          <List dogs={dogs} />
          <Pagination
            count={totalCount}
            page={page}
            showFirstButton={page > 1 && totalCount > 20}
            showLastButton={page !== totalCount && totalCount > 20}
            hidePrevButton={page === 1}
            hideNextButton={page === totalCount}
            onChange={(_, pageNum) => getDogs(pageNum)}
          />
        </>
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
