const { deleteTask } = require('../../logic')
const errorHandler = require('./error-handler')

module.exports = async function deleteTaskHandler(req, res) {
    try {
        const { params: { taskId } } = req

        const deletedTaskId = await deleteTask(taskId)

        return res.status(200).json({ id: deletedTaskId })
    } catch (error) {
        errorHandler(error, res)
    }
}