require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const mongoose = require('mongoose')
const { ContentError, NotFoundError } = require('../errors')
const { constants: { priorities } } = require('commons')
const updateTask = require('./update-task')
const { models: { Task } } = require('../data')

let initialTitle,
    initialDescription,
    initialPriority,
    newTitle,
    newDescription,
    newPriority,
    taskId
const prioritiesArray = Object.values(priorities)

describe('updateTask', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await Task.deleteMany()
    })

    describe('on valid arguments', () => {
        beforeEach(async () => {
            // Defining initial values
            initialTitle = `initial-title-${Math.random()}`
            initialDescription = `initial-description-${Math.random()}`
            initialPriority = prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]

            // Storing task
            const { _id } = await Task.create({ title: initialTitle, description: initialDescription, priority: initialPriority })
            taskId = _id.toString()

            // Defining new values
            newTitle = `new-title-${Math.random()}`
            newDescription = `new-description-${Math.random()}`
            newPriority = prioritiesArray.find(priority => priority !== initialPriority)
        })

        it('should not throw', async () => {
            let error

            try {
                await updateTask(taskId, newTitle, newDescription, newPriority)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return the updated task data', async () => {
            const { id, title, description, priority } = await updateTask(taskId, newTitle, newDescription, newPriority)

            expect(id).to.be.a('string')
            expect(title).to.be.equal(newTitle)
            expect(description).to.be.equal(newDescription)
            expect(priority).to.be.equal(newPriority)

        })

        it('should not expose the database', async () => {
            const task = await updateTask(taskId, newTitle, newDescription, newPriority)

            expect(task._id).not.to.exist
            expect(task.__v).not.to.exist
        })

        it('should update task data in database', async () => {
            // Checking task initial stored values
            const initialTask = await Task.findById(taskId)

            expect(initialTask.title).to.be.equal(initialTitle)
            expect(initialTask.description).to.be.equal(initialDescription)
            expect(initialTask.priority).to.be.equal(initialPriority)

            // Updating
            await updateTask(taskId, newTitle, newDescription, newPriority)

            // Checking task updated stored values
            const newTask = await Task.findById(taskId)

            expect(newTask.title).to.be.equal(newTitle).and.not.to.be.equal(initialTask.title)
            expect(newTask.description).to.be.equal(newDescription).and.not.to.be.equal(initialTask.description)
            expect(newTask.priority).to.be.equal(newPriority).and.not.to.be.equal(initialTask.priority)
        })

        it('should accept update parameters optionally', async () => {
            // Forcing undefined title
            newTitle = undefined

            await updateTask(taskId, newTitle, newDescription, newPriority)

            const newTask = await Task.findById(taskId)

            expect(newTask.title).to.be.equal(initialTitle)
            expect(newTask.description).to.be.equal(newDescription)
            expect(newTask.priority).to.be.equal(newPriority)
        })

        it('should throw a ContentError on not existing any parameter', async () => {
            // Forcing all parameters undefined
            newTitle = undefined
            newDescription = undefined
            newPriority = undefined

            let error 

            try {
                await updateTask(taskId, newTitle, newDescription, newPriority)
            } catch(_error) {
                error = _error
            }

            expect(error).to.be.an.instanceof(ContentError)
            expect(error.message).to.be.equal('at least a field must be defined')
        })

        it('should accept empty strings as a valid parameter for description and update it', async () => {
            newDescription = ''

            const task = await updateTask(taskId, newTitle, newDescription, newPriority)

            expect(task.description).to.be.equal('')
        })

        afterEach(async () => {
            initialTitle = undefined
            initialDescription = undefined
            initialPriority = undefined

            newTitle = undefined
            newDescription = undefined
            newPriority = undefined

            await Task.deleteMany()
        })
    })

    describe('on not valid arguments', () => {
        beforeEach(async () => {
            newTitle = `new-title-${Math.random()}`
            newDescription = `new-description-${Math.random()}`
            newPriority = prioritiesArray[Math.floor(Math.random() * prioritiesArray.length)]
        })

        it('should throw a ContentError on not string or empty string taskId', () => {
            expect(() => updateTask(1, newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask(true, newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask('', newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask(undefined, newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask(null, newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask({ }, newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
            expect(() => updateTask([ ], newTitle, newDescription, newPriority)).to.throw(ContentError, 'taskId must be a non empty string')
        })

        it('should throw a ContentError on existing but not string nor empty string title', () => {
            newTitle = 1
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')

            newTitle = true
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')
            
            newTitle = ''
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')

            newTitle = null
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')

            newTitle = { }
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')

            newTitle = [ ]
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'title must be a non empty string or undefined')
        })

        it('should throw a ContentError on existing but not string description', () => {
            newDescription = 1
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'description must be a string or undefined')

            newDescription = true
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'description must be a string or undefined')

            newDescription = { }
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'description must be a string or undefined')

            newDescription = [ ]
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'description must be a string or undefined')
        })

        it('should throw a ContentError on existing but not string priority', () => {
            newPriority = 1
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'priority must be a not empty string or undefined')

            newPriority = true
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'priority must be a not empty string or undefined')

            newPriority = { }
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'priority must be a not empty string or undefined')

            newPriority = [ ]
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'priority must be a not empty string or undefined')
        })

        it('should throw a ContentError on string but not accepted priority', () => {
            newPriority = "NOT_ACCEPTED_PRIORITY"
            expect(() => updateTask(taskId, newTitle, newDescription, newPriority)).to.throw(ContentError, 'priority must be one of LOW,MEDIUM,HIGH,CRITICAL')
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