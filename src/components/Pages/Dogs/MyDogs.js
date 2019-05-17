import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import DogService from '../../../services/DogService'
import NumberFormat from 'react-number-format'
import Plural from '../../common/Plural'
import LoadingCard from '../../common/LoadingCard/LoadingCard'
import PageHeader from '../../common/PageHeader/PageHeader'

const MyDogs = props => {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)
  let filterTimeout, isCancelled

  useEffect(() => {
    !isCancelled && getDogs()
    return () => {
      clearTimeout(filterTimeout)
      isCancelled = true
    }
  }, [])

  const getDogs = filter => {
    !isCancelled && setLoading(true)
    let params = {}
    if (filter) {
      params = {
        owner_id: 1
      }
    }
    DogService.getAll(params).then(response => {
      if (response) {
        !isCancelled && setDogs(response.data)
        !isCancelled && setLoading(false)
      }
    })
  }

  let count = 0

  return (
    <div className='my-dogs-page'>
      <div className='main-content-header'>
        <PageHeader
          text={
            <>
              <NumberFormat
                value={dogs.length}
                thousandSeparator={true}
                displayType='text'
              />
              &nbsp;
              <Plural text='Dog' number={dogs.length} />
            </>
          }
        />
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

export default MyDogs
