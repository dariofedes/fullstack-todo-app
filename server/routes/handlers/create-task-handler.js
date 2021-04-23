const { createTask } = require('../../logic')
const errorHandler = require('./error-handler')

module.exports = async function createTaskHandler(req, res) {
    try {
        const { body: { title, description, priority } } = req

        const task = await createTask(title, description, priority)

        return res.status(201).json(task)
    } catch (error) {
        errorHandler(error, res)
    }
}