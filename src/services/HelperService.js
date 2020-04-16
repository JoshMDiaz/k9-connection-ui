import React from 'react'
import moment from 'moment'
import Plural from '../components/common/Plural'

class HelperService {
  getYearsOld = (date) => {
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

  capitalize = (str) => {
    if (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }
  }

  numberFormat = (num) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0 })
  }
}

export default new HelperService()
