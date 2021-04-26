import React from 'react'
import PropTypes from 'prop-types'


const Header = ({ title }) => {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
