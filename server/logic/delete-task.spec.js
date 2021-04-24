require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const mongoose = require('mongoose')
const { ContentError, NotFoundError } = require('../errors')
const deleteTask = require('./delete-task')
const { models: { Task } } = require('../data')

let taskId

describe('deleteTask', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await Task.deleteMany()
    })

    describe('on valid arguments', () => {
        beforeEach(async () => {
            const { _id } = await Task.create({ title: `title-${Math.random()}` })

            taskId = _id.toString()
        })

        it('should not throw', async () => {
            let error

            try {
                await deleteTask(taskId)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return a string with the id of the deleted task', async () => {
            const deletedTaskId = await deleteTask(taskId)

            expect(deletedTaskId).to.be.a('string').that.is.equal(taskId)
        })

        it('should delete the task from database', async () => {
            await deleteTask(taskId)

            const task = await Task.findById(taskId)

            expect(task).not.to.exist
        })

        it('should throw a NotFoundError on not existing task', async () => {
            await Task.deleteMany()

            let error

            try {
                await deleteTask(taskId)
            } catch(_error) {
                error = _error
            }

            expect(error).to.be.an.instanceof(NotFoundError)
            expect(error.message).to.be.equal(`task with id ${taskId} does not exist`)
        })

        afterEach(async () => {
            taskId = undefined
        })
    })

    describe('on not valid arguments', () => {
        it('should throw a ContentError on not string taskId', () => {
            taskId = 1
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')

            taskId = true
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')

            taskId = undefined
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')

            taskId = null
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')

            taskId = { }
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')

            taskId = [ ]
            expect(() => deleteTask(taskId)).to.throw(ContentError, 'taskId must be a string')
        })
    })

    after(async () => {
        await Task.deleteMany();
        await mongoose.disconnect();
    })
})