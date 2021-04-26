import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './'
import '@testing-library/jest-dom'

let container

describe('Button', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })    
    
    it('should not throw on render', () => {
        ReactDOM.render(<Loading />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null
    })
})