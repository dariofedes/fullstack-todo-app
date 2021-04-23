const { models: { Card } } = require('../data')
const { constants: { priorities } } = require('commons')
const { sanitize } = require('../utils')

/**
 * Creates and save in database a card
 * 
 * @param {string} title the card title
 * @param {string} description the card description
 * @param {string} priority one of this: LOW, MEDIUM, HIGH, CRITICAL
 * 
 * @throws {TypeError} on empty or non string title
 * @throws {TypeError} on non string description
 * @throws {TypeError} on non string priority
 * @throws {RangeError} on non string priority
 * 
 * @returns {Promise<Object>} the saved card document
 */

module.exports = function createCard(title, description, priority = priorities.MEDIUM) {
    // Type check
    if(typeof title !== 'string') throw new TypeError('title must be a string')
    if(description && typeof description !== 'string') throw new TypeError('description must be a string')
    if(typeof priority !== 'string') throw new TypeError('priority must be a string')
    if(!Object.values(priorities).includes(priority)) throw new RangeError(`priority must be one of ${Object.values(priorities)}`)

    // Creating card
    return (async () => {
        return sanitize(await Card.create({ title, description, priority }))
    })()
}