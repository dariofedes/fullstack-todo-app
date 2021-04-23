const { models: { Task } } = require('../data')
const { constants: { priorities } } = require('commons')
const { sanitize } = require('../utils')

/**
 * Creates and save in database a task
 * 
 * @param {string} title the task title
 * @param {string} description the task description
 * @param {string} priority one of this: LOW, MEDIUM, HIGH, CRITICAL
 * 
 * @throws {TypeError} on empty or non string title
 * @throws {TypeError} on non string description
 * @throws {TypeError} on non string priority
 * @throws {RangeError} on non string priority
 * 
 * @returns {Promise<Object>} the saved task document
 */

module.exports = function createTask(title, description, priority = priorities.MEDIUM) {
    // Type check
    if(typeof title !== 'string') throw new TypeError('title must be a string')
    if(description && typeof description !== 'string') throw new TypeError('description must be a string')
    if(typeof priority !== 'string') throw new TypeError('priority must be a string')
    if(!Object.values(priorities).includes(priority)) throw new RangeError(`priority must be one of ${Object.values(priorities)}`)

    // Creating task
    return (async () => {
        return sanitize(await Task.create({ title, description, priority }))
    })()
}