const { Router } = require('express')
const { json } = require('body-parser')
const {
    createTaskHandler,
    retrieveTasksHandler,
    deleteTaskHandler,
    updateTaskHandler,
} = require('./handlers')

const jsonBodyParser = json()

const router = new Router()

// Routes
router.post('/task', jsonBodyParser, createTaskHandler)
router.get('/tasks', retrieveTasksHandler)
router.delete('/task/:taskId', deleteTaskHandler)
router.patch('/task/:taskId', jsonBodyParser, updateTaskHandler)

module.exports = router