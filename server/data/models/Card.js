const { model } = require('mongoose')
const { card } = require('../schemas')

module.exports = model('Card', card)