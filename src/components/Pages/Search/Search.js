import React, { useEffect, useState, useCallback } from 'react'
import List from '../../Dogs/List'
import Plural from '../../common/Plural'
import BackButton from '../../common/BackButton/BackButton'
import SearchService from '../../../services/SearchService'
import LoadingCard from '../../common/LoadingCard/LoadingCard'
import { useHistory } from 'react-router-dom'
import HelperService from '../../../services/HelperService'

const Search = () => {
  const [dogsToDisplay, setDogsToDisplay] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory(),
    searchParams = history.location.search.substring(1)

  const getDogs = useCallback(() => {
    SearchService.cancelGetAll()
    setLoading(true)
    let params = {
      ...(searchParams ? { value: searchParams } : {}),
    }
    SearchService.getAll(params).then((response) => {
      if (response) {
        setDogsToDisplay(response.data)
        setLoading(false)
      }
    })
  }, [searchParams])

  useEffect(() => {
    getDogs()
  }, [getDogs])

  let count = 0

  return (
    <div className='search-page'>
      <div className='main-content-header'>
        <BackButton isSearch />
        <h3 className='page-header animated fadeInRight'>
          {HelperService.numberFormat(dogsToDisplay.length)}
          &nbsp;
          <Plural text='Dog' number={dogsToDisplay.length} />
          &nbsp;Found
        </h3>
      </div>
      <div className='page-padding'>
        {!loading ? (
          <List dogs={dogsToDisplay} />
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

export default Search
