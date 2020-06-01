require('dotenv').config()
const { env: { MONGODB_URL_TEST } } = process
const { mongoose, models: { User } } = require('data')
const updateUser = require('./update-User')
const { expect } = require('chai')

describe('updateUser', () => {
    let userId, email, username, password

    before(async () => {
        await mongoose.connect(MONGODB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })

    describe('on valid fields', () => {
        beforeEach(async () => {
            // Register a user

            email = `email-${Math.random()}@email.com`
            username = `username-${Math.random()}`
            password = `password-${Math.random()}`

            const user = new User({
                email,
                username,
                password
            })

            const { id } = await user.save()

            userId = id
        })

        it('should return the updated user', async () => {
            const user = await updateUser(userId)

            expect(user).to.be.an.instanceof(Object)
            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.password).not.to.exist
        })

        it('should update the users email in DB', async () => {
            const user = await User.findById(userId)

            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.avatar).to.equal('')
            
            const newEmail = `new${email}`
            await updateUser(userId, newEmail)

            const updatedUser = await User.findById(userId)

            expect(updatedUser.id).to.equal(userId)
            expect(updatedUser.email).to.equal(newEmail)
            expect(updatedUser.username).to.equal(username)
            expect(updatedUser.avatar).to.equal('')
        })

        it('should update the users username in DB', async () => {
            const user = await User.findById(userId)

            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.avatar).to.equal('')
            
            const newUsername = `new${username}`
            await updateUser(userId, null , newUsername)

            const updatedUser = await User.findById(userId)

            expect(updatedUser.id).to.equal(userId)
            expect(updatedUser.email).to.equal(email)
            expect(updatedUser.username).to.equal(newUsername)
            expect(updatedUser.avatar).to.equal('')
        })

        it('should update the users avatar in DB', async () => {
            const user = await User.findById(userId)

            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.avatar).to.equal('')
            
            const newAvatar = `newAvatar`
            await updateUser(userId, null , null, newAvatar)

            const updatedUser = await User.findById(userId)

            expect(updatedUser.id).to.equal(userId)
            expect(updatedUser.email).to.equal(email)
            expect(updatedUser.username).to.equal(username)
            expect(updatedUser.avatar).to.equal(newAvatar)
        })

        it('should update the users password in DB', async () => {
            const user = await User.findById(userId)

            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.avatar).to.equal('')
            expect(user.password).to.equal(password)
            
            const newPassword = `new${password}`
            await updateUser(userId, null , null, null, password, newPassword)

            const updatedUser = await User.findById(userId)

            expect(updatedUser.id).to.equal(userId)
            expect(updatedUser.email).to.equal(email)
            expect(updatedUser.username).to.equal(username)
            expect(updatedUser.avatar).to.equal('')
            expect(updatedUser.password).to.equal(newPassword)
        })

        it('should be able to update several fields at once', async () => {
            const user = await User.findById(userId)

            expect(user.email).to.equal(email)
            expect(user.username).to.equal(username)
            expect(user.avatar).to.equal('')
            
            const newEmail = `new${email}`
            const newUsername = `new${username}`
            await updateUser(userId, newEmail, newUsername)

            const updatedUser = await User.findById(userId)

            expect(updatedUser.id).to.equal(userId)
            expect(updatedUser.email).to.equal(newEmail)
            expect(updatedUser.username).to.equal(newUsername)
            expect(updatedUser.avatar).to.equal('')
        })

        it('should not expose the database', async () => {
            const newEmail = `new${email}`
            const newUsername = `new${username}`
            const updatedUser = await updateUser(userId, newEmail, newUsername)

            expect(updatedUser.__v).not.to.exist
            expect(updatedUser._id).not.to.exist
            expect(updatedUser._doc).not.to.exist
        })
     })

    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})