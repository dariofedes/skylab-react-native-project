require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process
const { mongoose, models: { User, Post } } = require('@skylab/data')
const retrieveUsersPosts = require('./retrieve-users-posts')
const { expect } = require('chai')

describe('retrieveUsersPosts', () => {
    let userId, title, image, created

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

            userId = id

            // Create post

            title = `title-${Math.random()}`,
            image = `image-${Math.random()}`,
            created = `date-${Math.random()}`

            const post = new Post({
                publisher: userId,
                title,
                image,
                created
            })

            await post.save()
        })

        it('should return the post', async () => {
            const usersPosts = await retrieveUsersPosts(userId)

            expect(usersPosts).to.be.an.instanceof(Array)
            expect(usersPosts).to.have.lengthOf(1)
            expect(usersPosts[0].title).to.equal(title)
            expect(usersPosts[0].image).to.equal(image)
            expect(usersPosts[0].created).to.equal(created)
        })

        it('should not expose the database', async () => {
            const usersPosts = await retrieveUsersPosts(userId)

            expect(usersPosts[0].__v).not.to.exist
            expect(usersPosts[0]._id).not.to.exist
            expect(usersPosts[0]._doc).not.to.exist
        })

        it('should return an empty array instead of fail on no posts found', async () => {
            await Post.deleteMany()

            const usersPosts = await retrieveUsersPosts(userId)

            expect(usersPosts).to.be.an.instanceof(Array)
            expect(usersPosts).to.have.lengthOf(0)
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

            const { id } = await publisher.save()

            userId = id

            // Create post

            title = `title-${Math.random()}`,
            image = `image-${Math.random()}`,
            created = `date-${Math.random()}`

            const post = new Post({
                publisher: userId,
                title,
                image,
                created
            })

            await post.save()
        })

        it('should fail on non string user id', async () => {
            userId = true

            try {
                await retrieveUsersPosts(userId)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('publisher must be a string')
            }
        })
     })

    after(async () => {
        await User.deleteMany()
        await Post.deleteMany()
        await mongoose.disconnect()
    })
})