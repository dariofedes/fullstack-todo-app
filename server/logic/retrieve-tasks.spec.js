require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const mongoose = require('mongoose')
const retrieveTasks = require('./retrieve-tasks')
const { models: { Task } } = require('../data')

let fakeTitle

describe.only('retrieveTasks', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await Task.deleteMany()
    })

    describe('on tasks found', () => {
        beforeEach(async () => {
            fakeTitle = `title-${Math.random()}`

            for (let i = 0; i < 3; i++) {
                await Task.create({ title: fakeTitle });
            }
        })

        it('should not throw', async () => {
            let error

            try {
                await retrieveTasks()
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return an array with length 3 containing the the tasks documents', async () => {
            const tasks = await retrieveTasks()

            expect(tasks).to.be.an.instanceof(Array).and.has.lengthOf(3)
            tasks.forEach(task => {
                expect(task.id).to.be.a('string')
                expect(task.title).to.be.a('string')
            })
        })

        it('should not expose the database', async () => {
            const tasks = await retrieveTasks()
            
            tasks.forEach(task => {
                expect(task._id).not.to.exist
                expect(task.__v).not.to.exist
            })
        })

        afterEach(async () => {
            await Task.deleteMany()
        })
    })

    describe('on no tasks found', () => {
        beforeEach(async () => {
            await Task.deleteMany()
        })

        it('should not throw', async () => {
            let error

            try {
                await retrieveTasks()
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return an empty array', async () => {
            const tasks = await retrieveTasks()

            expect(tasks).to.be.an.instanceof(Array).and.has.lengthOf(0)
        })

        afterEach(async () => {
            await Task.deleteMany()
        })
    })

    after(async () => {
        await Task.deleteMany();
        await mongoose.disconnect();
    })
})