const { Router } = require('express')
const { json } = require('body-parser')
const {
    createCardHandler,
} = require('./handlers')

const jsonBodyParser = json()

const router = new Router()

// Routes
router.post('/card', jsonBodyParser, createCardHandler)

module.exports = router