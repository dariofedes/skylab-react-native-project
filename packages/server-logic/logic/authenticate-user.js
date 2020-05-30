const { models: { User } } = require('data')
const { asertStringParam } = require('utils')
const { sanitize } = require('../utils')

module.exports =  (email, password) => {
    asertStringParam(email)
    asertStringParam(password)

    return (async () => {
        let user = await User.findOne({ email, password })
        
        if(!user) throw new Error('wrong credentials')
        
        user = sanitize(user)

        return user
    })()
}