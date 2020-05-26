
require('dotenv').config()
const { env: { JWT_SECRET, JWT_EXP } } = process
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean
} = require('graphql')
const {
    UserType,
    LoginType,
    CommentType,
    HistoricalType,
    ValueType
} = require('./types')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    postComment,
    addValue,
    followToggle,
    likeHistorical,
    updateUser
} = require('nvmber-server-logic')
const { GraphQLDate } = require('graphql-iso-date')
const jwt = require('jsonwebtoken')

module.exports = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const { username, email, password } = args

                const user = await registerUser(username, email, password)

                return user
            }
        },
        addValue: {
            type: HistoricalType,
            args: {
                nvmber: { type: GraphQLInt },
                numericValue: { type: GraphQLInt },
                comment: { type: GraphQLString },
                isPrivate: {type: GraphQLBoolean }
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: publisher } = await jwt.verify(token, JWT_SECRET)

                return await addValue(publisher, args.nvmber, args.numericValue, args.comment, args.isPrivate)
            }
        },
        authenticateUser: {
            type: LoginType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { email, password } = args
                const user = await authenticateUser(email, password)

                const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXP })
                
                return {
                    user,
                    token
                }
            }
        },
        postComment: {
            type: CommentType,
            args: {
                historicalId: { type: GraphQLID },
                text: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: publisher } = await jwt.verify(token, JWT_SECRET)
                
                return await postComment(args.historicalId, publisher, args.text)
            }
        },
        followToggle: {
            type: UserType,
            args: {
                followed: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: follower } = await jwt.verify(token, JWT_SECRET)
                return await followToggle(follower, args.followed)
            }
        },
        likeHistorical: {
            type: HistoricalType,
            args: {
                historicalId: { type: GraphQLID },
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: userId } = await jwt.verify(token, JWT_SECRET)
                
                return await likeHistorical(userId, args.historicalId)
            }
        },
        updateUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                newPassword: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: userId } = await jwt.verify(token, JWT_SECRET)
                
                return await updateUser(userId, args.username, args.email, args.password, args.newPassword)
            }
        }
    }
})