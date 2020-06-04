const context = require('@skylab/services/src/Context')
const { GraphQLClient } = require('graphql-request')

module.exports = function (id) {
    if(typeof id !== 'string') throw new Error('id must be a string')

    
    return (async () => {
        const token = await this.default.storage.getItem('token')

        const client = new GraphQLClient(this.default.API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const query = `
        {
            user(id: "${id}") {
                username
            }
        }`

        const { user, error } = await client.request(query)

        if(error) throw new Error(error.message)

        return user
    })()
}.bind(context)