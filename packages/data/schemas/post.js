const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    publisher: { type: ObjectId, required: true },
    title: { type: String, required: true },
    created: { type: Date, required: true, default: new Date },
    image: {type: String, default: ''}
})
