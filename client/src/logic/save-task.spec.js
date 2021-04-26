/* eslint-disable no-unused-expressions */
import { expect as chaiExpect } from 'chai'
import { constants } from 'commons'
import saveTask from './save-task'
import { API_URL } from '../constants'

// Dependencies to mock
import axios from 'axios'

let mockTask
const prioritiesArray = Object.values(constants.priorities)

describe('saveTask', () => {
    describe('on valid arguments', () => {
        beforeEach(() => {
            mockTask = {
                id: `ID-${Math.random()}`,
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                priority: prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]
            }

            axios.post = jest.fn((url, body) => ({ data: { ...body, id: `ID-${Math.random()}` } }))
            axios.patch = jest.fn((url, body) => ({ data: { ...body, id: mockTask.id } }))
        })

        it('should not throw', async () => {
            let error

            try {
                await saveTask(mockTask)
            } catch(_error) {
                error = _error
            }

            chaiExpect(error).not.to.exist
        })

        it('should call to the server correct endpoint with PATCH method on task have id', async () => {
            await saveTask(mockTask)

            expect(axios.patch).toHaveBeenCalled()
            expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/task/${mockTask.id}`, { title: mockTask.title, description: mockTask.description, priority: mockTask.priority })
        })

        it('should call to the server correct endpoint with POST method on task doesn\'t have id', async () => {
            delete mockTask.id

            await saveTask(mockTask)

            expect(axios.post).toHaveBeenCalled()
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/task`, mockTask)
        })

        it('should return the data from the server response', async () => {
            const task = await saveTask(mockTask)
            
            chaiExpect(task.id).to.be.equal(mockTask.id)
        })

        afterEach(() => {
            axios.post.mockClear()
            axios.patch.mockClear()

            mockTask = null
        })
    })

    describe('on not valid taskId', () => {
        beforeEach(() => {
            mockTask = {
                id: `ID-${Math.random()}`,
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                priority: prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]
            }
        })

        it('should throw a synchronous TypeError on empty or non string taskId', () => {
            mockTask.id = 1
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'id must be a string')
            mockTask.id = true
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'id must be a string')
            mockTask.id = ''
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'id must be a string')
            mockTask.id = { }
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'id must be a string')
            mockTask.id = [ ]
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'id must be a string')
        })

        it('should throw a synchronous TypeError on empty or non string title', () => {
            mockTask.title = 1
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = true
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = ''
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = undefined
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = null
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = { }
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
            mockTask.title = [ ]
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'title must be a non empty string')
        })

        it('should throw a synchronous TypeError on non string description', () => {
            mockTask.description = 1
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'description must be a string')
            mockTask.description = true
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'description must be a string')
            mockTask.description = { }
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'description must be a string')
            mockTask.description = [ ]
            chaiExpect(() => saveTask(mockTask)).to.throw(TypeError, 'description must be a string')
        })

        it('should throw a RangeError on not accepted priority', () => {
            mockTask.priority = "NOT_ACCEPTED_PRIORITY"
            chaiExpect(() => saveTask(mockTask)).to.throw(RangeError, 'priority must be one of LOW,MEDIUM,HIGH,CRITICAL')
        })

        afterEach(() => {
            mockTask = null
        })
    })
})