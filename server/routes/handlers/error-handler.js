const { ContentError } = require('../../errors')

module.exports = function errorHandler(error, res) {
    let status
    let message = error.message

    switch(true) {
        case error instanceof ContentError ||
            error instanceof TypeError ||
            error instanceof RangeError:
            status = 406
            break
            
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