const { model } = require('mongoose')
const { task } = require('../schemas')

module.exports = model('Task', task)