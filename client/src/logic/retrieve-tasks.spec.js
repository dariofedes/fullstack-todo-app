/* eslint-disable no-unused-expressions */
import { expect as chaiExpect } from 'chai'
import retrieveTasks from './retrieve-tasks'
import { API_URL } from '../constants'

// Dependencies to mock
import axios from 'axios'

describe('retrieveTasks', () => {
    describe('on valid taskId', () => {
        beforeEach(() => {
            axios.get = jest.fn(() => ({ data: [{ mock: 'task' }] }))
        })

        it('should not throw', async () => {
            let error

            try {
                await retrieveTasks()
            } catch(_error) {
                error = _error
            }

            chaiExpect(error).not.to.exist
        })

        it('should call to the server correct endpoint with GET method', async () => {
            await retrieveTasks()

            expect(axios.get).toHaveBeenCalled()
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/tasks`)
        })

        it('should return the data from the server response', async () => {
            const tasks = await retrieveTasks()
            
            chaiExpect(tasks[0].mock).to.be.equal('task')
        })

        afterEach(() => {
            axios.get.mockClear()
        })
    })
})