import React from 'react'
import ReactDOM from 'react-dom'
import Button from './'
import { act, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

let container

describe('Button', () => {
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })    
    
    it('should not throw on render', () => {
        ReactDOM.render(<Button title="TITLE" />, container)
    })
    
    it('should render the Button title', () => {
        act(() => {
            ReactDOM.render(<Button title="TITLE" />, container)
        })
        
        const buttonTitle = screen.getByText(/TITLE/i);
        expect(buttonTitle).toBeInTheDocument()
    })
    
    it('should render the Button with danger modifier on danger type', () => {
        act(() => {
            ReactDOM.render(<Button title="TITLE" type="DANGER" />, container)
        })
        
        const button = container.querySelector('.button')
        
        expect(button.classList).toContain('button--DANGER')
    })
    
    it('should render the Button with accept modifier on accept type', () => {
        act(() => {
            ReactDOM.render(<Button title="TITLE" type="ACCEPT" />, container)
        })
        
        const button = container.querySelector('.button')
        
        expect(button.classList).toContain('button--ACCEPT')
    })
    
    it('should render the Button with cancel modifier on cancel type', () => {
        act(() => {
            ReactDOM.render(<Button title="TITLE" type="CANCEL" />, container)
        })
        
        const button = container.querySelector('.button')
        
        expect(button.classList).toContain('button--CANCEL')
    })
    
    it('triggers the Button onclick', () => {
        const handleOnClick = jest.fn()
        act(() => {
            ReactDOM.render(<Button title="TITLE" onClick={handleOnClick} />, container)
        })
        
        fireEvent.click(container.querySelector('.button'))
    
        expect(handleOnClick).toHaveBeenCalled()
    })
    
    afterEach(() => {
        document.body.removeChild(container)
        container = null
    })
})