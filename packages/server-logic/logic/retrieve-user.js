const { models: { User } } = require('data')
const { sanitize } = require('../utils')

module.exports = (id) => {
    if(typeof id !== 'string') throw new Error('id must be a string')

    return (async () => {
        let user = await User.findById(id)
        if(!user)throw new Error(`user with id ${id} does not exist`)

        return sanitize(user)
    })()
}