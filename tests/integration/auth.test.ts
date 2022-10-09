import * as userFactory from '../factories/userFactory'
import { prisma } from '../../src/config/database'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import app from '../../src/app'

const agent = supertest(app)

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
})

describe('POST /signup', () => {
    it('should answer with status 201 when data is valid', async () => {
        const user = await userFactory.signUpUser()
        const response = await agent.post('/signup').send(user)

        const createdUser = await prisma.users.findUnique({
            where: {
                email: user.email
            }
        })

        expect(response.status).toBe(201)
        expect(createdUser).not.toBeNull()
    })

    it('should answer with status 422 when data is malformed', async () => {
        const user = await userFactory.signUpUser()
        user.email = 'invalid email'
        const response = await agent.post('/signup').send(user)

        const createdUser = await prisma.users.findUnique({
            where: {
                email: user.email
            }
        })

        expect(response.status).toBe(422)
        expect(createdUser).toBeNull()
    })

    it('should answer with status 409 when user is already registered', async () => {
        const user = await userFactory.signUpUser()

        await agent.post('/signup').send(user)
        const response = await agent.post('/signup').send(user)

        const users = await prisma.users.findMany()

        expect(response.status).toBe(409)
        expect(users.length).toBe(1)
    })
})

describe('POST /signin', () => {
    it('should answer with status 200 when credentials are valid', async () => {
        const user = await userFactory.createUser()
        const response = await agent.post('/signin').send({email: user.email, password: user.password})
        expect(response.status).toBe(200)
        expect(response.text).not.toBeNull()
    })

    it('should answer with status 422 when data is malformed', async () => {
        const user = await userFactory.createUser()
        user.email = 'invalid email'
        const response = await agent.post('/signin').send({email: user.email, password: user.password})
        expect(response.status).toBe(422)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const user = await userFactory.createUser()
        user.email = faker.internet.email()
        const response = await agent.post('/signin').send({email: user.email, password: user.password})
        expect(response.status).toBe(401)
    })
})

afterAll(async () => {
    await prisma.$disconnect()
})