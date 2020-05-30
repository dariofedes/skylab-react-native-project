const { Schema, Types: { ObjectID } } = require('mongoose')
const { Post } = require('../models')

module.exports = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatar: {type: String, default: ''}
})