const { models: { Post } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = () => {
    return (async () => {
        const posts = await Post.find()

        return posts.map(post => sanitize(post))
    })()
}