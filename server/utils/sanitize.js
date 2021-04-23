module.exports = function(document) {
    document = document.toObject ? document.toObject() : document
    document.id = document._id ? document._id.toString() : document.id
    delete document._id
    document.__v !== undefined && delete document.__v

    return document
}