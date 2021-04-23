const { createCard } = require('../../logic')
const errorHandler = require('./error-handler')

module.exports = async function createCardHandler(req, res) {
    try {
        const { body: { title, description, priority } } = req

        const card = await createCard(title, description, priority)

        return res.status(201).json(card)
    } catch (error) {
        errorHandler(error, res)
    }
}