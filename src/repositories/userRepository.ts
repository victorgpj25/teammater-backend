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

export async function findById(id: number) {
    const user: userTypes.IUser | null = await prisma.users.findUnique({
        where: {
            id: id
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
            description: true
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

export async function getTeammates(userId: number) {
    const teammates: userTypes.ITeammateData[] | null = await prisma.users.findMany({
        select: {
            id: true,
            nickname: true,
            name: true,
            picture: true,
            teammate_description: true
        },
        where: { 
            reacted_to_user: {
                some: {
                    user_id: userId,
                    teammate_request: true
                }
            },
            user_reactions: {
                some: {
                    player_id: userId,
                    teammate_request: true
                }
            }
        }
    })
    return teammates
}

export async function update(editProfileData: userTypes.IEditProfileData, userId: number) {
    await prisma.users.update({
        where: {
            id: userId
        },
        data: editProfileData
    })
    
}