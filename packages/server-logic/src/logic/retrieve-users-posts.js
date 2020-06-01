const { models: { Post } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = (publisher) => {
    if(typeof publisher !== 'string') throw new Error('publisher must be a string')
    
    return (async () => {
        const posts = await Post.find({ publisher })

        return posts.map(post => sanitize(post))
    })()
}