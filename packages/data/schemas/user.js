const { Schema, Types: { ObjectID } } = require('mongoose')
const { Post } = require('../models')

module.exports = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    created: { type: Date, required: true, default: new Date },
    avatar: {type: String, default: ''},
    posts: { type: [ ObjectID ], default: [ ] }
})