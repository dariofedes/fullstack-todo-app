const { Router } = require('express')
const { json } = require('body-parser')
const {
    createTaskHandler,
} = require('./handlers')

const jsonBodyParser = json()

const router = new Router()

// Routes
router.post('/task', jsonBodyParser, createTaskHandler)

module.exports = router