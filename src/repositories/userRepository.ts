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

export async function getRandomPlayer(userId: number) {
    const playerList: userTypes.IPlayerData[] | null = await prisma.users.findMany({
        select: {
            id: true,
            nickname: true,
            name: true,
            picture: true,
            description: true,
        },
        where: { 
            reacted_to_user: {
                none: {
                    user_id: userId
                }
            },
            NOT: {
                id: userId
            }
        }
    })
    if (!playerList) {
        return null
    }
    const player = playerList[Math.floor(Math.random() * playerList.length)]
    return player
}