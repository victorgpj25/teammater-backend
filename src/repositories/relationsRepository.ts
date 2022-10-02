import { prisma } from '../config/database'

export async function insert(userId: number, playerId: number, requestStatus: boolean) {
    await prisma.relations.create({
        data: {
            user_id: userId,
            player_id: playerId,
            teammate_request: requestStatus
        }
    })
}