const { models: { Post } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = (publisher, title, image) => {
    if(typeof publisher !== 'string') throw new Error('publisher must be a string')
    if(typeof title !== 'string') throw new Error('title must be a string')
    if(image && typeof image !== 'string') throw new Error('image must be a string')

    return (async () => {
        const created = new Date().toISOString()

        const post = new Post({
            publisher,
            title,
            image,
            created
        })
        
        return sanitize(await post.save())
    })()
}