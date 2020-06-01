// @ts-nocheck
require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const { mongoose, models: { User, Post } } = require('@skylab/data')
const retrieveAllPosts = require('./retrieve-all-posts')

describe('retrieveAllPosts', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
        await Post.deleteMany()
    })

    describe('on valid fields', () => {
        beforeEach(async () => {
            // Create a publisher
            const publisher = new User({
                email: `email-${Math.random()}@email.com`,
                username: `username-${Math.random()}`,
                password: `password-${Math.random()}`
            })

            const { id: publisherId } = await publisher.save()

            // Create post

            const post = new Post({
                publisher: publisherId,
                title: `title-${Math.random()}`,
                image: `image-${Math.random()}`,
                created: `date-${Math.random()}`
            })

            await post.save()
        })

        it('should return an array of posts', async () => {
            const posts = await retrieveAllPosts()

            expect(posts).to.be.an.instanceof(Array)
            expect(posts).to.have.lengthOf(1)
            expect(posts[0]).to.be.an.instanceof(Object)
            expect(posts[0].title).to.be.a('string')
        })

        it('should not expose the database', async () => {
            const posts = await retrieveAllPosts()

            expect(posts[0].__v).not.to.exist
            expect(posts[0]._id).not.to.exist
            expect(posts[0]._doc).not.to.exist
        })

        it('should return an empty array on no posts found instead of fail', async () => {
            await Post.deleteMany()

            const posts = await retrieveAllPosts()

            expect(posts).to.be.an.instanceof(Array)
            expect(posts).to.have.lengthOf(0)
        })
     })

    after(async () => {
        await User.deleteMany()
        await Post.deleteMany()
        await mongoose.disconnect()
    })
})