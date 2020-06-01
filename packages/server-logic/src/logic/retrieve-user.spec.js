// @ts-nocheck
require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const { mongoose, models: { User } } = require('@skylab/data')
const retrieveUser = require('./retrieve-User')

describe('retrieveUser', () => {
    let userId, email, username

    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    describe('on valid fields', () => {
        beforeEach(async () => {
            // Register a user

            email = `email-${Math.random()}@email.com`
            username = `username-${Math.random()}`

            const user = new User({
                email,
                username,
                password: `password-${Math.random()}`
            })

            const { id } = await user.save()

            userId = id
        })

        it('should return the user', async () => {
            const user = await retrieveUser(userId)

            expect(user).to.be.an.instanceof(Object)
            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.password).not.to.exist
        })

        it('should not expose the database', async () => {
            const user = await retrieveUser(userId)

            expect(user.__v).not.to.exist
            expect(user._id).not.to.exist
            expect(user._doc).not.to.exist
        })

        it('should fail on no user found ', async () => {
            await User.deleteMany()

            try {
                const user = await retrieveUser(userId)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        })
     })

     describe('on non valid fields', () => {
        beforeEach(async () => {
            // Register a user

            email = `email-${Math.random()}@email.com`
            username = `username-${Math.random()}`

            const user = new User({
                email,
                username,
                password: `password-${Math.random()}`
            })

            const { id } = await user.save()

            userId = id
        })

        it('should fail on non string user id', async () => {
            userId = true

            try {
                await retrieveUser(userId)
            } catch(error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('id must be a string')
            }
        })
     })

    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})