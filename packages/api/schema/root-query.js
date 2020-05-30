require('dotenv').config()
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')
const { UserType, PostType } = require('./types')
const {
    retrieveNvmber,
    retrieveUser,
    searchUser,
    retrieveHistorical,
    retrieveAllNvmbers,
    retrieveAllHistoricals,
    retrieveHistoricalsByNvmber
} = require('nvmber-server-logic')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process


module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrieveUser(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrieveAllUsers()
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            async resolver(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrievePost(args.id)
            }
        },
        posts: {
            type: GraphQLList(PostType),
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrieveAllPosts()
            }
        }
    }
})