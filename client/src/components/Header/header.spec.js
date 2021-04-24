/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './'

let container, appName

describe('Header', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        appName = `App-${Math.random()}`
    })
    
    it('should not throw at render', () => {
        expect(() => ReactDOM.render(<Header title={appName} />, container)).not.to.throw()
    })

    it('should have only one child wich is an H1', () => {
        act(() => {
            ReactDOM.render(<Header title={appName} />, container)
        })

        const header = container.querySelector('.header')

        expect(header.children).to.have.lengthOf(1)
        expect(header.children[0].tagName).to.be.equal('H1')
    })

    it('should display the app name in the H1', () => {
        
        act(() => {
            ReactDOM.render(<Header title={appName} />, container)
        })

        const header = container.querySelector('.header')

        expect(header.children[0].textContent).to.be.equal(appName)
    })
      
    afterEach(() => {
        document.body.removeChild(container)
        container = null

        appName = null      
    })
})