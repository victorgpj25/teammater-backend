import { prisma } from '../config/database'

import * as userTypes from '../types/userTypes'

export async function insert(userInsertData: userTypes.IuserInsertData) {
    await prisma.users.create({
        data: userInsertData
    })
}

export async function findByEmail(email: string) {
    const user: userTypes.IUser | null = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    return user
}