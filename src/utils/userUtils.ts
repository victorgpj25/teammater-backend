import * as userRepository from "../repositories/userRepository"
import * as encryptUtils from './encryptUtils'

export async function verifyEmailConflict(email: string) {
    const user = await userRepository.findByEmail(email)
    if (user) throw {code: "email_conflict", message: "Já existe um perfil com este email"}
}

export async function verifyPlayerId(id: number) {
    const player = await userRepository.findById(id)
    if (!player) throw {code: "player_not_found", message: "O id enviado não corresponde a um player registrado"}
}

export async function validateSignIn(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    if (!user) throw {code: 'signin_failed', message: 'Dados de login incorretos'}
    if (!(await encryptUtils.verifyPasswordMatch(password, user.password))) throw {code: 'signin_failed', message: 'Dados de login incorretos'}
        
    return user.id
}