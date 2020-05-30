const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    publisher: { type: ObjectId, required: true },
    title: { type: String, required: true },
    image: {type: String, default: ''},
    created: { type: String, required: true }
})
