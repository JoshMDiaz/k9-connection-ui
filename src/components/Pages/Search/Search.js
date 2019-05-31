import React, { useEffect, useState } from 'react'
import List from '../../Dogs/List'
import NumberFormat from 'react-number-format'
import Plural from '../../common/Plural'
import PageHeader from '../../common/PageHeader/PageHeader'
import BackButton from '../../common/BackButton/BackButton'

const Search = props => {
  let count = 0

  return (
    <div className='search-page'>
      <div className='main-content-header'>
        <BackButton history={props.history} />
        <PageHeader
          text={
            <>
              <NumberFormat
                value={props.dogs.length}
                thousandSeparator={true}
                displayType='text'
              />
              &nbsp;
              <Plural text='Dog' number={props.dogs.length} />
              &nbsp;Found
            </>
          }
        />
      </div>
      <div className='page-padding'>
        <List dogs={props.dogs} />
      </div>
    </div>
  )
}

export default Search
