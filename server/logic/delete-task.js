const { models: { Task } } = require('../data')
const { NotFoundError, ContentError } = require('../errors')

/**
 * Deletes from database the task with the given id
 * 
 * @param {String} taskId the id of the task is going to be delete
 * 
 * @throws {ContentError} on empty or non string taskId
 * @throws {NotFoundError} on not existing task to delete
 * 
 * @returns {Promise<String>} the id of the deleted task
 */

module.exports = function deleteTask(taskId) {
    // Type check
    if(typeof taskId !== 'string') throw new ContentError('taskId must be a string')

    // Deleting task
    return (async () => {
        const task = await Task.findById(taskId)

        if(!task) throw new NotFoundError(`task with id ${taskId} does not exist`)

        const deletedTask = await Task.findByIdAndDelete(taskId)

        return deletedTask.id
        // return sanitize(await Task.create({ title, description, priority }))
    })()
}