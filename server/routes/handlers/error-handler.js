const { ContentError, NotFoundError } = require('../../errors')

module.exports = function errorHandler(error, res) {
    let status
    let message = error.message

    switch(true) {
        case error instanceof ContentError:
            status = 406
            break;

        case error instanceof NotFoundError:
            status = 404
            break;
            
        default:
            status = 500
            message = 'Unknown error'
    }

    res
        .status(status)
        .json({
            error: message
        })
}