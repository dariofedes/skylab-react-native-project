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
        nvmber: {
            type: NvmberType,
            args: { nvmber: { type: GraphQLInt } },
            async resolve(parent, args) {
                return await retrieveNvmber(args.nvmber)
            }
        },
        nvmbers: {
            type: GraphQLList(NvmberType),
            async resolve() {
                return await retrieveAllNvmbers()
            }
        },
        searchUser: {
            type: GraphQLList(UserType),
            args: { username: { type: GraphQLString } },
            async resolve(parent, args) {
                return await searchUser(args.username)
            }
        },
        historical: {
            type: HistoricalType,
            args: { id: { type: GraphQLID }, publisher: { type: GraphQLID }, nvmber: { type: GraphQLInt } },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                const { sub: retriever } = await jwt.verify(token, JWT_SECRET)

                return await retrieveHistorical(args.id, retriever, args.publisher, args.nvmber)
            }
        },
        historicals: {
            type: GraphQLList(HistoricalType),
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                const { sub: retriever } = await jwt.verify(token, JWT_SECRET)

                return await retrieveAllHistoricals(retriever, retriever)
            }
        },
        historicalsByNvmber: {
            type: GraphQLList(HistoricalType),
            args: { nvmber: { type: GraphQLInt } },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                const { sub: retriever } = await jwt.verify(token, JWT_SECRET)

                return await retrieveHistoricalsByNvmber(args.nvmber, retriever)
            }
        }
    }
})