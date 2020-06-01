import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Card from './DogCard/DogCard'
import noDogImg from '../../images/no-image.jpg'
import Masonry from '../common/Masonry/Masonry'

const List = ({ dogs }) => {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    if (dogs.length > 0) {
      setTimeout(() => {
        setTrigger(true)
      }, 250)
    }
  }, [dogs])

  return (
    <>
      {dogs.length > 0 ? (
        <div className='masonry'>
          <Masonry resizeTrigger={trigger}>
            {dogs.map((e, i) => {
              return <Card dog={e} key={e.id} index={i} />
            })}
          </Masonry>
        </div>
      ) : (
        <div className='no-results animated fadeIn'>
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
