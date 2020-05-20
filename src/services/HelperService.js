import React from 'react'
import { differenceInYears } from 'date-fns'
import Plural from '../components/common/Plural'
import Mdash from '../components/common/Mdash/Mdash'

export function getYearsOld(date) {
  let start = new Date(date),
    end = new Date(),
    years = differenceInYears(end, start)
  return (
    <>
      {!isNaN(years) ? (
        <span>
          {years} <Plural text='year' number={years} /> old
        </span>
      ) : (
        <Mdash />
      )}
    </>
  )
}

export function capitalize(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
}

export function numberFormat(num) {
  return num.toLocaleString('en-US', { minimumFractionDigits: 0 })
}

export function formatPhoneNumber(phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    let intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}
