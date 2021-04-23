const { Router } = require('express')
const { json } = require('body-parser')
const {
    createTaskHandler,
    retrieveTasksHandler,
} = require('./handlers')

const jsonBodyParser = json()

const router = new Router()

// Routes
router.post('/task', jsonBodyParser, createTaskHandler)
router.get('/tasks', retrieveTasksHandler)

module.exports = router