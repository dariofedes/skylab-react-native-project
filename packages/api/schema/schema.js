const { GraphQLSchema } = require('graphql')
const RootQuery = require('./root-query')
const Mutation = require('./mutation')

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})