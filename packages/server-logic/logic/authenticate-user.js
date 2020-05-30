const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const { models: { User } } = require('data')
const { sanitize } = require('../utils')

module.exports =  (email, password) => {
    if(typeof email !== 'string') throw new Error('email must be a string')
    if(!EMAIL_REGEX.test(email)) throw new Error(`${email} is not an email`)
    if(typeof password !== 'string') throw new Error('password must be a string')

    return (async () => {
        let user = await User.findOne({ email, password })
        
        if(!user) throw new Error('wrong credentials')
        
        user = sanitize(user)

        return user
    })()
}