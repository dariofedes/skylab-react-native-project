// @ts-nocheck
require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process

const { expect } = require('chai')
const { mongoose, models: { User } } = require('@skylab/data')
const retrieveAllUsers = require('./retrieve-all-users')

describe('retrieveAllUsers', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    describe('on valid fields', () => {
        beforeEach(async () => {
            // Create a user
            const publisher = new User({
                email: `email-${Math.random()}@email.com`,
                username: `username-${Math.random()}`,
                password: `password-${Math.random()}`
            })

            await publisher.save()
        })

        it('should return an array of users', async () => {
            const users = await retrieveAllUsers()

            expect(users).to.be.an.instanceof(Array)
            expect(users).to.have.lengthOf(1)
            expect(users[0]).to.be.an.instanceof(Object)
            expect(users[0].username).to.be.a('string')
        })

        it('should not expose the database', async () => {
            const users = await retrieveAllUsers()

            expect(users[0].__v).not.to.exist
            expect(users[0]._id).not.to.exist
            expect(users[0]._doc).not.to.exist
        })

        it('should return an empty array on no users found instead of fail', async () => {
            await User.deleteMany()

            const users = await retrieveAllUsers()

            expect(users).to.be.an.instanceof(Array)
            expect(users).to.have.lengthOf(0)
        })
     })

    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})