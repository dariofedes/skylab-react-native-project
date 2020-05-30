module.exports = {
    registerUser: require('./logic/register-user'),
    authenticateUser: require('./logic/authenticate-user'),
    retrieveUser: require('./logic/retrieve-user'),
    retrieveAllUsers: require('./logic/retrieve-all-users'),
    updateUser: require('./logic/update-user'),
    publishPost: require('./logic/publish-post'),
    retrieveUsersPosts: require('./logic/retrieve-users-posts'),
    retrievePost: require('./logic/retrieve-post'),
    retrieveAllPosts: require('./logic/retrieve-all-posts'),
}