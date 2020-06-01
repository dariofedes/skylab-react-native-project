const { models: { User } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = () => {
    return (async () => {
        const users = await User.find()

        return users.map(user => sanitize(user))
    })()
}