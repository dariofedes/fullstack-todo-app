import React from 'react'
import PropTypes from 'prop-types'
import { capitalize as cap } from '../../utils'

const PriorityLabel = ({ priority, capitalize }) => {
  return (
    <div className={`label label--${priority}`}>
      <span className="label__priority">{capitalize ? cap(priority) : priority}</span>
    </div>
  )
}

PriorityLabel.propTypes = {
  priority: PropTypes.oneOf(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  capitalize: PropTypes.bool,
}

PriorityLabel.defaultProps = {
  capitalize: false,
}

export default PriorityLabel