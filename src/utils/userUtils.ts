import * as userRepository from "../repositories/userRepository"

export async function verifyEmailConflict(email: string) {
    const user = await userRepository.findByEmail(email)
    if (user) throw {code: "email_conflict", message: "Já existe um perfil com este email"}
}