// @ts-nocheck
require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const { mongoose, models: { User, Post } } = require('@skylab/data')
const publishPost = require('./publish-post')

describe('publishPost', () => {
    let publisherId, title, image

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

            const { id } = await publisher.save()

            publisherId = id

            // Create post content

            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
        })

        it('should return the post on success', async () => {
            const post = await publishPost(publisherId, title, image)

            expect(post).to.exist
            expect(post.title).to.equal(title)
            expect(post.image).to.equal(image)
            expect(post.created).to.be.a('string')
        })

        it('should not expose the database', async () => {
            const post = await publishPost(publisherId, title, image)

            expect(post.__v).not.to.exist
            expect(post._id).not.to.exist
            expect(post._doc).not.to.exist
        })

        
     })

     describe('on wrong fields', async () => {
        beforeEach(async () => {
            // Create a publisher
            const publisher = new User({
                email: `email-${Math.random()}@email.com`,
                username: `username-${Math.random()}`,
                password: `password-${Math.random()}`
            })

            const { id } = await publisher.save()

            publisherId = id

            // Create post content

            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
        })

        it('should fail on non string publisher', async () => {
            publisherId = true

            try {
                await publishPost(publisherId, title, image)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('publisher must be a string')
            }
        })

        it('should fail on non string title', async () => {
            title = true

            try {
                await publishPost(publisherId, title, image)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('title must be a string')
            }
        })

        it('should fail on non string image', async () => {
            image = true

            try {
                await publishPost(publisherId, title, image)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('image must be a string')
            }
        })
     })

    after(async () => {
        await User.deleteMany()
        await Post.deleteMany()
        await mongoose.disconnect()
    })
})