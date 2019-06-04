import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import NumberFormat from 'react-number-format'
import Plural from '../../common/Plural'
import BackButton from '../../common/BackButton/BackButton'
import SearchService from '../../../services/SearchService'
import LoadingCard from '../../common/LoadingCard/LoadingCard'

const Search = props => {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.dogs.length === 0) {
      getDogs()
    } else {
      SearchService.cancelGetAll()
      setDogs(props.dogs)
      setLoading(false)
    }
  }, [props.dogs])

  const getDogs = () => {
    setLoading(true)
    let searchParams = props.location.search.substring(1),
      params = {
        value: searchParams !== '' ? searchParams : null
      }
    SearchService.getAll(params).then(response => {
      if (response) {
        setDogs(response.data)
        setLoading(false)
      }
    })
  }

  let count = 0

  return (
    <div className='search-page'>
      <div className='main-content-header'>
        <BackButton history={props.history} isSearch />
        <h3 className='page-header animated fadeInRight'>
          <NumberFormat
            value={dogs.length}
            thousandSeparator={true}
            displayType='text'
          />
          &nbsp;
          <Plural text='Dog' number={dogs.length} />
          &nbsp;Found
        </h3>
      </div>
      <div className='page-padding'>
        {!loading ? (
          <List dogs={dogs} />
        ) : (
          <div className='card-list'>
            {[...Array(12).keys()].map(row => {
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
