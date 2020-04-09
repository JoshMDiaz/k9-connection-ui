import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import NumberFormat from 'react-number-format'
import Plural from '../../common/Plural'
import BackButton from '../../common/BackButton/BackButton'
import SearchService from '../../../services/SearchService'
import LoadingCard from '../../common/LoadingCard/LoadingCard'
import { useHistory } from 'react-router-dom'

const Search = ({ dogs }) => {
  const [dogsToDisplay, setDogsToDisplay] = useState(dogs)
  const [loading, setLoading] = useState(false)

  const history = useHistory(),
    searchParams = history.location.search.substring(1)

  const getDogs = () => {
    SearchService.cancelGetAll()
    setLoading(true)
    let params = {
      value: searchParams !== '' ? searchParams : null,
    }
    SearchService.getAll(params).then((response) => {
      if (response) {
        setDogsToDisplay(response.data)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    if (dogs.length === 0 && searchParams === '') {
      getDogs()
    } else {
      setDogsToDisplay(dogs)
    }
  }, [dogs, searchParams])

  let count = 0

  return (
    <div className='search-page'>
      <div className='main-content-header'>
        <BackButton history={history} isSearch />
        <h3 className='page-header animated fadeInRight'>
          <NumberFormat
            value={dogsToDisplay.length}
            thousandSeparator={true}
            displayType='text'
          />
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
