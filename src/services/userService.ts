import * as userRepository from '../repositories/userRepository'

import * as userUtils from '../utils/userUtils'
import * as encryptUtils from '../utils/encryptUtils'
import { IuserInsertData } from '../types/userTypes'

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

    return player
}