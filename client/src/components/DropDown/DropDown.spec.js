import React from 'react'
import ReactDOM from 'react-dom'
import DropDown from './'
import { act, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

let container

describe('Button', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })    
    
    it('should not throw on render', () => {
        ReactDOM.render(<DropDown options={["OPTION1", "OPTION2"]} />, container)
    })
    
    it('should render the OPTIONS', () => {
        act(() => {
            ReactDOM.render(<DropDown options={["OPTION1", "OPTION2"]} />, container)
        })
        
        const option1 = screen.getByText(/OPTION1/i);
        const option2 = screen.getByText(/OPTION2/i);
        expect(option1).toBeInTheDocument()
        expect(option2).toBeInTheDocument()
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null
    })
})