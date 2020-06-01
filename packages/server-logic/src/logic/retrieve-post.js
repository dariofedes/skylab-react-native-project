const { models: { Post } } = require('@skylab/data')
const { sanitize } = require('../utils')

module.exports = (id) => {
    if(typeof id !== 'string') throw new Error('id must be a string')

    return (async () => {
        let post = await Post.findById(id)
        if(!post)throw new Error(`post with id ${id} does not exist`)

        return sanitize(post)
    })()
}