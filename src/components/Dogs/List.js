import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const List = ({ dogs }) => {
  let count = 0
  return (
    <div className='card-list'>
      {dogs.map((e, i) => {
        count++
        return <Card dog={e} key={i} count={count} />
      })}
    </div>
  )
}

export default List

List.propTypes = {
  dogs: PropTypes.array.isRequired
}
