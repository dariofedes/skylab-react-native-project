const mongoose = require('mongoose')
const { post } = require('../schemas')

module.exports = mongoose.model('Post', post)