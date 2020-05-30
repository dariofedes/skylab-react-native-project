module.exports = function(document) {
    document = document.toObject && document.toObject() || document
    document.id = document._id.toString()
    delete document._id
    document.__v && delete document.__v
    document.password && delete document.password

    return document
}