import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { prisma } from '../../src/config/database'

export async function signUpUser() {
    const user = {
        email: faker.internet.email(),
        password: faker.random.alpha(5),
        picture: faker.image.avatar(),
        nickname: faker.name.firstName(),
        name: faker.name.fullName(),
        description: faker.lorem.sentence(),
        teammate_description: faker.lorem.sentence()
    }
    return user
}

export async function createUser() {
    const password = faker.random.alpha(5)
    const user = {
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        picture: faker.image.avatar(),
        nickname: faker.name.firstName(),
        name: faker.name.fullName(),
        description: faker.lorem.sentence(),
        teammate_description: faker.lorem.sentence()
    }

    /*
    const loginData = {
        email: user.email,
        password
    }
    */

    const loginData = await prisma.users.create({
        data: user
    })

    return {id: loginData.id, email: user.email, password}
}

export async function editProfileBody() {
    const user = {
        picture: faker.image.avatar(),
        nickname: faker.name.firstName(),
        name: faker.name.fullName(),
        description: faker.lorem.sentence(),
        teammate_description: faker.lorem.sentence()
    }
    return user
}

