import React from 'react'
import PropTypes from 'prop-types'
import literals from './literals'

const ErrorCard = ({ message }) => {
  return (
    <div className="error-card">
      <span className="error-card__title">{literals.title}</span>
      <span className="error-card__message">{message}</span>
    </div>
  )
}

ErrorCard.propTypes = {
  message: PropTypes.string
}

export default ErrorCard
