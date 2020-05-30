
require('dotenv').config()
const { env: { JWT_SECRET, JWT_EXP } } = process
const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const {
    UserType,
    LoginType,
    PostType
} = require('./types')
const {
    registerUser,
    authenticateUser,
    publishPost,
    updateUser
} = require('server-logic')
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
                return await registerUser(args.username, args.email, args.password)
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
        publishPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                image: { type: GraphQLString }
                
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: publisher } = await jwt.verify(token, JWT_SECRET)
                return await publishPost(publisher, args.title, args.image)
            }
        },
        
        updateUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                avatar: { type: GraphQLString },
                password: { type: GraphQLString },
                newPassword: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token ] = authorization.split(' ')
                const { sub: userId } = await jwt.verify(token, JWT_SECRET)
                
                return await updateUser(userId, args.username, args.email, args.password, args.newPassword, args.avatar)
            }
        }
    }
})