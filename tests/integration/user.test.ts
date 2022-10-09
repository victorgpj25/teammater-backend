import * as userFactory from '../factories/userFactory'
import { prisma } from '../../src/config/database'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import app from '../../src/app'

const agent = supertest(app)
let token: string
let userId: number

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
    const user = await userFactory.createUser()
    const response = await agent.post('/signin').send({email: user.email, password: user.password})
    token = response.text
    userId = Number(user.id)
})

describe('GET /player', () => {
    it('should answer with status 200 when everything is ok', async () => {
        await userFactory.createUser()
        const response = await agent.get('/player').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 404 when there are no other players', async () => {
        const response = await agent.get('/player').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(404)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const response = await agent.get('/player').set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })
})

describe('GET /teammates', () => {
    it('should answer with status 200 when everything is ok', async () => {
        const player = await userFactory.createUser()

        await prisma.relations.createMany({
            data: [
                { user_id: player.id, player_id: userId, teammate_request: true },
                { user_id: userId, player_id: player.id, teammate_request: true }
            ]
        })

        const response = await agent.get('/teammates').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const response = await agent.get('/teammates').set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })
})

describe('GET /profile/data', () => {
    it('should answer with status 200 when everything is ok', async () => {
        const response = await agent.get('/profile/data').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const response = await agent.get('/profile/data').set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })
})

describe('PUT /profile/edit', () => {
    it('should answer with status 200 when everything is ok', async () => {
        const user = await userFactory.editProfileBody()
        const response = await agent.put('/profile/edit').send(user).set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const user = await userFactory.editProfileBody()
        const response = await agent.put('/profile/edit').send(user).set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })

    it('should answer with status 422 when data is malformed', async () => {
        const user = await userFactory.editProfileBody()
        user.nickname = ""
        const response = await agent.put('/profile/edit').send(user).set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(422)
    })
})

describe('POST /player/ask/:id', () => {
    it('should answer with status 200 when everything is ok', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post(`/player/ask/${player.id}`).set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post(`/player/ask/${player.id}`).set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })

    it('should answer with status 404 when given id is not registered', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post('/player/ask/9999').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(404)
    })
})

describe('POST /player/skip/:id', () => {
    it('should answer with status 200 when everything is ok', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post(`/player/skip/${player.id}`).set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(200)
    })

    it('should answer with status 401 when credentials are invalid', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post(`/player/skip/${player.id}`).set({Authorization: `Bearer falseToken`})
        expect(response.status).toBe(401)
    })

    it('should answer with status 404 when given id is not registered', async () => {
        const player = await userFactory.createUser()
        const response = await agent.post('/player/skip/9999').set({Authorization: `Bearer ${token}`})
        expect(response.status).toBe(404)
    })
})



afterAll(async () => {
    await prisma.$disconnect()
})

