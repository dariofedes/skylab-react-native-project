module.exports = function(document) {
    debugger
    document = document.toObject && document.toObject() || document
    document.id = document._id.toString()
    delete document._id
    document.__v !== undefined && delete document.__v
    document.password && delete document.password

    return document
}