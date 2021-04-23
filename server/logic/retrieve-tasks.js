const { models: { Task } } = require('../data')
const { sanitize } = require('../utils')

/**
 * retrieves all tasks stored in database
 * 
 * @returns {Promise<Array>} the tasks stored in database
 */

module.exports = async function retrieveTasks() {
    const tasks = await Task.find()

    return tasks.map(task => sanitize(task))
}