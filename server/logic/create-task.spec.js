require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const mongoose = require('mongoose')
const { ContentError } = require('../errors')
const { constants: { priorities } } = require('commons')
const createTask = require('./create-task')
const { models: { Task } } = require('../data')

let fakeTitle, fakeDescription, fakePriority
const prioritiesArray = Object.values(priorities)

describe('createTask', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await Task.deleteMany()
    })

    describe('on valid arguments', () => {
        beforeEach(async () => {
            fakeTitle = `title-${Math.random()}`
            fakeDescription = `description-${Math.random()}`
            fakePriority = prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]
        })

        it('should not throw', async () => {
            let error

            try {
                await createTask(fakeTitle, fakeDescription, fakePriority)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return the created task data', async () => {
            const { id, title, description, priority } = await createTask(fakeTitle, fakeDescription, fakePriority)

            expect(id).to.exist
            expect(id).to.be.a('string')
            
            const persistedTask = await Task.findById(id)

            expect(title).to.be.equal(fakeTitle).to.be.equal(persistedTask.title)
            expect(description).to.be.equal(fakeDescription).to.be.equal(persistedTask.description)
            expect(priority).to.be.equal(fakePriority).to.be.equal(persistedTask.priority)

        })

        it('should not expose the database', async () => {
            const task = await createTask(fakeTitle, fakeDescription, fakePriority)

            expect(task._id).not.to.exist
            expect(task.__v).not.to.exist
        })

        it('should not throw and still create a task on no description', async () => {
            // Forcing no description
            fakeDescription = undefined
            let error 

            try {
                const { id } = await createTask(fakeTitle, fakeDescription, fakePriority)

                const task = await Task.findById(id)

                expect(task.description).not.to.exist
                expect(task.title).to.be.equal(fakeTitle)
                expect(task.priority).to.be.equal(fakePriority)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should create a task with priority "MEDIUM" as default value on no priority', async () => {
            // Forcing no priority
            fakePriority = undefined

            const { id } = await createTask(fakeTitle, fakeDescription, fakePriority)

            const task = await Task.findById(id)

            expect(task.priority).to.be.equal("MEDIUM")
        })

        afterEach(async () => {
            title = undefined
            description = undefined
            priority = undefined
        })
    })

    describe('on not valid arguments', () => {
        beforeEach(async () => {
            fakeTitle = `title-${Math.random()}`
            fakeDescription = `description-${Math.random()}`
            fakePriority = prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]
        })

        it('should throw a ContentError on not string title', () => {
            fakeTitle = 1
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')

            fakeTitle = true
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')

            fakeTitle = undefined
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')

            fakeTitle = null
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')

            fakeTitle = { }
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')

            fakeTitle = [ ]
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'title must be a string')
        })

        it('should throw a ContentError on existing but not string description', () => {
            fakeDescription = 1
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'description must be a string')

            fakeDescription = true
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'description must be a string')

            fakeDescription = { }
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'description must be a string')

            fakeDescription = [ ]
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'description must be a string')
        })

        it('should throw a ContentError on existing but not string priority', () => {
            fakePriority = 1
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'priority must be a string')

            fakePriority = true
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'priority must be a string')

            fakePriority = { }
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'priority must be a string')

            fakePriority = [ ]
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'priority must be a string')
        })

        it('should throw a ContentError on string but not accepted priority', () => {
            fakePriority = "NOT_ACCEPTED_PRIORITY"
            expect(() => createTask(fakeTitle, fakeDescription, fakePriority)).to.throw(ContentError, 'priority must be one of LOW,MEDIUM,HIGH,CRITICAL')
        })


        afterEach(async () => {
            title = undefined
            description = undefined
            priority = undefined
        })
    })

    after(async () => {
        await Task.deleteMany();
        await mongoose.disconnect();
    })
})