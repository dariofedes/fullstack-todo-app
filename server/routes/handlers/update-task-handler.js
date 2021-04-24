const { updateTask } = require('../../logic')
const errorHandler = require('./error-handler')

module.exports = async function updateTaskHandler(req, res) {
    try {
        const { params: { taskId }, body: { title, description, priority } } = req

        const task = await updateTask(taskId, title, description, priority)

        return res.status(200).json(task)
    } catch (error) {
        errorHandler(error, res)
    }
}