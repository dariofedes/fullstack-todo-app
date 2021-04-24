const { models: { Task } } = require('../data')
const { constants: { priorities } } = require('commons')
const { sanitize } = require('../utils')
const { ContentError } = require('../errors')


/**
 * Creates and save in database a task
 * 
 * @param {string} title the task title
 * @param {string} description the task description
 * @param {string} priority one of this: LOW, MEDIUM, HIGH, CRITICAL
 * 
 * @throws {ContentError} on empty or non string title
 * @throws {ContentError} on non string description
 * @throws {ContentError} on non string priority
 * @throws {ContentError} on non string priority
 * 
 * @returns {Promise<Object>} the saved task document
 */

module.exports = function createTask(title, description, priority = priorities.MEDIUM) {
    // Type check
    if(typeof title !== 'string') throw new ContentError('title must be a string')
    if(description && typeof description !== 'string') throw new ContentError('description must be a string')
    if(typeof priority !== 'string') throw new ContentError('priority must be a string')
    if(!Object.values(priorities).includes(priority)) throw new ContentError(`priority must be one of ${Object.values(priorities)}`)

    // Creating task
    return (async () => {
        return sanitize(await Task.create({ title, description, priority }))
    })()
}