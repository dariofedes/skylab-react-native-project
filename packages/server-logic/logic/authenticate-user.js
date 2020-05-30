const { models: { User } } = require('nvmber-data')
const { validate } = require('nvmber-utils')
const { sanitize } = require('../utils')

module.exports =  (email, password) => {
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        let user = await User.findOne({ email, password })
        
        if(!user) throw new Error('wrong credentials')
        
        user = sanitize(user)

        return user
    })()
}