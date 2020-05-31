const { models: { User } } = require('data')
const { sanitize } = require('../utils')

module.exports = () => {
    return (async () => {
        const users = await User.find()

        return users.map(user => sanitize(user))
    })()
}