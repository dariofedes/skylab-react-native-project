const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const { models: { User } } = require('data')
const { sanitize } = require('../utils')

module.exports = (id, username, email, password, newPassword, avatar) => {
    if(email && typeof email !== 'string') throw new Error('email must be a string')
    if(email && !EMAIL_REGEX.test(email)) throw new Error(`${email} is not an email`)
    if(username && typeof username !== 'string') throw new Error('username must be a string')
    if(password && typeof password !== 'string') throw new Error('password must be a string')
    if(newPassword && typeof newPassword !== 'string') throw new Error('newPassword must be a string')
    if(avatar && typeof avatar !== 'string') throw new Error('avatar must be a string')

    return (async () => {
        const usernameInUse = await User.findOne({username})
        if(usernameInUse) throw new Error(`username in use`)

        const emailInUse = await User.findOne({email})
        if(emailInUse) throw new Error(`email in use`)

        const user = await User.findById(id)
        if(!user) throw new Error(`no user found with id ${id}`)

        if(username) user.username = username
        if(email) user.email = email
        if(avatar) user.avatar = avatar
        if(newPassword) {
            if(password !== user.password) throw new Error('wrong password')

            user.password = newPassword
        }

        const _user = await user.save()

        return sanitize(_user)
    })()
}