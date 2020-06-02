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
            retrieveUser(id: "${id}") {
                    username
                }
            }
        }`

        const { retrieveUser, error } = await client.request(query)

        if(error) throw new Error(error.message)

        return retrieveUser
    })()
}.bind(context)