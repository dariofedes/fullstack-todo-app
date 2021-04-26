import React from 'react'
import literals from './literals'
import spinner from '../../assets/images/spinner.svg'

const Loading = () => {
  return (
    <div className="loading">
      <img className="loading__spinner" alt="loading_spinner" src={spinner} />
      <span className="loading__message">{literals.message}</span>
    </div>
  )
}

export default Loading
