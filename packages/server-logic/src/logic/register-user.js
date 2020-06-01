const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const { models: { User } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = (username, email, password) => {
    if(typeof email !== 'string') throw new Error('email must be a string')
    if(!EMAIL_REGEX.test(email)) throw new Error(`${email} is not an email`)
    if(typeof username !== 'string') throw new Error('username must be a string')
    if(typeof password !== 'string') throw new Error('password must be a string')

    return (async () => {
        let user = await User.findOne({ email })
        if(user) throw new Error (`email ${email} is already in use`)

        user = await User.findOne({ username })
        if(user) throw new Error (`username ${username} is already in use`)

        user = new User({
            email,
            username,
            password // TODO encrypt this sensible field (bcryptjs?)
        })
        
        user = sanitize(await user.save())
        
        return user
    })()
}