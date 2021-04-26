import React from 'react'
import PropTypes from 'prop-types'
import literals from './literals'

const Button = ({ title, submit, type, onClick }) => {
  return (
    <button className={`button${type ? ` button--${type}` : ''}`}
      type={submit ? "submit" : "button"}
      onClick={() => !submit && onClick()}
    >
      <span className="button__title">{title}</span>
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  submit: PropTypes.bool,
  type: PropTypes.oneOf(['ACCEPT', 'DANGER', 'CANCEL', undefined]),
  onClick: PropTypes.func,
}

Button.defaultProps = {
  title: literals.defaultTitle,
  submit: false,
}

export default Button