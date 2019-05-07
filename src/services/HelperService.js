import React from 'react'
import moment from 'moment'
import Plural from '../components/common/Plural'

class HelperService {
  getYearsOld = date => {
    let start = moment(date),
      end = moment(),
      duration = moment.duration(end.diff(start)),
      years = Math.round(duration.asYears())
    return (
      <span>
        {years} <Plural text='year' number={years} /> old
      </span>
    )
  }
}

export default new HelperService()
