const { models: { User } } = require('data')
const { asertStringParam } = require('utils')
const { sanitize } = require('../utils')

module.exports = (username, email, password) => {
    asertStringParam(email)
    asertStringParam(username)
    asertStringParam(password)

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