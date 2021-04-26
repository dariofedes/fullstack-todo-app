import React from 'react'
import ReactDOM from 'react-dom'
import ErrorCard from '.'
import '@testing-library/jest-dom'

let container

describe('Button', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })    
    
    it('should not throw on render', () => {
        ReactDOM.render(<ErrorCard />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null
    })
})