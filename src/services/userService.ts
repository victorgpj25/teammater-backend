import * as userRepository from '../repositories/userRepository'

import * as userUtils from '../utils/userUtils'
import * as encryptUtils from '../utils/encryptUtils'
import { IuserInsertData, IProfileData } from '../types/userTypes'

export async function signUp(userData: IuserInsertData) {
    await userUtils.verifyEmailConflict(userData.email)
    const encryptedPassword = await encryptUtils.encryptUserPassword(userData.password)

    const userInsertData: IuserInsertData = {
        email: userData.email,
        password: encryptedPassword,
        picture: userData.picture,
        nickname: userData.nickname,
        name: userData.name,
        description: userData.description,
        teammate_description: userData.teammate_description
    }

    await userRepository.insert(userInsertData)
}

export async function signIn(signInData: {email: string, password: string}) {
    const userId = await userUtils.validateSignIn(signInData.email, signInData.password)
    const token = await encryptUtils.generateUserToken(Number(userId))

    return token
}

export async function getRandomPlayer(userId: number) {
    const player = await userRepository.getRandomPlayer(userId)
    if (!player) throw {code: 'no_players', message: 'Não foi possivel encontrar um TeamMate ideal para você'}

    return player
}

export async function getTeammates(userId: number) {
    const teammates = await userRepository.getTeammates(userId)

    return teammates
}

export async function editProfile(editProfileData: IProfileData, userId: number) {
    await userRepository.update(editProfileData, userId)
}


export async function getProfileData(userId: number) {
    const profileData = await userRepository.getProfileData(userId)
    if (!profileData) throw {code: "player_not_found", message: "O id enviado não corresponde a um player registrado"}

    return profileData
}