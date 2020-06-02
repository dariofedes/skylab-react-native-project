const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const context = require('@skylab/services/src/Context')
const { request } = require('graphql-request')

module.exports = function (email, password) {
    email = email.toLowerCase()

    if(typeof email !== 'string') throw new Error('email must be a string')
    if(!EMAIL_REGEX.test(email)) throw new Error(`${email} is not an email`)
    if(typeof password !== 'string') throw new Error('password must be a string')
    
    return (async () => {
        const mutation = `
        mutation{
            authenticateUser(email: "${email}", password: "${password}") {
                token
                user {
                    id
                }
            }
        }`

        const { authenticateUser, error } = await request(this.default.API_URL, mutation)

        if(error) throw new Error(error.message)

        await this.default.storage.setItem('token', authenticateUser.token.toString())

        return authenticateUser
    })()
}.bind(context)