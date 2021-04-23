const { retrieveTasks } = require('../../logic')
const errorHandler = require('./error-handler')

module.exports = async function retrieveTasksHandler(req, res) {
    try {
        const tasks = await retrieveTasks()

        return res.status(200).json(tasks)
    } catch (error) {
        errorHandler(error, res)
    }
}