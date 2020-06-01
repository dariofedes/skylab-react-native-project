require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process
const { mongoose, models: { User, Post } } = require('@skylab/data')
const retrievePost = require('./retrieve-post')
const { expect } = require('chai')

describe('retrievePost', () => {
    let postId, title, image, created

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

            title = `title-${Math.random()}`,
            image = `image-${Math.random()}`,
            created = `date-${Math.random()}`

            const post = new Post({
                publisher: publisherId,
                title,
                image,
                created
            })

            const { id } = await post.save()

            postId = id
        })

        it('should return the post', async () => {
            const post = await retrievePost(postId)

            expect(post).to.be.an.instanceof(Object)
            expect(post.title).to.equal(title)
            expect(post.image).to.equal(image)
            expect(post.created).to.equal(created)
        })

        it('should not expose the database', async () => {
            const post = await retrievePost(postId)

            expect(post.__v).not.to.exist
            expect(post._id).not.to.exist
            expect(post._doc).not.to.exist
        })

        it('should fail on no post found ', async () => {
            await Post.deleteMany()

            try {
                const post = await retrievePost(postId)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`post with id ${postId} does not exist`)
            }
        })
     })

     describe('on non valid fields', () => {
        beforeEach(async () => {
            // Create a publisher
            const publisher = new User({
                email: `email-${Math.random()}@email.com`,
                username: `username-${Math.random()}`,
                password: `password-${Math.random()}`
            })

            const { id: publisherId } = await publisher.save()

            // Create post

            title = `title-${Math.random()}`,
            image = `image-${Math.random()}`,
            created = `date-${Math.random()}`

            const post = new Post({
                publisher: publisherId,
                title,
                image,
                created
            })

            const { id } = await post.save()

            postId = id
        })

        it('should fail on non string post id', async () => {
            postId = true

            try {
                await retrievePost(postId)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('id must be a string')
            }
        })
     })

    after(async () => {
        await User.deleteMany()
        await Post.deleteMany()
        await mongoose.disconnect()
    })
})