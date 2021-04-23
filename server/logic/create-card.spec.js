require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const mongoose = require('mongoose')
const { constants: { priorities } } = require('commons')
const createCard = require('./create-card')
const { models: { Card } } = require('../data')

let fakeTitle, fakeDescription, fakePriority
const prioritiesArray = Object.values(priorities)

describe('createCard', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await Card.deleteMany()
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
                await createCard(fakeTitle, fakeDescription, fakePriority)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should return the created card data', async () => {
            const { id, title, description, priority } = await createCard(fakeTitle, fakeDescription, fakePriority)

            expect(id).to.exist
            expect(id).to.be.a('string')
            
            const persistedCard = await Card.findById(id)

            expect(title).to.be.equal(fakeTitle).to.be.equal(persistedCard.title)
            expect(description).to.be.equal(fakeDescription).to.be.equal(persistedCard.description)
            expect(priority).to.be.equal(fakePriority).to.be.equal(persistedCard.priority)

        })

        it('should not expose the database', async () => {
            const card = await createCard(fakeTitle, fakeDescription, fakePriority)

            expect(card._id).not.to.exist
            expect(card.__v).not.to.exist
        })

        it('should not throw and still create a card on no description', async () => {
            // Forcing no description
            fakeDescription = undefined
            let error 

            try {
                const { id } = await createCard(fakeTitle, fakeDescription, fakePriority)

                const card = await Card.findById(id)

                expect(card.description).not.to.exist
                expect(card.title).to.be.equal(fakeTitle)
                expect(card.priority).to.be.equal(fakePriority)
            } catch(_error) {
                error = _error
            }

            expect(error).not.to.exist
        })

        it('should create a card with priority "MEDIUM" as default value on no priority', async () => {
            // Forcing no priority
            fakePriority = undefined

            const { id } = await createCard(fakeTitle, fakeDescription, fakePriority)

            const card = await Card.findById(id)

            expect(card.priority).to.be.equal("MEDIUM")
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

        it('should throw a TypeError on not string title', () => {
            fakeTitle = 1
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')

            fakeTitle = true
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')

            fakeTitle = undefined
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')

            fakeTitle = null
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')

            fakeTitle = { }
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')

            fakeTitle = [ ]
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'title must be a string')
        })

        it('should throw a TypeError on existing but not string description', () => {
            fakeDescription = 1
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'description must be a string')

            fakeDescription = true
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'description must be a string')

            fakeDescription = { }
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'description must be a string')

            fakeDescription = [ ]
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'description must be a string')
        })

        it('should throw a TypeError on existing but not string priority', () => {
            fakePriority = 1
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'priority must be a string')

            fakePriority = true
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'priority must be a string')

            fakePriority = { }
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'priority must be a string')

            fakePriority = [ ]
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(TypeError, 'priority must be a string')
        })

        it('should throw a RangeError on string but not accepted priority', () => {
            fakePriority = "NOT_ACCEPTED_PRIORITY"
            expect(() => createCard(fakeTitle, fakeDescription, fakePriority)).to.throw(RangeError, 'priority must be one of LOW,MEDIUM,HIGH,CRITICAL')
        })


        afterEach(async () => {
            title = undefined
            description = undefined
            priority = undefined
        })
    })

    after(async () => {
        await Card.deleteMany();
        await mongoose.disconnect();
    })
})