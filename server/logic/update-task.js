const { models: { Task } } = require('../data')
const { constants: { priorities } } = require('commons')
const { sanitize } = require('../utils')
const { ContentError, NotFoundError } = require('../errors')


/**
 * Updates a task stored in database
 * 
 * @param {String} taskId the task id
 * @param {String} title the task title
 * @param {String} description the task description
 * @param {String} priority one of this: LOW, MEDIUM, HIGH, CRITICAL
 * 
 * @throws {ContentError} on empty or non string taskId
 * @throws {ContentError} on non string title
 * @throws {ContentError} on non string description
 * @throws {ContentError} on non string priority
 * @throws {ContentError} on not valid priority
 * 
 * @returns {Promise<Object>} the updated task document
 */

module.exports = function createTask(taskId, title, description, priority) {
    // Type check
    if(taskId === '' || typeof taskId !== 'string') throw new ContentError('taskId must be a non empty string')
    if(title !== undefined && typeof title !== 'string' || title === '') throw new ContentError('title must be a non empty string or undefined')
    if(description !== undefined && typeof description !== 'string') throw new ContentError('description must be a string or undefined')
    if(priority !== undefined && typeof priority !== 'string') throw new ContentError('priority must be a not empty string or undefined')
    if(priority && !Object.values(priorities).includes(priority)) throw new ContentError(`priority must be one of ${Object.values(priorities)}`)
    if(title === undefined && description === undefined && priority === undefined) throw new ContentError('at least a field must be defined')

    // Updating task
    return (async () => {
        const task = await Task.findById(taskId)
        if(!task) throw new NotFoundError(`task with id ${taskId} does not exist`)

        return sanitize(await Task.findByIdAndUpdate(taskId, { title, description, priority }, { new: true, omitUndefined: true }))
    })()
}