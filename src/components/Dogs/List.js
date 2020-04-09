import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Card from './DogCard/DogCard'
import noDogImg from '../../images/no-image.jpg'
import userContext from '../../userContext'

const List = ({ dogs, startingCount }) => {
  let count = startingCount || 0
  const uc = useContext(userContext)

  return (
    <>
      {dogs.length > 0 ? (
        <div className='card-list'>
          {dogs.map((e, i) => {
            count++
            return <Card dog={e} key={i} count={count} user={uc.user} />
          })}
        </div>
      ) : (
        <div className='no-results animated fadeInRight'>
          <div className='card'>
            <span>
              <h3>Sorry about that!</h3>
              <img src={noDogImg} alt='no-dog' />
              We could not find any dogs.
              <br />
              Please try to update your search filters.
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default List

List.propTypes = {
  dogs: PropTypes.array.isRequired,
}
