import React from 'react'
import iconsList from './iconsList'

const Icon = ({ icon, customClass, callout }) => (
  <span
    className={`icon ${icon} ${customClass ? customClass : ''} ${
      callout ? 'cursor-pointer' : ''
    }`}
    onClick={() => {
      callout && callout(icon)
    }}
  >
    {iconsList[icon]}
  </span>
)

export default Icon
