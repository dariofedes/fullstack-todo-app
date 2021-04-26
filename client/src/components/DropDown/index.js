import React from 'react'
import PropTypes from 'prop-types'


const DropDown = ({ options, name, selected, onChange }) => {
  return (
    <select
      className="dropdown"
      name={name}
      defaultValue={selected}
      onChange={onChange}
    >
      {options.map((option, index) => {
        return (
          <option
            className="dropdown__option"
            value={option}
            key={index}
            >
              {option}
          </option>
        )
      })}
    </select>
  )
}

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  slected: PropTypes.string,
  onChange: PropTypes.func,
}

export default DropDown