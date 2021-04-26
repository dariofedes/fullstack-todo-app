const createCustomError = require('./create-custom-error')

module.exports = {
    ContentError: createCustomError('ContentError'),
    NotFoundError: createCustomError('NotFoundError'),
}