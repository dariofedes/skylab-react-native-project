const context = require('./context')
const { GraphQLClient } = require('graphql-request')

module.exports = function (id) {
    if(typeof id !== 'string') throw new Error('id must be a string')

    const token = this.storage.getItem('token')
    
    return (async () => {
        const client = new GraphQLClient(this.API_URL, {
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