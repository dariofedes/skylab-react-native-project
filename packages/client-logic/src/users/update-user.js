const context = require('@skylab/services/src/Context')
const { GraphQLClient } = require('graphql-request')

module.exports = function (email, username, avatar, password, newPassword) {
    if(typeof email !== 'string') throw new Error('email must be a string')
    if(typeof username !== 'string') throw new Error('username must be a string')
    if(typeof password !== 'string') throw new Error('password must be a string')
    if(typeof newPassword !== 'string') throw new Error('newPassword must be a string')

    
    return (async () => {
        const token = await this.default.storage.getItem('token')

        // TODO Upload image and retrieve url

        const client = new GraphQLClient(this.default.API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const mutation = `
        {
            updateUser(email: "${email}", username: "${username}", avatar: "${avatar}", password: "${password}", newPassword: "${newPassword}") {
                    id
                    email
                    username
                    avatar
                }
            }
        }`

        const { updateUser, error } = await client.request(mutation)

        if(error) throw new Error(error.message)

        return updateUser
    })()
}.bind(context)