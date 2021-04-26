/* eslint-disable no-unused-expressions */
import { expect as chaiExpect } from 'chai'
import deleteTask from './delete-task'
import { API_URL } from '../constants'

// Dependencies to mock
import axios from 'axios'

let mockId

describe('deleteTask', () => {
    describe('on valid id', () => {
        beforeEach(() => {
            mockId = `ID-${Math.random()}`

            axios.delete = jest.fn(url => ({ data: { id: url.split('/')[5] } }))
        })

        it('should not throw', async () => {
            let error

            try {
                await deleteTask(mockId)
            } catch(_error) {
                error = _error
            }

            chaiExpect(error).not.to.exist
        })

        it('should call to the server correct endpoint with DELETE method', async () => {
            await deleteTask(mockId)

            expect(axios.delete).toHaveBeenCalled()
            expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/task/${mockId}`)
        })

        it('should return the data from the server response', async () => {
            const task = await deleteTask(mockId)
            
            chaiExpect(task.id).to.be.equal(mockId)
        })

        afterEach(() => {
            axios.delete.mockClear()

            mockId = null
        })
    })

    describe('on not valid id', () => {
        it('should throw a synchronous TypeError on empty or non string id', () => {
            chaiExpect(() => deleteTask(1)).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask(true)).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask('')).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask(undefined)).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask(null)).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask({ })).to.throw(TypeError, 'id must be a string')
            chaiExpect(() => deleteTask([ ])).to.throw(TypeError, 'id must be a string')
        })
    })
})