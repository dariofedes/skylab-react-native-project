const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql')
const { retrieveUser, retrieveUsersPosts } = require('server-logic')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
        avatar: {type: GraphQLString},
        created: { type: GraphQLDateTime },
        posts: {
            type: GraphQLList(PostType),
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrieveUsersPosts(parent.id)
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        created: { type: GraphQLString },
        publisher: {
            type: UserType,
            async resolve(parent, args, context) {
                const { headers: { authorization } } = context
                const [ , token] = authorization.split(' ')
                await jwt.verify(token, JWT_SECRET)

                return await retrieveUser(parent.publisher)
            }
        }
    })
})

const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        user: { type: UserType },
        token: { type: GraphQLString }
    })
})

module.exports = {
    UserType,
    PostType,
    LoginType
}