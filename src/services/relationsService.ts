import * as relationsRepository from '../repositories/relationsRepository'

import * as userUtils from '../utils/userUtils'


export async function askForTeammate({userId, playerId}: {userId: number, playerId: number}) {
    await userUtils.verifyPlayerId(playerId)
    
    await relationsRepository.insert(userId, playerId, true)
}

export async function skipTeammate({userId, playerId}: {userId: number, playerId: number}) {
    await userUtils.verifyPlayerId(playerId)
    
    await relationsRepository.insert(userId, playerId, false)
}